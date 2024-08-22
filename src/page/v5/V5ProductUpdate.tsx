import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "@/lib/constants";
import { toast } from "sonner";
import { useV5 } from "@/hooks/useV5";

export default function V5ProductUpdate() {
  const { id } = useParams();
  const { getDataById, singleData } = useV5();

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | string>("");
  const [preview, setPreview] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (id) {
      getDataById(id);
    }
  }, [getDataById, id]);

  useEffect(() => {
    if (singleData) {
      setName(singleData.name);
      setPreview(singleData.image);
    }
  }, [singleData]);

  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      axios
        .patch(`${url}/v5/product/${id}`, formData)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/v5/product");
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data.error);
          } else toast.error(err.message);
        });
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-lg font-semibold my-3">Update Product</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input disabled={pending} id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label id="image">Image</Label>
          <Input
            disabled={pending}
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setImage(files[0]);
                setPreview(URL.createObjectURL(files[0]));
              }
            }}
          />
        </div>

        {preview ? (
          <div className="relative w-48 h-48 my-2 border p-1 rounded overflow-hidden group">
            <Button
              disabled={pending}
              type="button"
              onClick={() => {
                setImage("");
                setPreview("");
              }}
              className="hidden group-hover:flex items-center justify-center bg-[rgba(0,0,0,.5)] p-3 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Trash />
            </Button>
            <img src={preview} width={200} alt="image preview" className="object-contain object-center w-full h-full" />
          </div>
        ) : null}
        <Button type="submit" disabled={pending} className={"py-2"}>
          {pending ? "Loading.." : "Save"}
        </Button>
      </form>
    </div>
  );
}
