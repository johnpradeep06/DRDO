import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/spinner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  employeeId: z.string().min(1, { message: "Required" }),
  password: z.string().min(8, { message: "Password must have atleast 8 characters" })
})

type FormFields = z.infer<typeof schema>

// type FormFields = {
//   employeeId: string,
//   password: string
// }

const Login = () => {
  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors, isSubmitting } 
  } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data)=>{
    try {
      await new Promise((resolve)=>setTimeout(resolve, 1000));
      console.log(data);
      throw new Error();
    } catch(error){
      console.log(error);
      setError("password", {
        message: "Invalid password"
      });
      setError("root", {
        message: "Server Error"
      });
    }
  }

  return (  
    <div className="w-full dark:bg-[#1f1f1f] flex flex-col items-center">
      <div className="mt-20">
        <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input 
              type="text" 
              placeholder="Your ID: "
              {...register("employeeId", 
                // {
                //   required: {
                //     value: true,
                //     message: "Required"
                //   }
                // }
              )} 
              />
            {errors.employeeId && <div className="text-xs text-red-500">{errors.employeeId.message}</div>}
          </div>
          <div>
            <Input 
              type="text" 
              placeholder="Enter Password: " 
              {...register("password", 
                // {
                //   required: {
                //     value: true,
                //     message: "Required"
                //   },
                //   minLength: {
                //     value: 8,
                //     message: "Password must have at least 8 characters"
                //   }
                // }
              )} 
              />
            {errors.password && <div className="text-xs text-red-500">{errors.password?.message}</div>}
          </div>
          <Button 
            variant={"secondary"} 
            type="submit"
            disabled={isSubmitting}
          >
            <Spinner loading={isSubmitting} color="#fff" size={20} />
            {!isSubmitting && "Submit"}
          </Button>
          {errors.root && <div className="text-xs text-red-500">{errors.root?.message}</div>}
        </form>
      </div>
    </div>
  );
}
 
export default Login;