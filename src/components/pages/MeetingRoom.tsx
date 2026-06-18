import { useParams } from "react-router"
import "../../index.css";
import { useUser } from "@clerk/react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "../MeetingSetup";
import { useState } from "react";
import MeetingRooms from "../MeetingRooms";
import { useGetCallById } from "../hooks/useGetCallById";
import Loader from "../Loader";
const MeetingRoom = () => {
    const params = useParams();
    const {user, isLoaded} = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const {call, isCallLoading} = useGetCallById(params.id);

    if(!isLoaded || isCallLoading) return <Loader />;
  return (
    <main className="bg-dark-1 w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
{!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete} />: <MeetingRooms />}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingRoom;
