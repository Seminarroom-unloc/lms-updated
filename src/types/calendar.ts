
export interface CalendarEvent {
  id: string;
  name: string;
  date: Date;
  endDate: Date;
  type: 'course' | 'quiz' | 'challenge';
  description: string;
  instructor: string;
  location: string;
  tags: string[];
  imageUrl?: string;
}
