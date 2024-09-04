import { HomeBar } from "@/components/navbar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"

const Register = () => {
  return (  
    <div className="w-full min-h-screen bg-primary-foreground dark:bg-[#1f1f1f] flex flex-col items-center">
      <HomeBar />
      <Tabs defaultValue="profile" className="mt-10">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile"></TabsContent>
        <TabsContent value="address"></TabsContent>
        <TabsContent value="education"></TabsContent>
        <TabsContent value="experience"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </div>
  );
}
 
export default Register;