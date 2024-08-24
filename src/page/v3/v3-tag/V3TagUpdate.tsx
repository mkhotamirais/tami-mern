import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { url } from "@/lib/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";
import { useV3 } from "@/hooks/useV3";
import { TagSchema } from "../v3Schemas";

type CreateTagForm = z.infer<typeof TagSchema>;

export default function V3TagUpdate() {
  const { id } = useParams();
  const { singleTag, getTagById, loadSingleTag, errSingleTag } = useV3();
  const [pending, setPending] = useState(false);

  const form = useForm<CreateTagForm>({
    resolver: zodResolver(TagSchema),
    defaultValues: { name: "" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTagById(id);
    }
  }, [getTagById, id]);

  useEffect(() => {
    if (singleTag) {
      const { name } = singleTag;
      form.reset({ name });
    }
  }, [singleTag, form]);

  const onSubmit = async (values: CreateTagForm) => {
    setPending(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/v3/tag/${id}`, values)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/v3-mongodb/tag");
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => setPending(false));
  };

  let content;
  if (loadSingleTag) {
    content = <LoaderBounce />;
  } else if (errSingleTag) {
    content = <Err>{errSingleTag}</Err>;
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
                  <Input disabled={pending} {...field} placeholder="Tag name" onFocus={(e) => e.target.select()} />
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
      <h2 className="text-lg font-semibold my-3">Update Tag</h2>
      {content}
    </div>
  );
}
