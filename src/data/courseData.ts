
import { CourseType } from '@/types/course';

export const COURSE: CourseType = {
  id: '1',
  title: 'Introduction to React Development',
  description: 'Learn the fundamentals of React and build dynamic web applications with the most popular JavaScript library.',
  fullDescription: 'This comprehensive course will take you from React beginner to confident developer. You will learn all the core concepts including components, state, props, hooks, context API, and more. By the end of the course, you will be able to build your own modern, dynamic web applications with React.',
  instructor: {
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Senior Frontend Developer',
    bio: 'Sarah has over 8 years of experience in frontend development, specializing in React and its ecosystem. She has worked with numerous startups and large tech companies, helping them build scalable web applications.',
    courses: 12,
    students: 15400,
    rating: 4.8
  },
  duration: '6 weeks',
  totalHours: 24,
  totalLectures: 48,
  totalExercises: 12,
  level: 'Beginner',
  lastUpdated: 'March 2023',
  language: 'English',
  certificate: true,
  imgSrc: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
  rating: 4.7,
  reviews: 342,
  enrolled: 1842,
  modules: [
    {
      id: 'm1',
      title: 'Getting Started with React',
      description: 'Learn the basics of React and set up your development environment.',
      lectures: [
        { id: 'l1', title: 'Introduction to React', duration: '12:45', type: 'video' },
        { id: 'l2', title: 'Setting Up Your Development Environment', duration: '18:30', type: 'video' },
        { id: 'l3', title: 'Your First React Component', duration: '15:20', type: 'video' },
        { id: 'l4', title: 'Module Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'm2',
      title: 'React Components and Props',
      description: 'Understand how to create and compose React components.',
      lectures: [
        { id: 'l5', title: 'Component Types', duration: '14:50', type: 'video' },
        { id: 'l6', title: 'Props and Data Flow', duration: '22:15', type: 'video' },
        { id: 'l7', title: 'Component Composition', duration: '19:40', type: 'video' },
        { id: 'l8', title: 'Practice Exercise: Building a Component Library', type: 'exercise' },
        { id: 'l9', title: 'Module Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'm3',
      title: 'State and Lifecycle Methods',
      description: 'Learn how to manage state and work with component lifecycle.',
      lectures: [
        { id: 'l10', title: 'Introduction to State', duration: '16:30', type: 'video' },
        { id: 'l11', title: 'The useState Hook', duration: '25:10', type: 'video' },
        { id: 'l12', title: 'Component Lifecycle', duration: '20:45', type: 'video' },
        { id: 'l13', title: 'The useEffect Hook', duration: '23:20', type: 'video' },
        { id: 'l14', title: 'Practice Exercise: State Management', type: 'exercise' },
        { id: 'l15', title: 'Module Quiz', type: 'quiz' }
      ]
    },
    {
      id: 'm4',
      title: 'Handling Events and Forms',
      description: 'Master event handling and form management in React.',
      lectures: [
        { id: 'l16', title: 'Event Handling Basics', duration: '14:15', type: 'video' },
        { id: 'l17', title: 'Working with Forms', duration: '19:50', type: 'video' },
        { id: 'l18', title: 'Form Validation', duration: '22:30', type: 'video' },
        { id: 'l19', title: 'Practice Exercise: Building a Form', type: 'exercise' },
        { id: 'l20', title: 'Module Quiz', type: 'quiz' }
      ]
    }
  ],
  courseReviews: [
    {
      id: 'r1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      date: '2023-02-15',
      comment: 'This course is fantastic! The instructor explains concepts clearly and the exercises are very helpful.'
    },
    {
      id: 'r2',
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4,
      date: '2023-01-20',
      comment: 'Great course for beginners. I had zero experience with React and now I feel confident building my own applications.'
    },
    {
      id: 'r3',
      name: 'Michael Brown',
      avatar: 'https://i.pravatar.cc/150?img=8',
      rating: 5,
      date: '2023-03-05',
      comment: 'The instructor is knowledgeable and the course content is up-to-date. Highly recommended!'
    }
  ],
  what_you_learn: [
    'Build powerful, fast, user-friendly web applications',
    'Understand the React component lifecycle',
    'Master React Hooks for state management',
    'Create and manage complex forms with validation',
    'Implement routing in your React applications',
    'Connect to APIs and handle data flow'
  ],
  requirements: [
    'Basic HTML, CSS, and JavaScript knowledge',
    'Understanding of ES6+ syntax',
    'No prior React experience needed'
  ]
};
