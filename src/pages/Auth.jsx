import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();

  const LongLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${LongLink ? `createNew=${LongLink}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="mt-20 flex flex-col items-center  ml-10 gap-10 sm:">
      <h1 className="text-5xl font-extrabold">
        {LongLink ? "Hold up! Let's Login first..." : "Login / Signup"}
        {/* searchParams.get() Returns the first value associated to the given search parameter. */}
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 gap-5">
          <TabsTrigger
            className="border-2 p-2 mr-2 hover:bg-gray-800"
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="border-2 p-2 mr-2 hover:bg-gray-800"
            value="signup"
          >
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
