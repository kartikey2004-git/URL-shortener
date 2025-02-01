import CreateLink from "@/components/Create-link";
import Error from "@/components/Error";
import LinkCard from "@/components/Link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { getClicksforUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  // what this will take is the array of all urls and we will fetch all of ids for urls and for each url I take out the url.id and provided to the  getClicksforurls

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksforUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  // for searching our urls
  // includes() : Returns true if key is included in the range, and false otherwise.

  // agar url ka title includes our searchquery jo ki lowercase mein hai , iske baad humein filtered urls mil jayenge

  // agar there is nothing inside searchquery , it returns all the urls

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 ml-6 mr-6">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}

      {/* we are going to be rendering stats like total links created and total clicks that we have and all links that users have created */}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink/>
      </div>

      <div className="relative">
        {/* we want to show a filter like a search option */}
        <Input
          className="bg-transparent mb-8"
          type="text"
          placeholder="Filter links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
        {error && <Error message={error?.message} />}
        {(filteredUrls || []).map((url,id) => {
          return <LinkCard key={id} url={url} fetchUrls={fnUrls}/>
        })}
      </div>
    </div>
  );
};

export default Dashboard;