
import { Clock, HelpCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface QuizTabProps {
  courseId: string;
}

const QUIZZES = [
  {
    id: 'q1',
    title: 'HTML Basics',
    questions: 10,
    timeLimit: '15 minutes',
    status: 'completed',
    score: 90,
    availableUntil: 'May 30, 2024'
  },
  {
    id: 'q2',
    title: 'CSS Fundamentals',
    questions: 15,
    timeLimit: '20 minutes',
    status: 'in-progress',
    progress: 40,
    availableUntil: 'May 30, 2024'
  },
  {
    id: 'q3',
    title: 'JavaScript Essentials',
    questions: 20,
    timeLimit: '30 minutes',
    status: 'not-started',
    availableUntil: 'June 15, 2024'
  },
  {
    id: 'q4',
    title: 'React Concepts',
    questions: 25,
    timeLimit: '40 minutes',
    status: 'not-started',
    availableUntil: 'June 30, 2024'
  }
];

const QuizTab = ({ courseId }: QuizTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {QUIZZES.map((quiz) => (
          <Card key={quiz.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-1">
                <Badge
                  variant={
                    quiz.status === 'completed'
                      ? 'default'
                      : quiz.status === 'in-progress'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {quiz.status === 'completed'
                    ? 'Completed'
                    : quiz.status === 'in-progress'
                    ? 'In Progress'
                    : 'Not Started'}
                </Badge>
                {quiz.score !== undefined && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {quiz.score}%
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl">{quiz.title}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-sm">
                  <div className="text-muted-foreground mb-1">Questions</div>
                  <div className="flex items-center">
                    <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
                    {quiz.questions}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-muted-foreground mb-1">Time Limit</div>
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {quiz.timeLimit}
                  </div>
                </div>
                <div className="text-sm col-span-2">
                  <div className="text-muted-foreground mb-1">Available Until</div>
                  <div className="flex items-center">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
                    {quiz.availableUntil}
                  </div>
                </div>
              </div>
              
              {quiz.status === 'in-progress' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{quiz.progress}%</span>
                  </div>
                  <Progress value={quiz.progress} className="h-2" />
                </div>
              )}
              
              <Button className="w-full" variant={quiz.status === 'completed' ? 'outline' : 'default'}>
                {quiz.status === 'completed' 
                  ? 'View Results' 
                  : quiz.status === 'in-progress' 
                  ? 'Continue Quiz' 
                  : 'Start Quiz'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizTab;
