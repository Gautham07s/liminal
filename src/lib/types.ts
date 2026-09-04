export type Theme = 'dark' | 'light';

export type Mood = 'great' | 'good' | 'okay' | 'low' | 'rough';

export interface JournalEntry {
  id: string;
  text: string;
  images: string[];
  ts: number;
  mood?: Mood;
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

export interface DailyFocus {
  text: string;
  date: string;
}
