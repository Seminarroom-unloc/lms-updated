import { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '@/components/CourseCard';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [courses, setCourses] = useState<any[]>([]); // State to hold courses data

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch courses from the backend
    axios.get('http://localhost:8080/api/courses')
      .then(response => {
        setCourses(response.data); // Set the fetched courses data
      })
      .catch(error => {
        console.error("Error fetching courses", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Your learning journey starts here
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Expand your knowledge with expert-led courses
              </h1>
              <p className="text-lg text-muted-foreground">
                Access high-quality courses taught by industry professionals. Learn at your own pace and achieve your goals.
              </p>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Students learning" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Courses Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">Featured Courses</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore our most popular courses and start learning today
              </p>
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id} 
                title={course.title} 
                description={course.description} 
                instructor={course.trainer_name} // Trainer name
                instructorAvatar='https://i.pravatar.cc/150?img=1' // Assume trainer_avatar is available in the response
                duration= '6 weeks'
                modules= {4}
                level= 'Beginner'
                imgSrc= 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
                className="animate-slide-in"
                animationDelay={`${parseInt(course.id) * 100}ms`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 px-4 md:px-6 bg-white dark:bg-slate-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[ 
              { name: 'Web Development', count: 42, icon: '💻' },
              { name: 'Data Science', count: 18, icon: '📊' },
              { name: 'Mobile Development', count: 24, icon: '📱' },
              { name: 'UI/UX Design', count: 16, icon: '🎨' },
              { name: 'Machine Learning', count: 12, icon: '🤖' },
              { name: 'DevOps', count: 9, icon: '⚙️' },
              { name: 'Cybersecurity', count: 8, icon: '🔒' },
              { name: 'Blockchain', count: 6, icon: '🔗' }
            ].map((category, index) => (
              <div 
                key={category.name}
                className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-border/40 hover:border-primary/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} courses</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 bg-slate-100 dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold">Seminarroom</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Expanding knowledge and empowering learners worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">All Courses</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Learning Paths</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Certifications</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Instructors</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Seminarroom. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
