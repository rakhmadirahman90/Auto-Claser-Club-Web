import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost, Activity, Chapter, HeroData, AboutData, JoinData, Registration, AnnouncementData, CommitteeMember, MemberProfile } from '../types';
import { db, auth } from '../firebase';
import { BLOG_POSTS } from '../data';
import { 
  collection, query, onSnapshot, doc, setDoc, updateDoc, deleteDoc, 
  getDocFromServer, addDoc
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';

enum OperationType {
  CREATE = 'create', UPDATE = 'update', DELETE = 'delete', LIST = 'list', GET = 'get', WRITE = 'write',
}
interface FirestoreErrorInfo {
  error: string; operationType: OperationType; path: string | null;
  authInfo: { userId?: string | null; email?: string | null; emailVerified?: boolean | null; }
}
function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: { 
      userId: auth.currentUser?.uid, email: auth.currentUser?.email, emailVerified: auth.currentUser?.emailVerified 
    },
    operationType, path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface DataContextType {
  user: User | null;
  posts: BlogPost[];
  activities: Activity[];
  chapters: Chapter[];
  heroData: HeroData | null;
  aboutData: AboutData | null;
  joinData: JoinData | null;
  announcementData: AnnouncementData | null;
  registrations: Registration[];
  committee: CommitteeMember[];
  memberProfiles: MemberProfile[];
  addPost: (post: BlogPost) => Promise<void>;
  updatePost: (id: string, post: BlogPost) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string) => Promise<void>;
  viewPost: (id: string) => Promise<void>;
  addActivity: (activity: Activity) => Promise<void>;
  updateActivity: (id: string, activity: Activity) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  addChapter: (chapter: Chapter) => Promise<void>;
  updateChapter: (id: string, chapter: Chapter) => Promise<void>;
  deleteChapter: (id: string) => Promise<void>;
  updateHero: (hero: HeroData) => Promise<void>;
  updateAbout: (about: AboutData) => Promise<void>;
  updateJoin: (join: JoinData) => Promise<void>;
  updateAnnouncement: (announcement: AnnouncementData) => Promise<void>;
  addRegistration: (reg: Omit<Registration, 'id'>) => Promise<void>;
  updateRegistration: (id: string, reg: Registration) => Promise<void>;
  deleteRegistration: (id: string) => Promise<void>;
  addCommitteeMember: (member: CommitteeMember) => Promise<void>;
  updateCommitteeMember: (id: string, member: CommitteeMember) => Promise<void>;
  deleteCommitteeMember: (id: string) => Promise<void>;
  addMemberProfile: (member: MemberProfile) => Promise<void>;
  updateMemberProfile: (id: string, member: MemberProfile) => Promise<void>;
  deleteMemberProfile: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [joinData, setJoinData] = useState<JoinData | null>(null);
  const [announcementData, setAnnouncementData] = useState<AnnouncementData | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [memberProfiles, setMemberProfiles] = useState<MemberProfile[]>([]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, u => setUser(u));
    return unsubAuth;
  }, []);

  useEffect(() => {
    getDocFromServer(doc(db, 'test', 'connection')).catch(e => {
      if (e instanceof Error && e.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration.");
      }
    });

    let unsubReg = () => {};
    if (user && (user.email === "rakhmadi.rahman90@gmail.com" || user.email === "admin@autoclaserclub.com")) {
      unsubReg = onSnapshot(collection(db, 'registrations'), snap => {
        setRegistrations(snap.docs.map(d => ({ id: d.id, ...d.data() } as Registration)));
      }, err => handleFirestoreError(err, OperationType.LIST, 'registrations'));
    }

    const unsubPosts = onSnapshot(query(collection(db, 'posts')), snap => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost)));
    }, err => handleFirestoreError(err, OperationType.LIST, 'posts'));
    
    const unsubActivities = onSnapshot(query(collection(db, 'activities')), snap => {
      setActivities(snap.docs.map(d => ({ id: d.id, ...d.data() } as Activity)));
    }, err => handleFirestoreError(err, OperationType.LIST, 'activities'));
    
    const unsubChapters = onSnapshot(query(collection(db, 'chapters')), snap => {
      setChapters(snap.docs.map(d => ({ id: d.id, ...d.data() } as Chapter)));
    }, err => handleFirestoreError(err, OperationType.LIST, 'chapters'));

    const unsubHero = onSnapshot(doc(db, 'settings', 'hero'), snap => {
      if (snap.exists()) setHeroData({ id: snap.id, ...snap.data() } as HeroData);
      else setHeroData(null);
    }, err => handleFirestoreError(err, OperationType.LIST, 'hero'));

    const unsubAbout = onSnapshot(doc(db, 'settings', 'about'), snap => {
      if (snap.exists()) setAboutData({ id: snap.id, ...snap.data() } as AboutData);
      else setAboutData(null);
    }, err => handleFirestoreError(err, OperationType.LIST, 'about'));

    const unsubJoin = onSnapshot(doc(db, 'settings', 'join'), snap => {
      if (snap.exists()) setJoinData({ id: snap.id, ...snap.data() } as JoinData);
      else setJoinData(null);
    }, err => handleFirestoreError(err, OperationType.LIST, 'join'));

    const unsubAnnouncement = onSnapshot(doc(db, 'settings', 'announcement'), snap => {
      if (snap.exists()) setAnnouncementData({ id: snap.id, ...snap.data() } as AnnouncementData);
      else setAnnouncementData(null);
    }, err => handleFirestoreError(err, OperationType.LIST, 'announcement'));

    const unsubCommittee = onSnapshot(query(collection(db, 'committee')), snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as CommitteeMember));
      setCommittee(list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    }, err => handleFirestoreError(err, OperationType.LIST, 'committee'));

    const unsubMembers = onSnapshot(query(collection(db, 'memberProfiles')), snap => {
      setMemberProfiles(snap.docs.map(d => ({ id: d.id, ...d.data() } as MemberProfile)));
    }, err => handleFirestoreError(err, OperationType.LIST, 'memberProfiles'));

    return () => { unsubPosts(); unsubActivities(); unsubChapters(); unsubHero(); unsubAbout(); unsubJoin(); unsubAnnouncement(); unsubReg(); unsubCommittee(); unsubMembers(); };
  }, [user]);

  const addPost = async (post: BlogPost) => {
    const { id, ...data } = post;
    const docId = id && id !== 'new' ? id : (Date.now().toString() + Math.random().toString(36).substring(2, 9));
    try { await setDoc(doc(db, 'posts', docId), data); } 
    catch (err) { handleFirestoreError(err, OperationType.CREATE, `posts/${docId}`); }
  };
  const updatePost = async (id: string, post: BlogPost) => {
    const { id: _, ...data } = post;
    try { await setDoc(doc(db, 'posts', id), data); } 
    catch (err) { handleFirestoreError(err, OperationType.UPDATE, `posts/${id}`); }
  };
  const deletePost = async (id: string) => {
    try { await deleteDoc(doc(db, 'posts', id)); } 
    catch (err) { handleFirestoreError(err, OperationType.DELETE, `posts/${id}`); }
  };

  const likePost = async (id: string) => {
    try {
      const postRef = doc(db, 'posts', id);
      const postSnap = await getDocFromServer(postRef).catch(() => null);
      if (postSnap && postSnap.exists()) {
        const currentLikes = postSnap.data().likes || 0;
        await updateDoc(postRef, { likes: currentLikes + 1 });
      } else {
        const fallback = BLOG_POSTS.find(p => p.id === id);
        const currentLikes = fallback?.likes || 0;
        const isAdminUser = auth.currentUser?.email === "rakhmadi.rahman90@gmail.com";
        if (isAdminUser && fallback) {
          const { id: _, ...fallbackData } = fallback;
          await setDoc(postRef, { ...fallbackData, likes: currentLikes + 1 });
        } else {
          console.warn(`Post ${id} does not exist in Firestore and cannot be liked by a non-admin user.`);
        }
      }
    } catch (err) {
      console.error(`Error liking post ${id}:`, err);
    }
  };

  const viewPost = async (id: string) => {
    try {
      const postRef = doc(db, 'posts', id);
      const postSnap = await getDocFromServer(postRef).catch(() => null);
      if (postSnap && postSnap.exists()) {
        const currentViews = postSnap.data().views || 0;
        await updateDoc(postRef, { views: currentViews + 1 });
      } else {
        const fallback = BLOG_POSTS.find(p => p.id === id);
        const currentViews = fallback?.views || 0;
        const isAdminUser = auth.currentUser?.email === "rakhmadi.rahman90@gmail.com";
        if (isAdminUser && fallback) {
          const { id: _, ...fallbackData } = fallback;
          await setDoc(postRef, { ...fallbackData, views: currentViews + 1 });
        } else {
          console.warn(`Post ${id} does not exist in Firestore and cannot be viewed by a non-admin user.`);
        }
      }
    } catch (err) {
      console.error(`Error viewing post ${id}:`, err);
    }
  };

  const addActivity = async (activity: Activity) => {
    const { id, ...data } = activity;
    const docId = id && id !== 'new' ? id : (Date.now().toString() + Math.random().toString(36).substring(2, 9));
    try { await setDoc(doc(db, 'activities', docId), data); } 
    catch (err) { handleFirestoreError(err, OperationType.CREATE, `activities/${docId}`); }
  };
  const updateActivity = async (id: string, activity: Activity) => {
    const { id: _, ...data } = activity;
    try { await setDoc(doc(db, 'activities', id), data); } 
    catch (err) { handleFirestoreError(err, OperationType.UPDATE, `activities/${id}`); }
  };
  const deleteActivity = async (id: string) => {
    try { await deleteDoc(doc(db, 'activities', id)); } 
    catch (err) { handleFirestoreError(err, OperationType.DELETE, `activities/${id}`); }
  };

  const addChapter = async (chapter: Chapter) => {
    const { id, ...data } = chapter;
    const docId = id && id !== 'new' ? id : (Date.now().toString() + Math.random().toString(36).substring(2, 9));
    try { await setDoc(doc(db, 'chapters', docId), data); } 
    catch (err) { handleFirestoreError(err, OperationType.CREATE, `chapters/${docId}`); }
  };
  const updateChapter = async (id: string, chapter: Chapter) => {
    const { id: _, ...data } = chapter;
    try { await setDoc(doc(db, 'chapters', id), data); } 
    catch (err) { handleFirestoreError(err, OperationType.UPDATE, `chapters/${id}`); }
  };
  const deleteChapter = async (id: string) => {
    try { await deleteDoc(doc(db, 'chapters', id)); } 
    catch (err) { handleFirestoreError(err, OperationType.DELETE, `chapters/${id}`); }
  };

  const updateHero = async (hero: HeroData) => {
    const { id: _, ...data } = hero;
    try { await setDoc(doc(db, 'settings', 'hero'), data); }
    catch (err) { handleFirestoreError(err, OperationType.WRITE, `settings/hero`); }
  };

  const updateAbout = async (about: AboutData) => {
    const { id: _, ...data } = about;
    try { await setDoc(doc(db, 'settings', 'about'), data); }
    catch (err) { handleFirestoreError(err, OperationType.WRITE, `settings/about`); }
  };

  const updateJoin = async (join: JoinData) => {
    const { id: _, ...data } = join;
    try { await setDoc(doc(db, 'settings', 'join'), data); }
    catch (err) { handleFirestoreError(err, OperationType.WRITE, `settings/join`); }
  };

  const updateAnnouncement = async (announcement: AnnouncementData) => {
    const { id: _, ...data } = announcement;
    try { await setDoc(doc(db, 'settings', 'announcement'), data); }
    catch (err) { handleFirestoreError(err, OperationType.WRITE, `settings/announcement`); }
  };

  const addRegistration = async (reg: Omit<Registration, 'id'>) => {
    try { await addDoc(collection(db, 'registrations'), reg); }
    catch (err) { handleFirestoreError(err, OperationType.WRITE, 'registrations'); throw err; }
  };

  const updateRegistration = async (id: string, reg: Registration) => {
    const { id: _, ...data } = reg;
    try { await setDoc(doc(db, 'registrations', id), data); }
    catch (err) { handleFirestoreError(err, OperationType.UPDATE, `registrations/${id}`); }
  };

  const deleteRegistration = async (id: string) => {
    try { await deleteDoc(doc(db, 'registrations', id)); }
    catch (err) { handleFirestoreError(err, OperationType.DELETE, `registrations/${id}`); }
  };

  const addCommitteeMember = async (member: CommitteeMember) => {
    const { id, ...data } = member;
    const docId = id && id !== 'new' ? id : (Date.now().toString() + Math.random().toString(36).substring(2, 9));
    try { await setDoc(doc(db, 'committee', docId), data); }
    catch (err) { handleFirestoreError(err, OperationType.CREATE, `committee/${docId}`); }
  };

  const updateCommitteeMember = async (id: string, member: CommitteeMember) => {
    const { id: _, ...data } = member;
    try { await setDoc(doc(db, 'committee', id), data); }
    catch (err) { handleFirestoreError(err, OperationType.UPDATE, `committee/${id}`); }
  };

  const deleteCommitteeMember = async (id: string) => {
    try { await deleteDoc(doc(db, 'committee', id)); }
    catch (err) { handleFirestoreError(err, OperationType.DELETE, `committee/${id}`); }
  };

  const addMemberProfile = async (member: MemberProfile) => {
    const { id, ...data } = member;
    const docId = id && id !== 'new' ? id : (Date.now().toString() + Math.random().toString(36).substring(2, 9));
    try { await setDoc(doc(db, 'memberProfiles', docId), data); }
    catch (err) { handleFirestoreError(err, OperationType.CREATE, `memberProfiles/${docId}`); }
  };

  const updateMemberProfile = async (id: string, member: MemberProfile) => {
    const { id: _, ...data } = member;
    try { await setDoc(doc(db, 'memberProfiles', id), data); }
    catch (err) { handleFirestoreError(err, OperationType.UPDATE, `memberProfiles/${id}`); }
  };

  const deleteMemberProfile = async (id: string) => {
    try { await deleteDoc(doc(db, 'memberProfiles', id)); }
    catch (err) { handleFirestoreError(err, OperationType.DELETE, `memberProfiles/${id}`); }
  };

  return (
    <DataContext.Provider value={{
      user, posts, activities, chapters, heroData, aboutData, joinData, announcementData, registrations, committee, memberProfiles,
      addPost, updatePost, deletePost, likePost, viewPost,
      addActivity, updateActivity, deleteActivity,
      addChapter, updateChapter, deleteChapter,
      updateHero, updateAbout, updateJoin, updateAnnouncement,
      addRegistration, updateRegistration, deleteRegistration,
      addCommitteeMember, updateCommitteeMember, deleteCommitteeMember,
      addMemberProfile, updateMemberProfile, deleteMemberProfile
    }}>
      {children}
    </DataContext.Provider>
  );
};
