export interface MemberProfile {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  car: string;
  licensePlate: string;
  yearJoined: string;
  membershipNumber: string;
  phone?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
  content?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
  likes?: number;
  views?: number;
}

export interface Activity {
  id: string;
  title: string;
  location: string;
  date: string;
  imageUrl: string;
}

export interface Chapter {
  id: string;
  name: string;
  memberCount: number;
}

export interface HeroData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export interface AboutData {
  id: string;
  title: string;
  description1: string;
  description2: string;
  imageUrl: string;
  statsMembers: string;
}

export interface JoinData {
  id: string;
  title: string;
  description: string;
  adminWhatsApp: string;
  imageUrl: string;
}

export interface Registration {
  id?: string;
  name: string;
  phone: string;
  address: string;
  vehicleType: string;
  vehicleYear: string;
  licensePlate: string;
  createdAt: string;
}

export interface AnnouncementData {
  id: string;
  isActive: boolean;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
}

export interface CalendarEvent {
  id?: string;
  date: number; // 1-31
  month: number; // 0-11
  type: 'agenda' | 'birthday' | 'holiday';
  title: string;
}


