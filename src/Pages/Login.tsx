import { SubmitHandler, useForm } from "react-hook-form"
import { HomeBar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/spinner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { 
  Form, 
  FormControl, 
  // FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const schema = z.object({
  employeeId: z.string().length(10, { message: "Invalid ID" }),
  password: z.string().min(8, { message: "Password must have atleast 8 characters" })
})

type FormFields = z.infer<typeof schema>

const Login = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FormFields> = async (data)=>{
    try {
      await new Promise((resolve) =>
        setTimeout(() => resolve("done"), 1000)
      ).then(()=>console.log(data))
      toast.success("Form has been submitted successfully!!!");
    } catch(error){
      console.log(error);
      toast.error("Failed to submit form.");
    }
  }

  return (  
    <div className="w-full min-h-screen bg-primary-foreground dark:bg-[#1f1f1f] flex flex-col items-center">
      <HomeBar />
      <Card className="mt-20 w-80 shadow-sm dark:shadow-gray-900 shadow-gray-200">
        <CardHeader>
          <CardTitle className="text-4xl text-center font-howdy text-gray-400">
            Login
          </CardTitle>
          <CardDescription className="text-base text-center">
            Enter your credentials to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3 w-full">
              <FormField
                control={form.control}
                name="employeeId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Employee ID:</FormLabel>
                    <FormControl>
                      <Input placeholder="Your ID:" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Description
                      </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Password:" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Description
                      </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
                />
              <Button 
                type="submit"
                variant={"secondary"} 
                disabled={form.formState.isSubmitting}
                >
                {form.formState.isSubmitting 
                  ? <Spinner loading={true} color="#fff" size={20} />
                  : "Submit"
                }
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
 
export default Login;