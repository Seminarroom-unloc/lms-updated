import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Clock,
  ListOrdered,
  CheckCircle,
  ArrowLeft,
  Calendar as CalendarIcon,
  HelpCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PROGRESS_VALUES = {
  readingMaterial: 25,
  video: 25,
  assignment: 25,
  quiz: 25,
};

const ModuleDetails = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const userId = user?.id;
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  // State hooks - **all at top level, no conditional hooks!**
  const [activeTab, setActiveTab] = useState('reading-materials');
  const [module, setModule] = useState<any>(null);

  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState({
    readingMaterial: false,
    video: false,
    assignment: false,
    quiz: false,
  });

  const [readingMaterials, setReadingMaterials] = useState<any[]>([]);
  const [videoLinks, setVideoLinks] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Load progress once on mount or when userId/moduleId changes
  useEffect(() => {
    if (!userId || !moduleId) return;

    axios
      .get(`http://localhost:8080/api/progress/${userId}/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCompleted({
          readingMaterial: res.data.readingMaterial,
          video: res.data.video,
          assignment: res.data.assignment,
          quiz: res.data.quiz,
        });
      })
      .catch(() => {
        // No progress yet, keep defaults false
      });
  }, [userId, moduleId, token]);

  // Save progress whenever 'completed' changes, debounce to avoid excess calls
  const saveProgress = useCallback(() => {
    if (!userId || !moduleId) return;

    axios
      .post(
        `http://localhost:8080/api/progress`,
        {
          userId,
          moduleId,
          readingMaterial: completed.readingMaterial,
          video: completed.video,
          assignment: completed.assignment,
          quiz: completed.quiz,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((err) => {
        console.error('Error saving progress', err);
      });
  }, [userId, moduleId, completed, token]);

  useEffect(() => {
    saveProgress();
  }, [saveProgress]);

  // Fetch module and content data on courseId/moduleId change
  useEffect(() => {
    if (!courseId || !moduleId) return;

    // Module info
    axios
      .get(`http://localhost:8080/api/courses/${courseId}/modules/${moduleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setModule(res.data))
      .catch((err) => console.error('Error fetching module data', err));

    // Reading materials
    axios
      .get(`http://localhost:8080/api/modules/${moduleId}/reading-materials`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReadingMaterials(res.data))
      .catch((err) => console.error('Error fetching reading materials', err));

    // Video lectures
    axios
      .get(`http://localhost:8080/api/modules/${moduleId}/video-lectures`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVideoLinks(res.data))
      .catch((err) => console.error('Error fetching video lectures', err));

    // Assignments
    axios
      .get(`http://localhost:8080/api/courses/${courseId}/modules/${moduleId}/assignments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error('Error fetching assignments', err));
  }, [courseId, moduleId, token]);

  // Calculate overall progress %
  useEffect(() => {
    let newProgress = 0;
    if (completed.readingMaterial) newProgress += PROGRESS_VALUES.readingMaterial;
    if (completed.video) newProgress += PROGRESS_VALUES.video;
    if (completed.assignment) newProgress += PROGRESS_VALUES.assignment;
    if (completed.quiz) newProgress += PROGRESS_VALUES.quiz;

    setProgress(newProgress);
  }, [completed]);

  // Helpers for progress UI
  const getProgressStatus = () => {
    if (progress === 0) return 'Not Started';
    if (progress < 50) return 'In Progress';
    if (progress < 100) return 'Almost Complete';
    return 'Completed';
  };
  const getProgressColor = () => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 60) return 'bg-purple-500';
    return 'bg-purple-500';
  };

  // Handlers for interaction
  const handleDownload = async (materialId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/courses/${courseId}/modules/${moduleId}/reading-materials/${materialId}/download`,
        { responseType: 'blob', headers: { Authorization: `Bearer ${token}` } }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `material_${materialId}.pdf`;
      link.click();

      setCompleted((prev) => ({ ...prev, readingMaterial: true }));
    } catch (error) {
      console.error('Error downloading PDF', error);
    }
  };

  const handleWatchVideo = (videoUrl: string) => {
    setCompleted((prev) => ({ ...prev, video: true }));
    window.open(videoUrl, '_blank');
  };

  const handleStartAssignment = (assignmentId: number) => {
    setCompleted((prev) => ({ ...prev, assignment: true }));
    navigate(`/assignment/${courseId}/${moduleId}/${assignmentId}`);
  };

  const quizzes = [
    {
      id: 'q1',
      title: `${module?.title} - Quiz`,
      questions: 10,
      timeLimit: '15 minutes',
      status: completed.quiz ? 'completed' : 'not-started',
      availableUntil: '30 days from now',
      formUrl:
        'https://docs.google.com/forms/d/e/1FAIpQLSdhvwIssi8f897-edomcWFnN32p2nPHLPlGl3CtdEoHO9qY1w/viewform?embedded=true',
    },
  ];

  const handleBackToQuiz = () => {
    setCompleted((prev) => ({ ...prev, quiz: true }));
    setShowForm(false);
  };

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20 bg-purple-700 text-white">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Link to={`/course/${courseId}`} className="flex items-center text-sm mb-4 hover:underline text-white/80">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Course
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <div className="flex items-center mb-2">
                <Badge variant="outline" className="mr-3 bg-white/10 text-white border-white/20">
                  <ListOrdered className="h-3.5 w-3.5 mr-1" />
                  Module
                </Badge>
              </div>
              <h1 className="text-2xl font-bold">{module.title}</h1>
              <p className="text-white/80 mt-1">{module.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Card className="mb-6 bg-white border-purple-100 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div className="flex items-center mb-2 md:mb-0">
                <h3 className="font-medium mr-2">Module Progress:</h3>
                <Badge className={`${progress === 100 ? 'bg-green-500' : 'bg-purple-600'} text-white`}>
                  {getProgressStatus()}
                </Badge>
              </div>
              <div className="flex items-center">
                {progress === 100 && (
                  <div className="flex items-center text-green-500 mr-2">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Complete</span>
                  </div>
                )}
                <span className="text-sm font-medium">{progress}%</span>
              </div>
            </div>
            <Progress value={progress} className={`h-2 ${getProgressColor()}`} />
          </CardContent>
        </Card>

        <Tabs defaultValue="reading-materials" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-fit grid-cols-4 md:grid-cols-4 mb-8 mx-auto bg-purple-100 text-purple-800">
            <TabsTrigger value="reading-materials" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Reading Materials
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Video Lectures
            </TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Assignments
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reading-materials">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Reading Materials</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {readingMaterials.map((material) => (
                <Card key={material.id} className="bg-white border-purple-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        PDF
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleDownload(material.id)}
                    >
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Video Lectures</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {videoLinks.map((video) => (
                <Card key={video.id} className="bg-white border-purple-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                      <span>{video.duration || 'N/A'}</span>
                    </div>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleWatchVideo(video.youtubeLink)}
                    >
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Assignments</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="bg-white border-purple-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 mb-2">
                      {assignment.status === 'completed'
                        ? 'Completed'
                        : assignment.status === 'in-progress'
                        ? 'In Progress'
                        : 'Not Started'}
                    </Badge>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => handleStartAssignment(assignment.id)}
                    >
                      Start Assignment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Quiz</h2>
            {!showForm && (
              <div className="grid gap-4 md:grid-cols-2">
                {quizzes.map((quiz) => (
                  <Card
                    key={quiz.id}
                    className="bg-white border-purple-100 hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 mb-2">
                        {quiz.status === 'completed'
                          ? 'Completed'
                          : quiz.status === 'in-progress'
                          ? 'In Progress'
                          : 'Not Started'}
                      </Badge>
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="text-sm">
                          <div className="text-muted-foreground mb-1">Questions</div>
                          <div className="flex items-center">
                            <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                            {quiz.questions}
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="text-muted-foreground mb-1">Time Limit</div>
                          <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                            {quiz.timeLimit}
                          </div>
                        </div>
                        <div className="text-sm col-span-2">
                          <div className="text-muted-foreground mb-1">Available Until</div>
                          <div className="flex items-center">
                            <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                            {quiz.availableUntil}
                          </div>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => setShowForm(true)}
                      >
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {showForm && (
              <div className="mt-4 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={quizzes[0].formUrl}
                  width="100%"
                  height="800"
                  frameBorder="0"
                  className="rounded-lg"
                  title="Quiz Form"
                >
                  Loading…
                </iframe>
                <Button
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={handleBackToQuiz}
                >
                  Back to Quiz
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModuleDetails;
