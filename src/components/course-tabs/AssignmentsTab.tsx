
import { Calendar, Clock, User, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';

interface AssignmentsTabProps {
  courseId: string;
  moduleId?: string; // Add moduleId parameter to ensure it's passed from parent
}

const ASSIGNMENTS = [
  {
    id: 'a1',
    title: 'Create a Simple HTML Page',
    dueDate: '15th April, 2024',
    assignedDate: '5th April, 2024',
    estimatedTime: '2 hours',
    status: 'completed',
    score: '95/100'
  },
  {
    id: 'a2',
    title: 'CSS Styling Challenge',
    dueDate: '25th April, 2024',
    assignedDate: '10th April, 2024',
    estimatedTime: '3 hours',
    status: 'pending',
    score: null
  },
  {
    id: 'a3',
    title: 'JavaScript DOM Manipulation',
    dueDate: '10th May, 2024',
    assignedDate: '25th April, 2024',
    estimatedTime: '4 hours',
    status: 'pending',
    score: null
  },
  {
    id: 'a4',
    title: 'Build a React Component',
    dueDate: '20th May, 2024',
    assignedDate: '1st May, 2024',
    estimatedTime: '5 hours',
    status: 'not-started',
    score: null
  }
];

const AssignmentsTab = ({ courseId, moduleId }: AssignmentsTabProps) => {
  const navigate = useNavigate();
  const params = useParams();
  
  // Use moduleId from props if available, otherwise get it from URL params
  const currentModuleId = moduleId || params.moduleId;
  
  const handleAssignmentClick = (assignmentId: string) => {
    navigate(`/assignment/${courseId}/${assignmentId}`);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {ASSIGNMENTS.map((assignment) => (
          <Card key={assignment.id} className="overflow-hidden bg-white/80 dark:bg-slate-800/50 border-purple-200 dark:border-purple-800/30 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-1">
                <Badge
                  variant={
                    assignment.status === 'completed'
                      ? 'default'
                      : assignment.status === 'pending'
                      ? 'secondary'
                      : 'outline'
                  }
                  className={
                    assignment.status === 'completed'
                      ? 'bg-green-500'
                      : assignment.status === 'pending'
                      ? 'bg-purple-500 text-white'
                      : 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300'
                  }
                >
                  {assignment.status === 'completed'
                    ? 'Completed'
                    : assignment.status === 'pending'
                    ? 'In Progress'
                    : 'Not Started'}
                </Badge>
                {assignment.score && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {assignment.score}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl">{assignment.title}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-sm">
                  <div className="text-muted-foreground mb-1">Due Date</div>
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-purple-600 dark:text-purple-400" />
                    {assignment.dueDate}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-muted-foreground mb-1">Assigned</div>
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-purple-600 dark:text-purple-400" />
                    {assignment.assignedDate}
                  </div>
                </div>
                <div className="text-sm col-span-2">
                  <div className="text-muted-foreground mb-1">Estimated Time</div>
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-purple-600 dark:text-purple-400" />
                    {assignment.estimatedTime}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white" 
                variant={assignment.status === 'completed' ? 'outline' : 'default'}
                onClick={() => handleAssignmentClick(assignment.id)}
              >
                {assignment.status === 'completed' ? 'View Submission' : 'Start Assignment'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsTab;
