import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isBefore, isToday, addDays, isAfter, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Filter, CalendarClock } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { SessionDetailsDialog } from "@/components/SessionDetailsDialog";
import { CalendarEvent } from "@/types/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  
  const currentDate = new Date();
  
  const events: CalendarEvent[] = [
    {
      id: "1",
      name: "Introduction to Python",
      date: new Date(2024, 6, 10, 10, 0),
      endDate: new Date(2024, 6, 10, 12, 0),
      type: "course",
      description: "Learn the basics of Python programming. This is a beginner-friendly session covering variables, data types, and basic control structures.",
      instructor: "Dr. Sarah Brown",
      location: "Virtual Classroom 3A",
      tags: ["Programming", "Beginner"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "2",
      name: "Data Science Fundamentals Quiz",
      date: new Date(2024, 6, 15, 14, 0),
      endDate: new Date(2024, 6, 15, 15, 30),
      type: "quiz",
      description: "A quiz to test your understanding of data science fundamentals including statistics, data visualization, and basic machine learning concepts.",
      instructor: "Prof. James Wilson",
      location: "Online",
      tags: ["Data Science", "Assessment"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "3",
      name: "Live Coding Challenge: Algorithms",
      date: new Date(2024, 6, 20, 16, 0),
      endDate: new Date(2024, 6, 20, 18, 0),
      type: "challenge",
      description: "Join us for a live coding challenge focusing on algorithms and data structures. This is a competitive event with prizes for the top performers.",
      instructor: "Alex Chen",
      location: "Virtual Lab 2",
      tags: ["Algorithms", "Competition"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "4",
      name: "Web Development Workshop",
      date: new Date(2024, 6, 12, 13, 0),
      endDate: new Date(2024, 6, 12, 15, 0),
      type: "course",
      description: "A hands-on workshop on modern web development practices using React and Node.js.",
      instructor: "Emily Johnson",
      location: "Virtual Classroom 1B",
      tags: ["Web Development", "React"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "5",
      name: "Database Systems Quiz",
      date: new Date(2024, 6, 18, 11, 0),
      endDate: new Date(2024, 6, 18, 12, 30),
      type: "quiz",
      description: "Test your knowledge of database design, SQL queries, and database management systems.",
      instructor: "Dr. Michael Lee",
      location: "Online",
      tags: ["Databases", "SQL"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "6",
      name: "JavaScript Fundamentals",
      date: addDays(currentDate, 1),
      endDate: addDays(currentDate, 1, 2),
      type: "course",
      description: "Master the basics of JavaScript including variables, functions, and DOM manipulation.",
      instructor: "Mark Wilson",
      location: "Virtual Classroom 2C",
      tags: ["JavaScript", "Web Development"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "7",
      name: "Data Structures Quiz",
      date: addDays(currentDate, 2),
      endDate: addDays(currentDate, 2, 1.5),
      type: "quiz",
      description: "Test your knowledge on arrays, linked lists, trees, and graphs.",
      instructor: "Dr. Lisa Chen",
      location: "Online",
      tags: ["Data Structures", "Algorithms"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "8",
      name: "Mobile App Development",
      date: addDays(currentDate, 3),
      endDate: addDays(currentDate, 3, 2),
      type: "course",
      description: "Learn how to build cross-platform mobile applications using React Native.",
      instructor: "Jason Park",
      location: "Virtual Lab 1",
      tags: ["Mobile", "React Native"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    },
    {
      id: "9",
      name: "Hackathon: AI Solutions",
      date: addDays(currentDate, 5),
      endDate: addDays(currentDate, 5, 8),
      type: "challenge",
      description: "Participate in a day-long hackathon to build AI-powered solutions for real-world problems.",
      instructor: "Dr. Robert Johnson",
      location: "Virtual Collab Space",
      tags: ["AI", "Hackathon", "Competition"],
      imageUrl: "/lovable-uploads/036ce3de-ca69-4830-9b71-ff1fd7d7c0ed.png"
    }
  ];

  function addDays(date: Date, days: number, hours: number = 0): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    if (hours) {
      result.setHours(result.getHours() + hours);
    }
    return result;
  }

  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      isSameDay(event.date, day)
    );
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsDateDialogOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
    setIsDateDialogOpen(false);
  };

  const renderEventIndicators = (day: Date) => {
    const dayEvents = getEventsForDay(day);

    if (dayEvents.length === 0) return null;

    return (
      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
        {dayEvents.slice(0, 3).map((event, index) => (
          <div 
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${
              event.type === 'course' ? 'bg-blue-500' : 
              event.type === 'quiz' ? 'bg-amber-500' : 
              'bg-green-500'
            }`}
          />
        ))}
        {dayEvents.length > 3 && (
          <div className="text-xs text-muted-foreground">+{dayEvents.length - 3}</div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Calendar</h1>
      
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between px-6">
          <CardTitle className="text-xl">{format(date, 'MMMM yyyy')}</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <TooltipProvider>
            <Calendar
              mode="default"
              className="rounded-md border w-full max-w-none"
              style={{ minWidth: "100%" }}
              onMonthChange={setDate}
              onDayClick={handleDayClick}
              components={{
                DayContent: ({ date, ...props }) => {
                  return (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative h-14 w-14 p-2 font-normal aria-selected:opacity-100 flex items-center justify-center hover:bg-muted/50 rounded-md cursor-pointer">
                          <div>{date.getDate()}</div>
                          {renderEventIndicators(date)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {getEventsForDay(date).length > 0 
                          ? `${getEventsForDay(date).length} events`
                          : "No events"}
                      </TooltipContent>
                    </Tooltip>
                  );
                }
              }}
            />
          </TooltipProvider>
        </CardContent>
      </Card>

      <Dialog open={isDateDialogOpen} onOpenChange={setIsDateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {selectedDate && getEventsForDay(selectedDate).length > 0 ? (
              getEventsForDay(selectedDate).map((event) => (
                <div 
                  key={event.id}
                  className="p-3 rounded-md border cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`h-3 w-3 rounded-full ${
                      event.type === 'course' ? 'bg-blue-500' : 
                      event.type === 'quiz' ? 'bg-amber-500' : 
                      'bg-green-500'
                    }`} />
                    <p className="font-medium">{event.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <CalendarClock className="h-4 w-4" />
                    {format(event.date, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-6">No events scheduled for this day</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedEvent && (
        <SessionDetailsDialog 
          event={selectedEvent} 
          open={isEventDialogOpen} 
          onOpenChange={setIsEventDialogOpen} 
        />
      )}
    </div>
  );
};

export default CalendarPage;
