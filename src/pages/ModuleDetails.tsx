import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  ArrowLeft,
  Video,
  Clock,
  ListOrdered,
  CheckCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ModuleDetails = () => {
  const { courseId, moduleId } = useParams();
  const [activeTab, setActiveTab] = useState('reading-materials');
  const [module, setModule] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [readingMaterials, setReadingMaterials] = useState<any[]>([]);
  const [videoLinks, setVideoLinks] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // State for storing selected video URL
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch the module data and its content
    axios.get(`http://localhost:8080/api/courses/${courseId}/modules/${moduleId}`)
      .then(response => {
        setModule(response.data); // Set the module data
        setProgress(Math.floor(Math.random() * 100)); // Simulated progress, replace with actual data
      })
      .catch(error => {
        console.error("Error fetching module data", error);
      });

    // Fetch reading materials for the module
    axios.get(`http://localhost:8080/api/modules/${moduleId}/reading-materials`)
      .then(response => {
        setReadingMaterials(response.data); // Set reading materials data
      })
      .catch(error => {
        console.error("Error fetching reading materials", error);
      });

    // Fetch video links for the module
    axios.get(`http://localhost:8080/api/modules/${moduleId}/video-lectures`)
      .then(response => {
        setVideoLinks(response.data); // Set video links data
      })
      .catch(error => {
        console.error("Error fetching video links", error);
      });

    // Fetch assignments for the module
    axios.get(`http://localhost:8080/api/courses/${courseId}/modules/${moduleId}/assignments`)
      .then(response => {
        setAssignments(response.data); // Set assignments data
      })
      .catch(error => {
        console.error("Error fetching assignments", error);
      });

  }, [courseId, moduleId]);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Module not found</p>
      </div>
    );
  }

  const handleStartAssignment = (assignmentId: string) => {
    navigate(`/assignment/${courseId}/${moduleId}/${assignmentId}`);
  };

  const getProgressStatus = () => {
    if (progress === 0) return "Not Started";
    if (progress < 50) return "In Progress";
    if (progress < 100) return "Almost Complete";
    return "Completed";
  };

  const getProgressColor = () => {
    if (progress === 100) return "bg-green-500";
    if (progress > 60) return "bg-purple-500";
    return "bg-purple-500";
  };

  const handleWatchVideo = (videoUrl: string) => {
    // Redirecting the user to the YouTube video URL
    window.location.href = videoUrl;
  };

  const handleDownload = async (materialId: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/courses/${courseId}/modules/${moduleId}/reading-materials/${materialId}/download`, {
        responseType: 'blob', // Expect a binary response
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `material_${materialId}.pdf`; // Set a filename for the downloaded file
      link.click();
    } catch (error) {
      console.error('Error downloading PDF', error);
    }
  };
  

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
                <Badge className={`${progress === 100 ? "bg-green-500" : "bg-purple-600"} text-white`}>
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
            <TabsTrigger value="reading-materials" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Reading Materials</TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Video Lectures</TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Assignments</TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Quiz</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reading-materials">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Reading Materials</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {readingMaterials.map((material) => (
                <Card key={material.id} className="bg-white border-purple-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">{material.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Size: {material.size}</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleDownload(material.id)}></Button>
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
                      <span>{video.duration}</span>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handleWatchVideo(video.youtubeLink)}>
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
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        {assignment.status === 'completed'
                          ? 'Completed'
                          : assignment.status === 'in-progress'
                          ? 'In Progress'
                          : 'Not Started'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Due Date</div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                          {assignment.dueDate}
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Est. Time</div>
                        <div className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                          {assignment.estimatedTime}
                        </div>
                      </div>
                    </div>
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
        </Tabs>
      </div>
    </div>
  );
};

export default ModuleDetails;
