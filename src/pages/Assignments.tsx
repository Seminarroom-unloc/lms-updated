import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Assignments = () => {
  const { courseId, moduleId } = useParams(); // Get the courseId and moduleId from URL
  const [assignments, setAssignments] = useState<any[]>([]);

  // Fetch assignments data from the backend
  useEffect(() => {
    axios.get(`http://localhost:8080/api/courses/${courseId}/modules/${moduleId}/assignments`)
      .then(response => {
        setAssignments(response.data); // Set fetched assignments data
      })
      .catch(error => {
        console.error("Error fetching assignments:", error);
      });
  }, [courseId, moduleId]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />

      <section className="pt-28 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Assignments</h1>
            <p className="text-muted-foreground text-lg">
              Track your course assignments and submissions
            </p>
          </div>

          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 gap-4">
                {assignments.map((assignment) => (
                  <Card key={assignment.id} className="animate-fade-in cursor-pointer hover:shadow-hover transition-shadow overflow-hidden group">
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex flex-wrap justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                            </Badge>
                            <CardDescription>{assignment.course}</CardDescription>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">{assignment.title}</CardTitle>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          <span className="text-sm">Due {formatDate(assignment.dueDate)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                      <p className="text-muted-foreground mb-4">{assignment.description}</p>

                      {assignment.status === 'completed' && (
                        <div className="bg-muted p-3 rounded-md">
                          <div className="flex items-center mb-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="font-medium">Grade: {assignment.grade}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {/* Repeat for other tab contents: pending, submitted, completed */}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Assignments;
