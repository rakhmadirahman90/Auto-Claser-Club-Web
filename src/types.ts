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

