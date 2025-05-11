
import { ArrowRight, Clock, BookOpen, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  duration: string;
  modules: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  imgSrc?: string;
  className?: string;
  animationDelay?: string;
}

const CourseCard = ({
  id,
  title,
  description,
  instructor,
  instructorAvatar,
  duration,
  modules,
  level,
  imgSrc,
  className,
  animationDelay
}: CourseCardProps) => {
  return (
    <Link to={`/course/${id}`}>
      <Card className={cn(
        "overflow-hidden card-hover border border-border/40", 
        className
      )} style={animationDelay ? { animationDelay } : undefined}>
        {imgSrc && (
          <div className="aspect-[16/9] overflow-hidden bg-muted">
            <img 
              src={imgSrc} 
              alt={title} 
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="bg-accent text-accent-foreground text-xs px-2 py-0">
              {level}
            </Badge>
          </div>
          <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="p-4 pt-0 pb-2">
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Clock className="w-3.5 h-3.5 mr-1" /> 
            <span>{duration}</span>
            <span className="mx-2">•</span>
            <BookOpen className="w-3.5 h-3.5 mr-1" /> 
            <span>{modules} modules</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-2 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={instructorAvatar}
              alt={instructor}
              className="w-6 h-6 rounded-full mr-2 object-cover"
            />
            <span className="text-sm">{instructor}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-primary" />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
