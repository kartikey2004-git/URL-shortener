import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import useFetch from "@/hooks/use-fetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/Context";

const Login = () => {

  // state for storing errors related to input validations
  const [errors, setErrors] = useState([])

  const [formData, setFormData] = useState({
    email: "",
    password:"",
  })

  // function to change all our inputs
  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setFormData((prevState) => ({
      // spread the previous state
      ...prevState,
      // set the new state
      [name]:value,
    }))
  }

  const navigate = useNavigate()
  let [searchParams] = useSearchParams()
  // get Returns the first value associated to the given search parameter.
  const longLink = searchParams.get("createNew")

  // there can be a case where user have this createNew search param on the url and we have to route then to dashboard with that particular search param , because we want to create new url now after logging in


  const {data,error,loading,fn: fnLogin} = useFetch(login,formData)

 const {fetchUser} =  UrlState()


  // fn is actual function we are calling if we want to login or whatever we have to make the api calls

  useEffect(() => {
    console.log(data);
    if(error === null && data){
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)

      fetchUser()

    }
  }, [data,error])
  

  // validating the input

  const handleLogin = async() => {
    setErrors([])
    // try catch where we have the API calls
    try {
      // schema for validating our inputs
      const schema = Yup.object().shape({
        email:Yup.string()
        .email("Invalid Email")
        .required("Email is required"),
        password:Yup.string()
        .min(6,"Password must be atleast 6 characters")
        .required("Password is required")
      })

      // abortEarly : Return from validation methods on the first error rather than after all validations run. Default - true

      await schema.validate(formData,{abortEarly: false})

      // api call

      await fnLogin()

    } 
    catch (e) {
      const newErrors = {};

      // Yup validation library humein ek error object milega jisme inner ke andar error hongi unpar forEach loop laga hai

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      })

      setErrors(newErrors)
    }
  }


  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your account if you already one
        </CardDescription>
        {error && <Error message={error.message}/>}
      </CardHeader>

      <CardContent className="space-y-2 ">
        <div className="space-y-1 mb-5">
          <Input 
          className="bg-transparent" 
          name="email" 
          type="email" 
          placeholder="Enter email"
          onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email}/>}
        </div>

        <div className="space-y-1">
          <Input 
          className="bg-transparent" name="password" 
          type="password" 
          placeholder="Enter Password"
          onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password}/>}
        </div>

      </CardContent>
      <CardFooter>
        <Button
        className="border-2"
         onClick={handleLogin}>
          {loading?<BeatLoader size={10} color="#00eeff"/>:"Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
