/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Copy, Download, Trash } from "lucide-react";
import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react";
import useFetch from "@/hooks/Use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
  const [open, setOpen] = useState(false);

  //fetchUrls because after deleting the urls , we have to refetch the urls

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  return (
    <div className="flex flex-col md:flex-row mb-4 border-none gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qr}
        // self start for aligning left to screen when on mobile screen

        className="h-32 object-contain ring ring-blue-500 self-start"
        alt="Qr code"
      />

      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl mb-5  hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-500  hover:underline cursor-pointer mb-2">
          Domain_name/{url?.custom_url ? url?.custom_url : url?.short_url}
        </span>

        <span className="flex items-center gap-1 hover:underline cursor-pointer mb-2">
          {url?.original_url}
        </span>

        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2 lg: w-18 h-1/2 mt-12">
        {/* navigate function comes inbuilt inside of our browser */}
        <Button
          onClick={() => {
            navigator.clipboard.writeText(`${url?.short_url}`);
            setOpen(true);
          }}
        >
          <Copy />
        </Button>
        <Dialog className="" open={open} onClose={() => setOpen(false)}>
          <DialogContent className="bg-gray-600 text-white">
            Domain_name/{`${url?.short_url}`}
          </DialogContent>
          <DialogActions className="bg-gray-600">
            <Button className="bg-white" onClick={() => setOpen(false)}>
              <span className="text-white h-10 border-2 p-2 rounded-md">
                Ok
              </span>
            </Button>
          </DialogActions>
        </Dialog>

        <Button onClick={downloadImage}>
          <Download />
        </Button>

        <Button onClick={() => fnDelete().then(() => fetchUrls())}>
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
