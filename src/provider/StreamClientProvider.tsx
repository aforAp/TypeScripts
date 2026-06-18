import { useEffect, useState, type ReactNode } from "react";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/react";
import Loader from "@/components/Loader";
const apiKey = import.meta.env.VITE_PUBLIC_STREAM_API_KEY;


export const StreamVideoProvider = ({children}: {children: ReactNode}) => {
  const[videoClient, setVideoClient] = useState<StreamVideoClient>();
   const [token, setToken] = useState();
  const {user, isLoaded} = useUser();
  console.log("Hello");
  console.log(user?.id);
console.log(user);
    useEffect(() => {
     async function GetToken() {
         const response = await fetch(`http://localhost:3000/api/stream-token/${user?.id}`);
         const token = await response.json();
         console.log("The frontend data");
         console.log("TOKEN STATE:", token.token);
         setToken(token.token);
     }
     if(user?.id) {

       GetToken();
     }
  }, [user?.id]);

  useEffect(() => {
       if(!isLoaded || !user || !token) return;
       if(!apiKey) throw new Error('Stream API key missing');
     const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user!.id,
        name: user!.username || user!.id,
        image: user!.imageUrl,
      },
      token,
    });
    console.log("the client");
    console.log(client);
       setVideoClient(client);
  }, [user, isLoaded, token]);


 
 if(!user) {return children}; 

  if(!videoClient) return <Loader />;
    return (
    <StreamVideo client={videoClient}>
{children}
    </StreamVideo>
  )
};


export default StreamVideoProvider;