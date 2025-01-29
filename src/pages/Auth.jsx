import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's Login first..."
          : "Login / Signup"}
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
          <TabsTrigger className="border-2 p-2 mr-2 hover:bg-gray-800" value="signup">
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login/>
        </TabsContent>
        <TabsContent value="signup">
          <SignUp/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;