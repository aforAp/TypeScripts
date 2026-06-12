
import { createBrowserRouter, RouterProvider } from "react-router";
import {Meeting, NavBar, Footer, AuthButtons, SignUps, HomeLayout, Home, Upcoming, Previous,  Recordings, PersonalRoom, SignUp} from "./index.ts";


 const router = createBrowserRouter([
    {path: '/sign-in', element: <AuthButtons />},
    {path: '/sign-up', element: <SignUps />},
    {path: '/', element: <HomeLayout />,
      children: [
        {path: '/', index: true,  element: <Home />},
        {path: '/upcoming', element: <Upcoming />},
        {path: '/previous', element: <Previous />},
        {path: '/recordings', element: <Recordings />},
        {path: '/personal-room', element: <PersonalRoom />}
      ]
    }
  ]);
const App = () => {
   
  return <RouterProvider router={router} />;
}

export default App;
