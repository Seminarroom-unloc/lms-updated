
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search, ThumbsUp, Clock, Reply } from 'lucide-react';

const DISCUSSIONS = [
  {
    id: '1',
    title: 'How do React hooks work under the hood?',
    author: 'Alex Thompson',
    authorAvatar: 'https://i.pravatar.cc/150?img=11',
    course: 'Introduction to React Development',
    content: 'I understand the basic usage of hooks like useState and useEffect, but I\'m curious about how they actually work internally. Does anyone have insights into the React hooks implementation?',
    timestamp: '2023-06-10T14:30:00',
    likes: 24,
    replies: 8,
    tags: ['react', 'hooks', 'javascript'],
  },
  {
    id: '2',
    title: 'Best practices for JavaScript error handling?',
    author: 'Emma Davis',
    authorAvatar: 'https://i.pravatar.cc/150?img=9',
    course: 'Advanced JavaScript Patterns',
    content: 'I\'m working on improving error handling in my JavaScript application. What are some best practices and patterns you\'ve found effective? Should I use try/catch everywhere or are there better approaches?',
    timestamp: '2023-06-09T09:15:00',
    likes: 19,
    replies: 12,
    tags: ['javascript', 'error-handling', 'best-practices'],
  },
  {
    id: '3',
    title: 'Feedback on my UI design project',
    author: 'Marcus Johnson',
    authorAvatar: 'https://i.pravatar.cc/150?img=4',
    course: 'UI/UX Design Principles',
    content: 'I\'ve just completed the first draft of my UI design project and would really appreciate some feedback from fellow students. I\'m particularly concerned about the color scheme and navigation flow.',
    timestamp: '2023-06-08T16:45:00',
    likes: 7,
    replies: 4,
    tags: ['ui-design', 'feedback', 'portfolio'],
  },
  {
    id: '4',
    title: 'Node.js vs Express for RESTful APIs',
    author: 'Sophia Martinez',
    authorAvatar: 'https://i.pravatar.cc/150?img=6',
    course: 'Building RESTful APIs with Node.js',
    content: 'I\'m planning a new project and trying to decide whether to use plain Node.js or Express for building RESTful APIs. What are the pros and cons of each approach? When would you choose one over the other?',
    timestamp: '2023-06-07T11:20:00',
    likes: 15,
    replies: 9,
    tags: ['node.js', 'express', 'rest-api'],
  },
  {
    id: '5',
    title: 'Animating transitions in D3.js visualizations',
    author: 'David Kim',
    authorAvatar: 'https://i.pravatar.cc/150?img=12',
    course: 'Data Visualization with D3.js',
    content: 'I\'m working on a D3.js visualization and want to add smooth transitions when data updates. I\'ve tried using .transition() but I\'m having trouble with the timing and easing. Any tips or examples would be helpful!',
    timestamp: '2023-06-06T13:50:00',
    likes: 11,
    replies: 6,
    tags: ['d3.js', 'animations', 'data-visualization'],
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else if (diffHours > 0) {
    return `${diffHours}h ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes}m ago`;
  } else {
    return 'Just now';
  }
};

const Discussions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  
  const filteredDiscussions = selectedTab === 'all' 
    ? DISCUSSIONS 
    : DISCUSSIONS.filter(discussion => discussion.course.toLowerCase().includes(selectedTab.toLowerCase()));
  
  const searchFilteredDiscussions = searchTerm 
    ? filteredDiscussions.filter(discussion => 
        discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : filteredDiscussions;
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      
      <section className="pt-28 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Discussion Forum</h1>
              <p className="text-muted-foreground text-lg">
                Join conversations and get help from instructors and peers
              </p>
            </div>
            <Button className="w-full md:w-auto">
              <MessageSquare className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search discussions..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="React">React</TabsTrigger>
                <TabsTrigger value="JavaScript">JavaScript</TabsTrigger>
                <TabsTrigger value="UI/UX">UI/UX</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="space-y-4">
            {searchFilteredDiscussions.map((discussion) => (
              <Card key={discussion.id} className="animate-fade-in overflow-hidden hover:shadow-hover transition-shadow cursor-pointer">
                <CardHeader className="p-4 md:p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                    <div className="flex items-center">
                      <img 
                        src={discussion.authorAvatar} 
                        alt={discussion.author} 
                        className="w-8 h-8 rounded-full mr-3"
                        loading="lazy"
                      />
                      <div>
                        <span className="font-medium">{discussion.author}</span>
                        <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{formatDate(discussion.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription>{discussion.course}</CardDescription>
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">{discussion.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                  <p className="text-muted-foreground mb-4">{discussion.content}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {discussion.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-accent text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground gap-1.5">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{discussion.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground gap-1.5">
                      <Reply className="w-4 h-4" />
                      <span>{discussion.replies}</span>
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    View Discussion
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {searchFilteredDiscussions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No discussions found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  We couldn't find any discussions matching your search criteria. Try adjusting your search or start a new discussion.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discussions;
