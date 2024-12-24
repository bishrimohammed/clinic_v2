"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
// import { toast } from "@/hooks/use-toast";
import Image from "next/image";
// import { AxiosError } from "axios";
import { CustomError } from "@/lib/CustomError";
import { useToast } from "@/hooks/use-toast";
import { useFormState, useFormStatus } from "react-dom";
// import { useAuth } from "@/context/auth-store";
import { useUserSession } from "@/store/auth";
import { createUserSession } from "@/actions/auth";

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(3),
  // .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const page = () => {
  const router = useRouter();
  const { toast } = useToast();
  // const login = useAuth((state) => state.login);
  const { setUser } = useUserSession();
  // const {} = useFormStatus()
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
    // console.log(data);
    mutate(data, {
      async onSuccess(response) {
        const { data } = response;
        await createUserSession(data);

        const user = data.user;
        setUser(user);
        router.replace("/dashboard");
        // window.history.replaceState(null, "", "/dashboard");
        // console.log(data);
      },
      onError(err) {
        if (err instanceof CustomError) {
          const { errors } = err;
          console.error(errors);
          toast({
            description: err.message,
            title: "Error",
            variant: "destructive",
          });
          errors.map((error) => {
            const path = error.path.join(".") as "username" | "password";
            console.log(path);

            form.setError(`${path}`, {
              type: "validate",
              message: error.message,
            });
          });
        } else {
          console.error(err);
        }
      },
    });
  }
  return (
    <div className="max-h-[100vh] w-full flex flex-col bg-gray-100 ">
      <div className=" py-3 md:px-16 px-3 bg-white ">
        <p className="text-[#cf01f9] md:text-xl text-2xl ms-1">hello</p>
      </div>
      <div className="container mx-auto flex-1 md:px-6 h-ful">
        <div className="flex flex-wrap items-center gap-3 md:px-2 px-1">
          <div className="flex-1  h-[550px] text-black md:block hidden">
            <Image
              src={"/Team-bro.png"}
              width={1000}
              height={200}
              alt=""
              className="w-full h-full  object-cover"
              priority={true}
            />
          </div>
          <div className="md:w-1/3 w-full md:h-full h-[calc(100vh-80px)] flex items-center justify-center">
            <Card className="p-3 border-0 shadow-lg rounded-lg w-full ">
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
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending && <Loader className="animate-spin" />}
                      Sign In
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
