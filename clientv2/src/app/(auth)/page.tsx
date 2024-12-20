"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginMutationFn } from "@/lib/api/auth";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(3),
  // .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const page = () => {
  const router = useRouter();
  // const router2 = useRou();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { mutate, isPending } = useMutation({ mutationFn: loginMutationFn });
  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log(data);
    mutate(data, {
      onSuccess(response) {
        const { data } = response;
        toast({ description: "Login successful", title: "Success" });
        router.replace("/dashboard");
        console.log(data);
      },
      onError(err) {
        console.error(err);
      },
    });
  }
  return (
    <div className="min-h-[100vh] w-full flex flex-col bg-gray-50 ">
      <div className=" py-3 px-10 bg-white ">
        <p className="text-[#cf01f9] md:text-lg text-2xl ms-1">hello</p>
      </div>
      <div className="container mx-auto flex-1 md:px-6  content-center ">
        <div className="flex flex-wrap justify-around gap-3 md:px-2 px-3  text-white">
          <div className="border flex-1 text-black md:block hidden">hellpp</div>

          <Card className="p-3 border-0 shadow-lg rounded-lg w-full md:w-1/3">
            {/* <h3 className="text-3xl font-bold text-center">Login</h3> */}
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Sign In to your account </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending && <Loader className="animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          {/* <div className=" border-2 p-4">
           
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
