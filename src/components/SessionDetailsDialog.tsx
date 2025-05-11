
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarEvent } from "@/types/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarClock, MapPin, Tag } from "lucide-react";

interface SessionDetailsDialogProps {
  event: CalendarEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SessionDetailsDialog({ event, open, onOpenChange }: SessionDetailsDialogProps) {
  // Get the initials for the avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <div className="relative h-40 w-full">
          <img 
            src={event.imageUrl || "https://github.com/shadcn.png"} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h3 className="text-xl font-semibold">{event.name}</h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <div className="text-sm font-medium">Type</div>
                <div className="flex items-center mt-1">
                  <span 
                    className={`inline-block h-2.5 w-2.5 rounded-full mr-2 ${
                      event.type === 'course' ? 'bg-blue-500' : 
                      event.type === 'quiz' ? 'bg-amber-500' : 
                      'bg-green-500'
                    }`} 
                  />
                  <span className="capitalize">{event.type}</span>
                </div>
              </div>
              
              <div className="flex flex-col">
                <div className="text-sm font-medium">Duration</div>
                <div className="text-sm">
                  {format(event.date, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
                </div>
              </div>
            </div>
            
            <div>
              <Button className="bg-primary">Register</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar className="mt-1">
                <AvatarImage src="https://github.com/shadcn.png" alt={event.instructor} />
                <AvatarFallback>{getInitials(event.instructor)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{event.instructor}</div>
                <div className="text-sm text-muted-foreground">Instructor</div>
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarClock className="h-4 w-4" />
              <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4" />
                <span className="text-sm font-medium">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs rounded-full bg-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
