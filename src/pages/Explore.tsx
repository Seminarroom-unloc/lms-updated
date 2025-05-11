
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SESSIONS = [
  {
    id: "1",
    title: "Thriving in the Age of Technology",
    instructor: "Joshua Jones",
    time: "25 Apr, 7:00pm",
    details: ["Digital", "Online", "Remote"],
    description: "Learn essential tech skills for the modern workplace. Navigate digital transformation with confidence and stay ahead of industry trends.",
    badge: { label: "HOT", color: "bg-pink-500 text-white" }
  },
  {
    id: "2",
    title: "Unlocking Financial Abundance",
    instructor: "Kimberly Mastrangelo",
    time: "26 Apr, 7:00pm",
    details: ["Details", "Online", "Online"],
    description: "Master fundamental financial principles that create lasting wealth. Develop strategies for investments, savings, and passive income.",
    badge: { label: "Special", color: "bg-amber-500 text-black" }
  },
  {
    id: "3",
    title: "Building a Business Empire",
    instructor: "James Hall",
    time: "27 Apr, 7:00pm",
    details: ["Details", "Details", "Online"],
    description: "Learn proven methods to scale your business from startup to enterprise. Develop leadership skills that inspire teams and drive growth.",
    badge: { label: "HOT", color: "bg-pink-500 text-white" }
  },
  {
    id: "4",
    title: "Central Operations Specialist",
    instructor: "Rodger Struck",
    time: "28 Apr, 7:00pm",
    details: ["Details", "Details", "Online"],
    description: "Master organizational systems that streamline complex operations. Learn to optimize workflows and maximize efficiency across teams.",
    badge: { label: "Bestseller", color: "bg-amber-500 text-black" }
  },
  {
    id: "5",
    title: "Techniques for Closing Deals",
    instructor: "Bradley Lawler",
    time: "29 Apr, 7:00pm",
    details: ["Details", "Details", "Online"],
    description: "Master persuasive communication strategies that convert prospects into clients. Build lasting relationships through authentic sales techniques.",
    badge: { label: "Bestseller", color: "bg-amber-500 text-black" }
  },
  {
    id: "6",
    title: "Mapping the Path to Achievement",
    instructor: "Stephanie Nicol",
    time: "30 Apr, 7:00pm",
    details: ["Details", "Details", "Online"],
    description: "Learn effective goal-setting frameworks that turn ambitions into accomplishments. Create actionable plans that navigate obstacles with confidence.",
    badge: { label: "HOT", color: "bg-pink-500 text-white" }
  }
];

const Explore = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("list");
  
  return (
    <div className="container mx-auto pt-24 px-4 md:px-6 pb-10">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Explore</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search sessions..." 
                className="w-[200px] md:w-[300px] pl-9 rounded-full bg-slate-100 dark:bg-slate-800 border-0 focus-visible:ring-1"
              />
            </div>
            <Tabs defaultValue="all" className="hidden md:flex">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex space-x-1">
              <Button
                variant="outline" 
                size="icon"
                className={viewType === "list" ? "bg-muted" : ""}
                onClick={() => setViewType("list")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className={viewType === "grid" ? "bg-muted" : ""}
                onClick={() => setViewType("grid")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-center">Trending Sessions</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Discover the most popular courses and sessions chosen by our community. 
            Enhance your skills with expert-led content.
          </p>
        </div>

        <div className={viewType === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
          {SESSIONS.map((session) => (
            <Card key={session.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className={`flex ${viewType === "grid" ? "flex-col" : "flex-row"}`}>
                  <div className={`${viewType === "grid" ? "w-full h-48" : "w-36 h-36 md:w-48 md:h-48"} overflow-hidden bg-gray-200`}>
                    <img 
                      src={`https://source.unsplash.com/random/300x300?portrait&sig=${session.id}`} 
                      alt={session.instructor} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col p-5 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{session.title}</h3>
                      {session.badge && (
                        <Badge className={session.badge.color}>
                          {session.badge.label}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium">{session.instructor}</p>

                    <div className="flex flex-wrap gap-2 my-3">
                      {session.details.map((detail, index) => (
                        <div key={index} className="flex items-center text-xs text-muted-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="1"></circle></svg>
                          {detail}
                        </div>
                      ))}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        {session.time}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {session.description}
                    </p>

                    <div className="mt-auto">
                      <Button className="w-full">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
