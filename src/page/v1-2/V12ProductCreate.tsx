import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ProductSchema } from "./v12Schemas";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "@/redux/api/v12ProductApiSlice";

type CreateProductForm = z.infer<typeof ProductSchema>;

export default function V12ProductCreate() {
  const form = useForm<CreateProductForm>({
    resolver: zodResolver(ProductSchema),
    defaultValues: { name: "", price: "" },
  });
  const navigate = useNavigate();
  const [postProduct, { isLoading: pending }] = useAddProductMutation();

  const onSubmit = async (values: CreateProductForm) => {
    postProduct(values)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/v1-2/product");
      })
      .catch((err) => {
        toast.error(err.data.error);
      });
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
