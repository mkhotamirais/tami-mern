import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { urlSequelize } from "@/lib/constants";
import { useNavigate } from "react-router-dom";
import { ProductSchema } from "./v1SequelizeSchemas";

type CreateProductForm = z.infer<typeof ProductSchema>;

export default function V1SequelizeProductCreate() {
  const [pending, setPending] = useState(false);
  const form = useForm<CreateProductForm>({
    resolver: zodResolver(ProductSchema),
    defaultValues: { name: "", price: "" },
  });
  const navigate = useNavigate();

  const onSubmit = async (values: CreateProductForm) => {
    setPending(true);
    axios
      .post(`${urlSequelize}/v1/product`, values)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/v1-sequelize/product");
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else toast.error(err.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-semibold my-3">Create Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="Product name" onFocus={(e) => e.target.select()} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    disabled={pending}
                    {...field}
                    placeholder="Product price"
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    onFocus={(e) => e.target.select()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit">
            {pending ? "Loading.." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
