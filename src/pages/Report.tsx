
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileChartLine, 
  Award, 
  GraduationCap, 
  ChartBar,
  Briefcase,
  Code,
  Github,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/types/calendar";

const Report = () => {
  // Sample student performance data
  const performanceData = {
    overallGrade: "A-",
    completionRate: "87%",
    averageScore: "84%",
    participation: "92%",
    strengths: ["Problem Solving", "Critical Thinking", "Research Skills"],
    areasToImprove: ["Time Management", "Group Participation"],
    coursePerformance: [
      { course: "Data Science Fundamentals", grade: "A", completionRate: "95%" },
      { course: "Web Development Masterclass", grade: "B+", completionRate: "82%" },
      { course: "Database Systems", grade: "A-", completionRate: "88%" },
      { course: "UX/UI Design Principles", grade: "B", completionRate: "79%" },
      { course: "Computer Science Basics", grade: "A", completionRate: "93%" }
    ],
    projects: [
      { 
        id: "p1",
        title: "E-Commerce Platform",
        description: "Built a responsive e-commerce platform with React, Node.js, and MongoDB.",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        link: "https://github.com/username/ecommerce",
        demoLink: "https://project-demo.com",
        grade: "A"
      },
      { 
        id: "p2",
        title: "Data Visualization Dashboard",
        description: "Created an interactive dashboard to visualize climate data using D3.js and React.",
        technologies: ["React", "D3.js", "TypeScript", "CSS"],
        link: "https://github.com/username/dashboard",
        demoLink: "https://dashboard-demo.com",
        grade: "A-"
      },
      { 
        id: "p3",
        title: "Social Media API",
        description: "Developed a RESTful API for a social media application with user authentication.",
        technologies: ["Node.js", "Express", "MongoDB", "JWT"],
        link: "https://github.com/username/social-api",
        grade: "B+"
      }
    ],
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "React", level: 88 },
      { name: "Node.js", level: 82 },
      { name: "TypeScript", level: 78 },
      { name: "HTML/CSS", level: 90 },
      { name: "MongoDB", level: 75 },
      { name: "SQL", level: 65 },
      { name: "Git", level: 85 },
      { name: "Python", level: 60 },
      { name: "UI/UX Design", level: 70 },
      { name: "Testing", level: 55 },
      { name: "GraphQL", level: 45 }
    ]
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Student Performance Report</h1>
        <p className="text-muted-foreground">A comprehensive overview of your academic performance across all courses.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="border border-muted/20">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <FileChartLine className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Overall Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Overall Grade</p>
                <p className="text-3xl font-bold text-primary mt-1">{performanceData.overallGrade}</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold text-primary mt-1">{performanceData.completionRate}</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold text-primary mt-1">{performanceData.averageScore}</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Participation</p>
                <p className="text-3xl font-bold text-primary mt-1">{performanceData.participation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-muted/20">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Skills Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {performanceData.strengths.map((strength, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Areas to Improve</h3>
                <div className="flex flex-wrap gap-2">
                  {performanceData.areasToImprove.map((area, index) => (
                    <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Heat Map */}
      <Card className="border border-muted/20 mb-8">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <ChartBar className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Skills Proficiency</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {performanceData.skills.map((skill) => (
              <div key={skill.name} className="flex flex-col">
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  <span className="font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${skill.level}%`,
                      background: `${
                        skill.level >= 90 ? '#8B5CF6' : 
                        skill.level >= 80 ? '#D946EF' : 
                        skill.level >= 70 ? '#0EA5E9' : 
                        skill.level >= 60 ? '#2DD4BF' : 
                        skill.level >= 50 ? '#10B981' : 
                        skill.level >= 40 ? '#F97316' : '#F43F5E'
                      }`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card className="border border-muted/20 mb-8">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Projects</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {performanceData.projects.map((project) => (
              <div key={project.id} className="bg-muted/10 p-4 rounded-lg border border-border/20">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{project.title}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                    project.grade.startsWith('A') 
                    ? 'bg-green-100 text-green-800' 
                    : project.grade.startsWith('B') 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    Grade: {project.grade}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Github className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-xs">Repository</span>
                  </Button>
                  {project.demoLink && (
                    <Button variant="outline" size="sm" className="h-8">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      <span className="text-xs">Live Demo</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-muted/20 mb-8">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Course Performance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Course</th>
                  <th className="text-left py-3 px-4">Grade</th>
                  <th className="text-left py-3 px-4">Completion</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.coursePerformance.map((course, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-muted/10" : ""}>
                    <td className="py-3 px-4">{course.course}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        course.grade.startsWith('A') 
                          ? 'text-green-600' 
                          : course.grade.startsWith('B') 
                            ? 'text-blue-600' 
                            : 'text-amber-600'
                      }`}>
                        {course.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4">{course.completionRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-muted/20">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <ChartBar className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Instructor Feedback</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/10 p-4 rounded-lg">
            <p className="italic text-muted-foreground">
              "This student demonstrates excellent analytical skills and consistently produces high-quality work. 
              They engage well with course materials and contribute thoughtfully to discussions.
              To improve further, focus on developing stronger time management skills and increasing
              participation in group activities."
            </p>
            <p className="mt-3 text-sm font-medium">- Prof. Sarah Johnson, Academic Advisor</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Report;
