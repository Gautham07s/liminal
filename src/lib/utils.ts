import type { Habit } from './types';

/** Format a Date to YYYY-MM-DD string */
export function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Today's date key as YYYY-MM-DD */
export function todayKey(): string {
  return fmtDate(new Date());
}

/** Generate a short unique ID */
export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/** Escape HTML entities for safe innerHTML insertion */
export function escapeHtml(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

/** Calculate the current streak (consecutive days including today) */
export function calcStreak(habit: Habit): number {
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = fmtDate(d);
    if (habit.dates.includes(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

/** Return array of last 7 date keys (6 days ago → today) */
export function last7Dates(): string[] {
  const arr: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    arr.push(fmtDate(d));
  }
  return arr;
}

/** Get a time-of-day greeting */
export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'still up?';
  if (h < 12) return 'good morning';
  if (h < 17) return 'good afternoon';
  if (h < 22) return 'good evening';
  return 'late night thoughts?';
}

/** Get today's date as a formatted lowercase string */
export function getFormattedDate(): string {
  return new Date()
    .toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
    .toLowerCase();
}

/**
 * Compress an image file to JPEG, max 900px dimension.
 * Returns a data URL string.
 */
export function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 900;
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height *= maxDim / width;
          width = maxDim;
        } else if (height > maxDim) {
          width *= maxDim / height;
          height = maxDim;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  });
}
