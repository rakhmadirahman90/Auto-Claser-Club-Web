export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
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
