
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, User, ThumbsUp, Reply, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

interface DiscussionForumTabProps {
  courseId: string;
}

const DISCUSSIONS = [
  {
    id: 'd1',
    title: 'Help with HTML Tables',
    author: 'John Smith',
    authorAvatar: 'https://i.pravatar.cc/150?img=12',
    date: '2 days ago',
    content: 'I\'m struggling to understand how to create responsive tables in HTML. Can someone provide an example or explanation?',
    likes: 5,
    replies: 2,
    isInstructor: false,
    repliesData: [
      {
        id: 'r1',
        author: 'Sarah Johnson',
        authorAvatar: 'https://i.pravatar.cc/150?img=1',
        date: '1 day ago',
        content: 'Responsive tables can be tricky. The simplest approach is to wrap your table in a div with overflow-x: auto. For more advanced solutions, consider using CSS Grid or Flexbox instead of tables.',
        likes: 3,
        isInstructor: true
      },
      {
        id: 'r2',
        author: 'Mike Wilson',
        authorAvatar: 'https://i.pravatar.cc/150?img=15',
        date: '12 hours ago',
        content: 'I found this helpful article that explains different techniques: [link to article]. Hope it helps!',
        likes: 1,
        isInstructor: false
      }
    ]
  },
  {
    id: 'd2',
    title: 'Best way to handle CSS specificity?',
    author: 'Emma Davis',
    authorAvatar: 'https://i.pravatar.cc/150?img=23',
    date: '5 days ago',
    content: 'I\'m finding my CSS is getting messy with too many !important tags. What\'s the best approach to manage specificity?',
    likes: 8,
    replies: 3,
    isInstructor: false,
    repliesData: []
  }
];

const DiscussionForumTab = ({ courseId }: DiscussionForumTabProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };
  
  const handleNewDiscussion = () => {
    navigate(`/new-discussion/${courseId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Discussion Forum</h2>
        <Button onClick={handleNewDiscussion}>
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </Button>
      </div>
      
      <div className="space-y-4">
        {DISCUSSIONS.map((discussion) => (
          <Card key={discussion.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                    <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{discussion.title}</CardTitle>
                    <div className="flex items-center mt-1 text-sm">
                      <span className="font-medium">{discussion.author}</span>
                      {discussion.isInstructor && (
                        <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                          Instructor
                        </Badge>
                      )}
                      <span className="text-muted-foreground ml-2">• {discussion.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pb-3">
              <p className="text-muted-foreground">{discussion.content}</p>
            </CardContent>
            
            <CardFooter className="pt-0 flex justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {discussion.likes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground"
                  onClick={() => toggleExpand(discussion.id)}
                >
                  <Reply className="mr-1 h-4 w-4" />
                  {discussion.replies} Replies
                </Button>
              </div>
              
              <Button variant="ghost" size="sm" onClick={() => toggleExpand(discussion.id)}>
                {expanded === discussion.id ? 'Hide Replies' : 'View Replies'}
              </Button>
            </CardFooter>
            
            {expanded === discussion.id && (
              <div className="px-6 pb-6">
                <Separator className="my-4" />
                
                {discussion.repliesData.length > 0 ? (
                  <div className="space-y-4">
                    {discussion.repliesData.map((reply) => (
                      <div key={reply.id} className="flex space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                          <AvatarFallback>{reply.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="font-medium">{reply.author}</span>
                            {reply.isInstructor && (
                              <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs">
                                Instructor
                              </Badge>
                            )}
                            <span className="text-muted-foreground text-sm ml-2">• {reply.date}</span>
                          </div>
                          <p className="mt-1 text-sm">{reply.content}</p>
                          <Button variant="ghost" size="sm" className="text-muted-foreground mt-1 h-7 px-2">
                            <ThumbsUp className="mr-1 h-3 w-3" />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground text-sm py-4">No replies yet</p>
                )}
                
                <div className="mt-4">
                  <Textarea placeholder="Write a reply..." className="min-h-[100px]" />
                  <Button className="mt-2">Post Reply</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForumTab;
