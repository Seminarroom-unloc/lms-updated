
import { useState } from 'react';
import { LayoutGrid, LayoutList, Rows } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ViewType = 'grid' | 'list' | 'kanban';

const ViewToggle = () => {
  const [activeView, setActiveView] = useState<ViewType>('grid');

  return (
    <div className="flex items-center space-x-1 bg-secondary/50 p-0.5 rounded-md">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded ${activeView === 'grid' ? 'bg-white dark:bg-slate-800 shadow-sm' : 'hover:bg-white/70 dark:hover:bg-slate-800/70'}`}
              onClick={() => setActiveView('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid View</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Grid View</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded ${activeView === 'list' ? 'bg-white dark:bg-slate-800 shadow-sm' : 'hover:bg-white/70 dark:hover:bg-slate-800/70'}`}
              onClick={() => setActiveView('list')}
            >
              <LayoutList className="h-4 w-4" />
              <span className="sr-only">List View</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>List View</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 rounded ${activeView === 'kanban' ? 'bg-white dark:bg-slate-800 shadow-sm' : 'hover:bg-white/70 dark:hover:bg-slate-800/70'}`}
              onClick={() => setActiveView('kanban')}
            >
              <Rows className="h-4 w-4" />
              <span className="sr-only">Kanban View</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Kanban View</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ViewToggle;
