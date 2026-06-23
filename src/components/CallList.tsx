import { useLocation, useNavigate } from "react-router";
import { useGetCalls } from "./hooks/useGetCalls"
import type { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import MeetingCard from "./ui/MeetingCard";
import Loader from "./Loader";
import { toast } from "sonner";

const CallList = ({type}: {type : 'ended' | 'recordings' | 'upcoming'}) => {
    const {endedCalls, upcomingCalls, isLoading} = useGetCalls();
    const location = useLocation();
    const searchParams = location.pathname.replace('/', '');
    const navigator = useNavigate();
    console.log("the recordings from stream api");
    console.log("the upcomin calls");
    console.log(upcomingCalls);
    
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const getCalls = () => {
        switch(type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }

     const getNoCallsMessage = () => {
        switch(type) {
            case 'ended':
                return 'No Previous Calls';
            case 'recordings':
                return 'No Recordings';
            case 'upcoming':
                return 'No Upcoming Calls';
            default:
                return '';
        }
    }


    useEffect(() => {
     
         const fetchRecordings = async () => {

    if (!endedCalls.length) <Loader />;

try {
        const recordings1: CallRecording[] = [];

      for (const meeting of endedCalls) {
        const response = await meeting.queryRecordings();

        if (response.recordings?.length) {
          recordings1.push(...response.recordings);
        }
      
    

  
     }
     setRecordings(recordings1);
    }
      catch(errors) {
        toast.error("try again later");
     }
}
if (type === "recordings") {
    fetchRecordings();
  }
}, [type, endedCalls]);
    const calls = getCalls();
    console.log(calls);
    const noCallsMessage = getNoCallsMessage();
console.log("endedCalls", endedCalls);
console.log("recording state", recordings[0]);
    if(isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
       {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
         <MeetingCard 
         key={(meeting as Call).id}
         icon={
            type === 'ended' ? '/zoom/icons/previous.svg' : type === 'upcoming' ? '/zoom/icons/upcoming.svg' : '/zoom/icons/recordings.svg'
         }
  title={(meeting as Call).state?.custom?.description?.substring(0, 20) || (meeting as Call)?.filename?.substring(0, 20) ||'Personal Meeting'}
 date={
  type === "recordings"
    ? new Date(meeting.start_time).toLocaleString()
    : (meeting as Call).state?.startsAt?.toLocaleString()
}
  isPreviousMeeting={type === 'ended'}
  buttonIcon1={type === 'recordings' ? '/zoom/icons/play.svg': undefined}
  buttonText={type === 'recordings' ? 'Play': 'Start'}
  link={type === 'recordings' ? meeting.url : `${import.meta.env.VITE_PUBLIC_BASE_URL}/meeting/{$meeting.id}`}
  handleClick={type === 'recordings' ? () => window.open(meeting.url,"_blank"): () => navigator(`/meeting/${meeting.id}`)}
      /> 
    ))
       : (
        <h1>NoCallsMessage</h1>
       )}
    </div>
  )
}

export default CallList;

