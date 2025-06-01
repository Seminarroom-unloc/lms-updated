import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, AlertCircle, Calendar, Clock } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AssignmentSubmission = () => {
  const { courseId, moduleId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [linkSubmission, setLinkSubmission] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (courseId && moduleId && assignmentId) {
      // Fetch assignment data from the backend
      axios.get(`http://localhost:8080/api/courses/${courseId}/modules/${moduleId}/assignments/${assignmentId}`)
        .then(response => {
          setAssignment(response.data); // Set fetched assignment data
        })
        .catch(error => {
          console.error("Error fetching assignment:", error);
        });
    }
  }, [courseId, moduleId, assignmentId]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
      toast({
        title: "File uploaded",
        description: `Successfully uploaded ${e.target.files[0].name}`,
      });
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Assignment submitted",
      description: "Your assignment has been submitted successfully!",
    });
  };

  // If the assignment data is not yet fetched, show a loading message
  if (!assignment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading assignment data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <div className="pt-20 bg-purple-700 text-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Link to={`/module/${courseId}/${moduleId}`} className="flex items-center text-sm mb-4 hover:underline text-white/80">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Module
          </Link>

          <h1 className="text-3xl font-bold mb-2">{assignment.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-white/80 mr-1.5" />
              <span>Due: {assignment.dueDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-white/80 mr-1.5" />
              <span>Estimated time: {assignment.estimatedTime}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Assignment Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full mb-6 bg-black">
                  <iframe
                    src={assignment.videoUrl}
                    className="w-full h-full"
                    title="Assignment Instructions"
                    allowFullScreen
                  ></iframe>
                </div>

                <h3 className="text-lg font-medium mb-3">Description</h3>
                <p className="mb-6 text-muted-foreground">{assignment.instruction}</p>

              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Upload Files</h3>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-purple-500 mb-2" />
                          <p className="text-sm mb-1">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PDF, ZIP or other files (max. 50 MB)</p>
                          {uploadedFile && (
                            <div className="mt-3 p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-md w-full">
                              {uploadedFile.name}
                            </div>
                          )}

                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Or Submit Link</h3>
                    <Textarea
                      placeholder="Paste your GitHub repository or other link here"
                      className="h-20 resize-none"
                      value={linkSubmission}
                      onChange={(e) => setLinkSubmission(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Additional Comments (Optional)</h3>
                    <Textarea
                      placeholder="Add any comments for your instructor"
                      className="h-20 resize-none"
                    />
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Once submitted, you cannot edit your submission. Make sure everything is correct before submitting.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Submit Assignment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission;
