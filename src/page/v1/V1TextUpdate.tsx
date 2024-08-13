import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { url } from "./constants";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useV1Text, V1TextInputs } from "./useV1Text";

export default function V1TextUpdate() {
  const { id } = useParams();
  const { singleData, setDataById, loadSingleData, errSingleData } = useV1Text();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState<V1TextInputs>({ name: "", description: "" });
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (id) setDataById(id);
  }, [setDataById, id]);

  useEffect(() => {
    if (singleData) setData(singleData);
  }, [singleData]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);
    await axios
      .patch(`${url}/v1-text/${id}`, data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/v1-text");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(() => setLoad(false));
  };

  if (loadSingleData) return <div>Loading..</div>;
  if (errSingleData) return <div className="text-red-500">{errSingleData}</div>;

  return (
    <>
      <h2>V1 Update</h2>
      <form onSubmit={onSubmit}>
        <Input value={data?.name} placeholder="name" id="name" name="name" onChange={onChange} />
        <Textarea
          value={data?.description}
          placeholder="description"
          id="description"
          name="description"
          onChange={onChange}
        />
        <Button type="submit">{load ? "Loading.." : "Submit"}</Button>
      </form>
    </>
  );
}
