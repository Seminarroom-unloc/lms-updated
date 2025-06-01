
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, MapPin, Book } from "lucide-react";

const SessionHistory = () => {
  const sessions = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      date: "May 15, 2023",
      duration: "2 hours",
      location: "Online",
      course: "Data Science Fundamentals",
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns",
      date: "April 28, 2023",
      duration: "1.5 hours",
      location: "Online",
      course: "Web Development Masterclass",
    },
    {
      id: 3,
      title: "Database Design Principles",
      date: "April 10, 2023",
      duration: "2.5 hours",
      location: "Computer Lab 101",
      course: "Database Systems",
    },
    {
      id: 4,
      title: "User Experience Research Methods",
      date: "March 22, 2023",
      duration: "3 hours",
      location: "Design Studio",
      course: "UX/UI Design Principles",
    },
    {
      id: 5,
      title: "Algorithms and Data Structures",
      date: "March 15, 2023",
      duration: "2 hours",
      location: "Online",
      course: "Computer Science Basics",
    }
  ];

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Session History</h1>
      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{session.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{session.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{session.duration}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{session.location}</span>
                </div>
                <div className="flex items-center">
                  <Book className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{session.course}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SessionHistory;
