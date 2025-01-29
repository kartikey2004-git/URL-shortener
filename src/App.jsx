import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/App.layout"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import Auth from "./pages/Auth"
import Link from "./pages/Link"
import RedirectLinkPage from "./pages/RedirectLinkPage"

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/auth",
        element:<Auth/>
      },
      {
        path:"/link/:id",
        element:<Link/>
      },
      {
        path:"/:id",
        element:<RedirectLinkPage/>
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App