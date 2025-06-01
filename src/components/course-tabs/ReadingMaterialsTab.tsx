
import { useState } from 'react';
import { BookOpen, Clock, Download, Calendar, User, Play, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ReadingMaterialsTabProps {
  courseId: string;
}

const MATERIALS = [
  {
    id: 'm1',
    title: 'Frontend - HTML Fundamentals',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://i.pravatar.cc/150?img=1',
    date: '10th April, 2024',
    pages: 35,
    duration: '30 mins',
    category: 'frontend',
    type: 'pdf',
    imageSrc: 'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'm2',
    title: 'Introduction to CSS and JS',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://i.pravatar.cc/150?img=1',
    date: '17th April, 2024',
    pages: 50,
    duration: '1 hr 30 mins',
    category: 'frontend',
    type: 'pdf',
    imageSrc: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 'm3',
    title: 'Modern JavaScript Concepts',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://i.pravatar.cc/150?img=1',
    date: '18th May, 2024',
    pages: 45,
    duration: '50 mins',
    category: 'frontend',
    type: 'pdf',
    imageSrc: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'v1',
    title: 'React Hooks Explained',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://i.pravatar.cc/150?img=1',
    date: '5th April, 2024',
    duration: '45 mins',
    category: 'frontend',
    type: 'video',
    imageSrc: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'v2',
    title: 'Building Components with React',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://i.pravatar.cc/150?img=1',
    date: '12th April, 2024',
    duration: '1 hr 10 mins',
    category: 'frontend',
    type: 'video',
    imageSrc: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop'
  }
];

const ReadingMaterialsTab = ({ courseId }: ReadingMaterialsTabProps) => {
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold mb-4">Reading Materials</h2>
      
      {MATERIALS.map((material) => (
        <Card key={material.id} className="overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-all duration-200">
          <div className="md:w-48 h-40 md:h-full overflow-hidden bg-muted relative">
            <img 
              src={material.imageSrc} 
              alt={material.title} 
              className="w-full h-full object-cover"
            />
            {material.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Play className="w-12 h-12 text-white fill-white" />
              </div>
            )}
          </div>
          
          <div className="flex-grow flex flex-col justify-between p-5">
            <div>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl">{material.title}</CardTitle>
                <Badge variant="outline" className={`${material.type === 'video' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-primary/10 text-primary'}`}>
                  {material.type === 'video' ? 'Video' : 'PDF'}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 mt-2 mb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="w-3.5 h-3.5 mr-1.5" />
                  <span>{material.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>Published {material.date}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                {material.type === 'pdf' && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                    <span>{material.pages} pages</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  <span>Duration: {material.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-auto">
              <Button variant="default" className="w-28">
                {material.type === 'video' ? 'Watch Now' : 'Read Now'}
              </Button>
              {material.type === 'pdf' && (
                <Button variant="outline" className="w-28">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ReadingMaterialsTab;
