export interface Schedule {
  _id?: string;
  title: string;
  description: string;
  date: string; // ISO string
  createdAt?: string;
  updatedAt?: string;
}