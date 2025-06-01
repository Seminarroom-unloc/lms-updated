
export interface CourseType {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  instructor: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
    courses: number;
    students: number;
    rating: number;
  };
  duration: string;
  totalHours: number;
  totalLectures: number;
  totalExercises: number;
  level: string;
  lastUpdated: string;
  language: string;
  certificate: boolean;
  imgSrc: string;
  rating: number;
  reviews: number;
  enrolled: number;
  modules: {
    id: string;
    title: string;
    description: string;
    lectures: {
      id: string;
      title: string;
      duration?: string;
      type: string;
    }[];
  }[];
  courseReviews: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  what_you_learn: string[];
  requirements: string[];
}
