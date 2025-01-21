"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginMutationFn } from "@/lib/api/auth";
// import { toast } from "@/hooks/use-toast";
import Image from "next/image";
// import { AxiosError } from "axios";
import { CustomError } from "@/lib/CustomError";
import { useToast } from "@/hooks/use-toast";
import { useFormState, useFormStatus } from "react-dom";
// import { useAuth } from "@/context/auth-store";
import { useUserSession } from "@/store/auth";
import { createUserSession, getServerUser, loginAction } from "@/actions/auth";
import { loginSchema } from "../schemas";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  // const [] = useActionState(loginAction,)
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
  // const user = await getServerUser();
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
    async onSuccess(response) {
      const { data } = response;
      const user = data.user;
      setUser(user);
      await createUserSession(data);
      router.refresh();
      router.replace("/", { scroll: true });
      // window.history.replaceState(null, "", "/dashboard");
      // console.log(data);
    },
    onError(err) {
      if (err instanceof CustomError) {
        const { errors } = err;
        // console.error(errors);
        toast({
          description: err.message,
          title: "Error",
          variant: "destructive",
        });
        errors.map((error) => {
          const path = error.path.join(".") as "username" | "password";
          // console.log(path);

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
  function onSubmit(data: z.infer<typeof loginSchema>) {
    // console.log(data);
    mutate(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
  );
};

export default LoginForm;
