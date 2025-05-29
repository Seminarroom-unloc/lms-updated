
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, HelpCircle, Trophy } from 'lucide-react';

const QUIZZES = [
  {
    id: '1',
    title: 'React Components and Props',
    course: 'Introduction to React Development',
    description: 'Test your understanding of React components and how to work with props.',
    questions: 15,
    timeLimit: 30,
    status: 'completed',
    score: 92,
  },
  {
    id: '2',
    title: 'JavaScript Closures and Scopes',
    course: 'Advanced JavaScript Patterns',
    description: 'Evaluate your knowledge of JavaScript closures, scopes, and lexical environments.',
    questions: 20,
    timeLimit: 40,
    status: 'pending',
  },
  {
    id: '3',
    title: 'UI Design Principles',
    course: 'UI/UX Design Principles',
    description: 'Test your understanding of core UI design principles and best practices.',
    questions: 18,
    timeLimit: 35,
    status: 'completed',
    score: 88,
  },
  {
    id: '4',
    title: 'RESTful API Fundamentals',
    course: 'Building RESTful APIs with Node.js',
    description: 'Evaluate your knowledge of RESTful API concepts and implementation details.',
    questions: 25,
    timeLimit: 45,
    status: 'pending',
  },
  {
    id: '5',
    title: 'D3.js Basics',
    course: 'Data Visualization with D3.js',
    description: 'Test your understanding of D3.js fundamentals and basic visualization techniques.',
    questions: 15,
    timeLimit: 30,
    status: 'in-progress',
    progress: 60,
  },
  {
    id: '6',
    title: 'React State Management',
    course: 'Introduction to React Development',
    description: 'Evaluate your knowledge of state management in React applications.',
    questions: 18,
    timeLimit: 35,
    status: 'in-progress',
    progress: 30,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          Completed
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
          Not Started
        </Badge>
      );
    case 'in-progress':
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          In Progress
        </Badge>
      );
    default:
      return null;
  }
};

const Quizzes = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <section className="pt-28 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Quizzes</h1>
            <p className="text-muted-foreground text-lg">
              Test your knowledge with course quizzes and assessments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUIZZES.map((quiz) => (
              <Card 
                key={quiz.id} 
                className="animate-fade-in overflow-hidden group hover:shadow-hover transition-shadow"
                style={{ animationDelay: `${parseInt(quiz.id) * 50}ms` }}
              >
                <CardHeader className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-2">
                    {getStatusBadge(quiz.status)}
                    <CardDescription>{quiz.course}</CardDescription>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{quiz.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                  <p className="text-muted-foreground mb-4">{quiz.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      <span>{quiz.timeLimit} minutes</span>
                    </div>
                  </div>
                  
                  {quiz.status === 'in-progress' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{quiz.progress}%</span>
                      </div>
                      <Progress value={quiz.progress} className="h-1.5" />
                    </div>
                  )}
                  
                  {quiz.status === 'completed' && (
                    <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-md flex items-center">
                      <Trophy className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <div className="font-medium">Score: {quiz.score}%</div>
                        <div className="text-xs text-muted-foreground">
                          {quiz.score >= 90 ? 'Excellent!' : quiz.score >= 80 ? 'Great job!' : 'Good effort!'}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50">
                  {quiz.status === 'pending' && (
                    <Button className="w-full">Start Quiz</Button>
                  )}
                  
                  {quiz.status === 'in-progress' && (
                    <Button className="w-full">Continue Quiz</Button>
                  )}
                  
                  {quiz.status === 'completed' && (
                    <Button variant="outline" className="w-full">Review Answers</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quizzes;
