
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";
import Assignments from "./pages/Assignments";
import ReadingMaterials from "./pages/ReadingMaterials";
import Quizzes from "./pages/Quizzes";
import Discussions from "./pages/Discussions";
import Course from "./pages/Course";
import ModuleDetails from "./pages/ModuleDetails";
import AssignmentSubmission from "./pages/AssignmentSubmission";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import SessionHistory from "./pages/SessionHistory";
import Report from "./pages/Report";
import CalendarPage from "./pages/CalendarPage";
import NewDiscussion from "./pages/NewDiscussion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/reading-materials" element={<ReadingMaterials />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/module/:courseId/:moduleId" element={<ModuleDetails />} />
            <Route path="/assignment/:courseId/:moduleId/:assignmentId" element={<AssignmentSubmission />} />
            <Route path="/new-discussion/:courseId" element={<NewDiscussion />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/details" element={<ProfileDetails />} />
            <Route path="/profile/history" element={<SessionHistory />} />
            <Route path="/profile/report" element={<Report />} />
            <Route path="/dashboard" element={<div className="pt-32 container mx-auto">Dashboard Coming Soon</div>} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/cart" element={<div className="pt-32 container mx-auto">Cart Coming Soon</div>} />
            <Route path="/practice" element={<div className="pt-32 container mx-auto">Practice Coming Soon</div>} />
            <Route path="/live-challenges" element={<div className="pt-32 container mx-auto">Live Challenges Coming Soon</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
