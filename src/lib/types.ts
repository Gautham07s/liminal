export type Theme = 'dark' | 'light';

export interface JournalEntry {
  id: string;
  text: string;
  images: string[];
  ts: number;
}

export interface Habit {
  id: string;
  name: string;
  dates: string[];
}

export interface Task {
  id: string;
  text: string;
  date: string;
  done: boolean;
}
