import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CourseHeader from '@/components/course/CourseHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Calendar, Clock, Bookmark, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`http://localhost:8080/api/courses/${id}`)
      .then(async response => {
        const courseData = response.data;

        // Fetch progress for each module
        const moduleProgresses = await Promise.all(
          courseData.modules.map(async (mod: any) => {
            try {
              const res = await axios.get(`http://localhost:8080/api/progress/${user.id}/${mod.id}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              return {
                ...mod,
                progress: (res.data.readingMaterialCompleted +
                          res.data.videoCompleted +
                          res.data.assignmentCompleted +
                          res.data.quizCompleted) * 25
              };
            } catch (err) {
              return { ...mod, progress: 0 };
            }
          })
        );

        courseData.modules = moduleProgresses;
        setCourse(courseData);
        setOverallProgress(getOverallCourseProgress(moduleProgresses));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching course data!", error);
        setLoading(false);
      });
  }, [id]);

  const getOverallCourseProgress = (modules: any[]) => {
    if (!modules.length) return 0;
    const total = modules.reduce((acc, mod) => acc + (mod.progress || 0), 0);
    return Math.round(total / modules.length);
  };

  const getProgressStatus = () => {
    if (overallProgress === 0) return "Not Started";
    if (overallProgress < 50) return "In Progress";
    if (overallProgress < 100) return "Almost Complete";
    return "Completed";
  };

  const getProgressColor = () => {
    if (overallProgress === 100) return "bg-green-500";
    if (overallProgress > 60) return "bg-purple-500";
    return "bg-purple-500";
  };

  const handleModuleClick = (moduleId: string) => {
    navigate(`/module/${id}/${moduleId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>No course data found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <CourseHeader courseId={id} title={course.title} description={course.description} />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link to="/" className="flex items-center text-sm mb-6 hover:underline text-purple-600 font-medium">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to All Courses
        </Link>

        {/* Overall Course Progress */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-purple-100 bg-purple-50">
            <h2 className="text-lg font-semibold text-purple-700 mb-1 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-600" />
              Overall Course Progress
            </h2>
            <div className="flex items-center justify-between">
              <Badge className={`text-white ${getProgressColor()}`}>{getProgressStatus()}</Badge>
              <span className="text-sm text-purple-700">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className={`h-2 mt-2 ${getProgressColor()}`} />
          </div>
        </div>

        {/* Modules List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="bg-gradient-to-r from-purple-100 to-purple-50 px-6 py-5 border-b border-purple-100">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <BookOpen className="h-6 w-6 mr-2.5 text-purple-600" />
              Course Modules
            </h2>
            <p className="text-gray-600 mt-1.5 ml-8.5">Complete all modules to receive your certificate</p>
          </div>

          <div className="p-6 space-y-5">
            {course.modules.map((module, index) => {
              const isCompleted = module.progress === 100;
              return (
                <div
                  key={module.id}
                  className="border border-purple-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <Badge variant="outline" className="w-fit bg-purple-100 text-purple-700 border-purple-200 font-medium">
                          {isCompleted ? (
                            <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                          ) : (
                            <Bookmark className="h-3.5 w-3.5 mr-1.5" />
                          )}
                          Module {index + 1}
                        </Badge>
                        <h3 className="text-lg font-medium text-gray-800 group-hover:text-purple-700 transition-colors">
                          {module.title}
                        </h3>
                      </div>
                      <Button
                        onClick={() => handleModuleClick(module.id)}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Go to Module Materials
                      </Button>
                    </div>

                    <p className="text-sm text-gray-600 text-left mt-2.5 md:ml-[7.5rem] md:mt-0">
                      {module.description}
                    </p>

                    <div className="mt-3.5 pt-3.5 border-t border-purple-100 flex flex-wrap gap-4 items-center">
                      <div className="flex items-center text-xs text-purple-700">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        <span>{module.totalLectures || 4} lectures</span>
                      </div>
                      <div className="flex items-center text-xs text-purple-700">
                        <Clock className="h-3.5 w-3.5 mr-1.5" />
                        <span>Estimated time: {(module.totalLectures || 4) * 25} minutes</span>
                      </div>
                      <div className="flex items-center text-xs text-purple-700">
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-600" />
                        <span>{module.progress}% completed</span>
                      </div>
                      {isCompleted && (
                        <Badge className="bg-green-100 text-green-700 border-green-200 ml-auto">
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
