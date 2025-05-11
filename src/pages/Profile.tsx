
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileDetails from "./ProfileDetails";
import SessionHistory from "./SessionHistory";
import Report from "./Report";
import { UserCog, History, FileWarning } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full max-w-3xl"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                <span className="hidden sm:inline">Profile Details</span>
                <span className="sm:hidden">Details</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">Session History</span>
                <span className="sm:hidden">History</span>
              </TabsTrigger>
              <TabsTrigger value="report" className="flex items-center gap-2">
                <FileWarning className="h-4 w-4" />
                <span className="hidden sm:inline">Report</span>
                <span className="sm:hidden">Report</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="details">
            <ProfileDetails />
          </TabsContent>
          
          <TabsContent value="history">
            <SessionHistory />
          </TabsContent>
          
          <TabsContent value="report">
            <Report />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
