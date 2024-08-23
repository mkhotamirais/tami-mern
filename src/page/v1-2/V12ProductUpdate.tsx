import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ProductSchema } from "./v12Schemas";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";
import { useGetProductByIdQuery, useUpdateProductMutation } from "@/redux/api/v12ProductApiSlice";

type UpdateProductForm = z.infer<typeof ProductSchema>;

export default function V12ProductUpdate() {
  const { id } = useParams();
  const { data: singleData, isLoading, isError, error } = useGetProductByIdQuery(id);

  const [updateProduct, { isLoading: pending }] = useUpdateProductMutation();

  const form = useForm<UpdateProductForm>({
    resolver: zodResolver(ProductSchema),
    defaultValues: { name: "", price: 0 },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (singleData) {
      form.reset({
        name: singleData.name,
        price: singleData.price,
      });
    }
  }, [singleData, form]);

  const onSubmit = async (values: UpdateProductForm) => {
    updateProduct({ id, values })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/v1-2/product");
      })
      .catch((err) => {
        toast.error(err.data.error);
      });
  };

  let content;
  if (isLoading) {
    content = <LoaderBounce />;
  } else if (isError) {
    content = <Err>{error as string}</Err>;
  } else {
    content = (
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
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-semibold my-3">Create Product</h2>
      {content}
    </div>
  );
}
