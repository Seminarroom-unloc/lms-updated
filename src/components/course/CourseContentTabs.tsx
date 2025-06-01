
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReadingMaterialsTab from '@/components/course-tabs/ReadingMaterialsTab';
import AssignmentsTab from '@/components/course-tabs/AssignmentsTab';
import QuizTab from '@/components/course-tabs/QuizTab';
import DiscussionForumTab from '@/components/course-tabs/DiscussionForumTab';

interface CourseContentTabsProps {
  courseId: string;
}

const CourseContentTabs = ({ courseId }: CourseContentTabsProps) => {
  const [activeTab, setActiveTab] = useState('reading-materials');
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl border-b border-border">
      <Tabs defaultValue="reading-materials" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-fit grid-cols-4 md:grid-cols-4 mb-8 mx-auto">
          <TabsTrigger value="reading-materials">Reading Materials</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="discussion-forum">Discussion Forum</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reading-materials">
          <ReadingMaterialsTab courseId={courseId} />
        </TabsContent>
        
        <TabsContent value="assignments">
          <AssignmentsTab courseId={courseId} />
        </TabsContent>
        
        <TabsContent value="quiz">
          <QuizTab courseId={courseId} />
        </TabsContent>
        
        <TabsContent value="discussion-forum">
          <DiscussionForumTab courseId={courseId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseContentTabs;
