// types/masonry.ts
export interface Badge {
  text: string;
  color: 'red' | 'blue' | 'green' | 'purple' | 'orange';
}

export interface MasonryCardData {
  id: number;
  title: string;
  description: string;
  image: string;
  badge?: Badge;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  buttonText: string;
  delay: number;
}