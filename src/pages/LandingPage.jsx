import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL shortener <br /> you&rsquo;ll ever need
      </h2>

      <form
        onSubmit={handleShorten}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your longggggggggggggg URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="h-full flex-1 py-4 px-4 bg-transparent"
        />
        <Button
          className="h-full border-2 ml-4"
          type="submit"
          variant="destructive"
        >
          Shorten !
        </Button>
      </form>

      <img src="/banner.jpeg" alt="banner" className="w-full my-11 md:px-11" />

      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>How URL shortener works?</AccordionTrigger>
          <AccordionContent>
          When you enter a long URL, our system generates a shorter version of it. This shortened URL will redirect to the original long URL when accessed.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is it free to use?</AccordionTrigger>
          <AccordionContent>
          Yes, it is completely free to use. You only need to sign up if you dont have an account, or simply log in with your existing account.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
          Do I have to create an account to use ?
          </AccordionTrigger>
          <AccordionContent>
          Yes, creating an account lets you manage your URLs, view analytics, and customize your shortened links.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
