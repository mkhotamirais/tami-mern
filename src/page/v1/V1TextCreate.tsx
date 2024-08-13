import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { url } from "./constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function V1TextCreate() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);
    await axios
      .post(`${url}/v1-text`, data)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/v1-text");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(() => setLoad(false));
  };

  return (
    <>
      <h2>V1 Create</h2>
      <form onSubmit={onSubmit}>
        <Input placeholder="name" id="name" name="name" onChange={onChange} />
        <Textarea placeholder="description" id="description" name="description" onChange={onChange} />
        <Button type="submit">{load ? "Loading.." : "Submit"}</Button>
      </form>
    </>
  );
}
