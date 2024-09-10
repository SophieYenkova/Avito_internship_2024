export interface IAds extends IAdsProps {
  id: string;
}

export interface IAdsProps {
  name: string;
  description: string;
  price: number;
  views: number;
  likes: number;
  createdAt: string;
  imageUrl: string;
}
