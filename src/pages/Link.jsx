import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import { UrlState } from "../Context.jsx";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/Use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationStats from "@/components/Location-stats";
import Device from "@/components/Device-stats";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Link = () => {
  const [open, setOpen] = useState(false);

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

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"!00%"} color="#36d7b7" />
      )}

      <div className="ml-3 flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-5xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`${baseUrl}/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl md:text-xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            {`${baseUrl}`}/{link}
          </a>

          <a
            className="flex items-center gap-1 hover:underline cursor-pointer"
            href={url?.original_url}
            target="_blank"
          >
            <LinkIcon />
            {url?.original_url}
          </a>

          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2 lg: w-18 h-1/2 mt-12">
            {/* navigate function comes inbuilt inside of our browser */}
            <Button
              onClick={() => {
                navigator.clipboard.writeText(`${baseUrl}/${url?.short_url}`);
                setOpen(true);
              }}
            >
              <Copy />
            </Button>
            <Dialog className="" open={open} onClose={() => setOpen(false)}>
              <DialogContent className="bg-gray-600 text-white">
              {baseUrl}/{url?.short_url}
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

            <Button onClick={() => fnDelete()}>
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 mr-3 object-contain"
            alt="qr code"
          />
        </div>

        <Card className="sm:w-3/5 mr-2 sm:ml-9">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>

          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <Device stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No statistics yet"
                : "Loading Statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
