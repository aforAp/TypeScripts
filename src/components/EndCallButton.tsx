import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

const EndCallButton = () => {
    const call = useCall();
    const navigate = useNavigate();

    const {useLocalParticipant} = useCallStateHooks();
    const localParticipants = useLocalParticipant();

    const isMeetingOwner = localParticipants && call?.state.createdBy && localParticipants.userId === call.state.createdBy.id;

    if(!isMeetingOwner) return null;
  return (
    <Button onClick={async() => {
        await call.endCall();
        navigate("/")
    }} className="bg-red-500">
End call for everyone
    </Button>
  )
}

export default EndCallButton;
