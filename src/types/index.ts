export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  tags: string[];
  link: string;
  year: string;
}

export interface Experience {
  id: number;
  period: string;
  company: string;
  role: string;
  desc: string;
  tags: string[];
}
