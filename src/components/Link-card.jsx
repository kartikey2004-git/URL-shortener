/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Copy, Download, Trash } from "lucide-react";
import { Button} from "@/components/ui/Button"
import useFetch from "@/hooks/Use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url , fetchUrls }) => {

  //fetchUrls because after deleting the urls , we have to refetch the urls

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title; // Desired file name for the downloaded image

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    // Append the anchor to the body
    document.body.appendChild(anchor);

    // Trigger the download by simulating a click event
    anchor.click();

    // Remove the anchor from the document
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
        https://url.elixircommunity.in/{url?.custom_url ? url?.custom_url : url?.short_url}
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
            navigator.clipboard.writeText(`https://url.elixircommunity.in/${url?.short_url}`);
          }}
        >
          <Copy />
        </Button>

        <Button onClick={downloadImage}>
          <Download />
        </Button>

        <Button variant="ghost" onClick={() => fnDelete().then(() => fetchUrls())}>
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
