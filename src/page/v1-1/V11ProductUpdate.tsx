import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ProductSchema } from "./v11Schemas";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { url } from "@/lib/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootV11Product } from "@/redux/store";
import { getSingleData } from "@/redux/features/v11ProductSlice";

type UpdateProductForm = z.infer<typeof ProductSchema>;

export default function V11ProductUpdate() {
  const { id } = useParams();
  const [pending, setPending] = useState(false);
  const { singleData, status, error } = useSelector((state: RootV11Product) => state.v11Product);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<UpdateProductForm>({
    resolver: zodResolver(ProductSchema),
    defaultValues: { name: "", price: 0 },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getSingleData(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleData) {
      form.reset({
        name: singleData.name,
        price: singleData.price,
      });
    }
  }, [singleData, form]);

  const onSubmit = async (values: UpdateProductForm) => {
    setPending(true);
    axios
      .patch(`${url}/v1/product/${id}`, values)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/v1-1-mongodb/product");
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  let content;
  if (status === "loading") {
    content = <LoaderBounce />;
  } else if (status === "failed") {
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
