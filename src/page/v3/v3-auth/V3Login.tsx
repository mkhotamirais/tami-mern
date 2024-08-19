import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoginSchema } from "../v3Schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import axios from "axios";
import { url } from "@/lib/constants";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type LoginFormSchema = z.infer<typeof LoginSchema>;

export default function V3Login() {
  const [pending, startTransition] = useTransition();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormSchema) => {
    startTransition(() => {
      axios
        .create({ withCredentials: true })
        .patch(`${url}/v3/signin`, values)
        .then((res) => {
          toast.success(res.data.message);
          window.location.href = "/v3";
        })
        .catch((err) => {
          toast.error(err.response.data.error || err.message);
        });
    });
  };
  return (
    <div className="max-w-md border rounded-xl p-3 mx-auto mt-8">
      <h1 className="text-xl font-semibold my-2">V3 LOGIN</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={pending}
                    {...field}
                    placeholder="example@gmail.com"
                    onFocus={(e) => e.target.select()}
                  />
                </FormControl>
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
                    type="password"
                    disabled={pending}
                    {...field}
                    placeholder="******"
                    onFocus={(e) => e.target.select()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit" className="w-full">
            {pending ? "Loading.." : "Login"}
          </Button>
        </form>
        <div className="flex justify-center mt-4">
          <Button variant={"link"} asChild>
            <Link to="/v3/register">Do not have an account?</Link>
          </Button>
        </div>
      </Form>
    </div>
  );
}
