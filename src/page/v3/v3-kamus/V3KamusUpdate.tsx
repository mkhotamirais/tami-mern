import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, FormEvent, useEffect } from "react";
import { toast } from "sonner";
import { FaCircleXmark } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Reference, useV3 } from "@/hooks/useV3";
import { url } from "@/lib/constants";

export default function V3KamusUpdate() {
  const { getKamus, getKamusById, singleKamus } = useV3();
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState<Reference[] | []>([]);
  const [refName, setRefName] = useState("");
  const [refLink, setRefLink] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (id) {
      getKamusById(id);
    }
  }, [getKamusById, id]);

  useEffect(() => {
    if (singleKamus) {
      setName(singleKamus.name);
      setDescription(singleKamus.description);
      if (singleKamus.reference) {
        setReference(singleKamus?.reference);
      }
    }
  }, [singleKamus]);

  const handleAddRef = () => {
    if (refName === "" || !refName || refLink === "" || !refLink) {
      toast.error("Name and link are required");
      return;
    }
    if (reference.find((item) => item.refName === refName)) {
      toast.error("Duplicate reference name!");
    } else {
      setReference((prev) => [...prev, { refName, refLink }]);
      setRefName("");
      setRefLink("");
      toast.success(`Add reference success`);
    }
  };

  const handleDeleteRef = (refName: string) => {
    setReference((prev) => prev.filter((item) => item?.refName !== refName));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    if (refName || refName !== "" || refLink || refLink !== "") {
      toast.error("You are filling in the reference input");
      return;
    }
    const data = { name, description, reference };
    await axios
      .create({ withCredentials: true })
      .patch(`${url}/v3/kamus/${id}`, data)
      .then((res) => {
        toast.success(res.data.message);
        getKamus();
        navigate("/v3-mongodb/kamus");
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else toast.error(err.message);
      })
      .finally(() => setPending(false));
  };

  return (
    <div className="border max-w-md p-3 rounded-xl mx-auto">
      <h1 className="text-xl font-bold py-2">Update V2 Kamus</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            disabled={pending}
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            disabled={pending}
            id="description"
            name="description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Label id="reference">References</Label>
          <div className="border rounded p-2">
            <Label htmlFor="refName">Reference Name</Label>
            <Input
              disabled={pending}
              id="refName"
              placeholder="Reference Name"
              value={refName}
              onChange={(e) => setRefName(e.target.value)}
            />
            <Label htmlFor="refLink">Reference Link</Label>
            <Input
              disabled={pending}
              id="refLink"
              placeholder="Reference Link"
              value={refLink}
              onChange={(e) => setRefLink(e.target.value)}
            />
            <Button
              disabled={pending}
              size="sm"
              type="button"
              onClick={handleAddRef}
              className="text-white p-1 mt-2 px-2 text-sm"
            >
              Add Reference
            </Button>
            {reference.map((item, i) => (
              <div key={i} className="border rounded p-1 mb-1 flex justify-between text-sm my-2">
                <div className="mr-2 overflow-x-scroll">
                  <div>Name : {item?.refName}</div>
                  <div>Link : {item?.refLink}</div>
                </div>
                <Button
                  disabled={pending}
                  size="icon"
                  variant={"outline"}
                  onClick={() => handleDeleteRef(item?.refName)}
                  className="text-red-500 rounded-full hover:opacity-70"
                >
                  <FaCircleXmark />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button disabled={pending} type="submit">
          {pending ? "Loading.." : "Save"}
        </Button>
      </form>
    </div>
  );
}

// import { FaCircleXmark } from "react-icons/fa6";
// import { Input, Label, Textarea } from "../../../../components/Tags";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { FaExclamationCircle } from "react-icons/fa";
// import { PiSpinner } from "react-icons/pi";
// import { useKamus } from "../../../../store/kamus";

// export default function AdmKamusPost() {
//   const [name, setName] = useState("");
//   const [meaning, setMeaning] = useState("");
//   const [reference, setReference] = useState([]);
//   const [refName, setRefName] = useState("");
//   const [refLink, setRefLink] = useState("");

// const { postKamus, getKamuss, loadPost } = useKamus();
//   const navigate = useNavigate();

// const handleAddRef = () => {
//   if (refName === "" || !refName || refLink === "" || !refLink) {
//     toast("Nama dan link referensi tidak boleh kosong", {
//       icon: <FaExclamationCircle className="text-yellow-500" />,
//     });
//     return;
//   }
//   if (reference.find((item) => item.refName === refName)) {
//     toast.error("Nama referensi sudah ada");
//   } else {
//     setReference((prev) => [...prev, { refName, refLink }]);
//     setRefName("");
//     setRefLink("");
//     toast.success(`referensi berhasil ditambah`);
//   }
// };

//   const handleDeleteRef = (name) => {
//     setReference((prev) => prev.filter((item) => item?.name !== name));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (refName || refName !== "" || refLink || refLink !== "") {
//       toast("Input referensi masih terisi", { icon: <FaExclamationCircle className="text-yellow-500" /> });
//       return;
//     }
//     const data = { name, meaning, reference };
//     postKamus(data).then((res) => {
//       if (res.ok) {
//         toast.success(res?.message);
//         getKamuss();
//         navigate(-1);
//       } else toast.error(res?.message);
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Label id="name">name</Label>
//         <Input type="text" value={name} autoFocus={true} onChange={(e) => setName(e.target.value?.toLowerCase())} />
//         <Label id="meaning">meaning</Label>
//         <Textarea id="meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)} />
// <Label id="reference">reference</Label>
// <div className="border rounded p-2">
//   <Label id="refName">Reference Name</Label>
//   <Input id="refName" value={refName} onChange={(e) => setRefName(e.target.value)} />
//   <Label id="refLink">Reference Link</Label>
//   <Input id="refLink" value={refLink} onChange={(e) => setRefLink(e.target.value)} />
//   <button
//     type="button"
//     onClick={handleAddRef}
//     className="text-xs bg-cyan-500 text-white p-1 px-2 rounded hover:opacity-70"
//   >
//     Add Reference
//   </button>
//   {reference.map((item, i) => (
//     <div key={i} className="border rounded p-1 mb-1 flex justify-between text-sm my-2">
//       <div className="mr-2 overflow-x-scroll">
//         <div>Name : {item?.refName}</div>
//         <div>Link : {item?.refLink}</div>
//       </div>
//       <button onClick={() => handleDeleteRef(item?.name)} className="text-red-500 hover:opacity-70">
//         <FaCircleXmark />
//       </button>
//     </div>
//   ))}
// </div>
//         <button
//           type="submit"
//           className="bg-cyan-500 border rounded p-2 px-3 w-20 flex items-center justify-center text-sm hover:opacity-70 my-2"
//         >
//           {loadPost ? (
//             <div className="text-xl">
//               <PiSpinner className="animate-spin" />
//             </div>
//           ) : (
//             "Submit"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }
