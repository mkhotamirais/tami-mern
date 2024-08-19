import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { url } from "@/lib/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";
import { useV2 } from "@/hooks/useV2";
import { ProductSchema } from "../v2Schemas";

type CreateProductForm = z.infer<typeof ProductSchema>;

export default function V2ProductUpdate() {
  const { id } = useParams();
  const { singleData, getDataById, loadSingleData, errSingleData } = useV2();
  const [pending, startTransition] = useTransition();

  const form = useForm<CreateProductForm>({
    resolver: zodResolver(ProductSchema),
    defaultValues: { name: "", price: "" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDataById(id);
    }
  }, [getDataById, id]);

  useEffect(() => {
    if (singleData) {
      const { name, price } = singleData;
      form.reset({ name, price });
    }
  }, [singleData, form]);

  const onSubmit = async (values: CreateProductForm) => {
    startTransition(() => {
      axios
        .create({ withCredentials: true })
        .patch(`${url}/v2/product/${id}`, values)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/v2/product");
        })
        .catch((err) => {
          toast.error(err.response.data.error || err.message);
        });
    });
  };

  let content;
  if (loadSingleData) {
    content = <LoaderBounce />;
  } else if (errSingleData) {
    content = <Err>{errSingleData}</Err>;
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
