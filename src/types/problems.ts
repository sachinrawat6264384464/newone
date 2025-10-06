// types/problems.ts
import { ComponentType } from 'react';
import { LucideProps } from 'lucide-react';

export interface Problem {
  title: string;
  description: string;
  icon: ComponentType<LucideProps>;
}