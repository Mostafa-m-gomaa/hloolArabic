
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { BookCheck } from 'lucide-react';
import { Ban } from 'lucide-react';



export function TabsDemo({setDeliveryStatus}) {
  return (
    <Tabs defaultValue="غير جاهزة للاستلام" className="w-[400px] mx-auto">
      <TabsList className="grid w-full grid-cols-2 *:flex *:items-center *:gap-4">
        <TabsTrigger onClick={()=>setDeliveryStatus("غير جاهز للتسليم")} value="غير جاهزة للاستلام"><Ban color="#db0000" /> <span>غير جاهزة للاستلام</span></TabsTrigger>
        <TabsTrigger onClick={()=>setDeliveryStatus("جاهز للتسليم")} value="جاهزة للاستلام"><BookCheck color="#0ea20b" /> <span>جاهزة للاستلام</span></TabsTrigger>
      </TabsList>
      {/* <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent> */}
    </Tabs>
  )
}
