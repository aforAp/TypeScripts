import { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/react";
import { useStreamVideoClient, Call } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";
const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const [values, setValues] = useState({
      dateTime: new Date(),
      description: '',
      link: ''
    });
    const [callDetails, setCallDetails] = useState<Call>();
    console.log("the fucking meting status", meetingState);
    console.log(meetingState);
    const {user} = useUser();
    const navigate = useNavigate();
    const client = useStreamVideoClient();
     async function createMeeting() {
        console.log("client", client);
  console.log("user", user);
      if(!client || !user) return;

      try {
        if(!values.dateTime) {
          toast.error(
            "Please select the date and time");
            return;
        }
       

         if(meetingState === 'isInstantMeeting') {
            const id = crypto.randomUUID();
         const call =client.call('default', id);
           console.log(call);
         if(!call) throw new Error('Failed to create a call');

         const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
         const description = values.description || 'Instant meeting';
         await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: {
              description
            }
          }
         });
         setCallDetails(call);
           navigate(`/meeting/${call.id}`);
         }
         toast("Meeting Created", {className: 'bg-dark-1! text-white!',
           position: 'top-center',
          });
      }  catch(error) {
        console.log(error);
        toast.error("Failed to create the meeting", {position: 'top-center'});
      }
    }

    const meetingLink = `${import.meta.env.VITE_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
     <HomeCard img="/zoom/icons/add-meeting.svg" title="New Meeting" description="Start an instant Meeting" handleClick={() => setMeetingState('isInstantMeeting')} className="bg-orange-1" />
     <HomeCard img="/zoom/icons/schedule.svg" title="Schedule Meeting" description="Plan your meeting" handleClick={() => setMeetingState('isScheduleMeeting')} className="bg-blue-1"/>
     <HomeCard img="/zoom/icons/recordings.svg" title="View Recordings" description="Check out your recordings" handleClick={() => navigate('/recordings')} className="bg-purple-1"/>
     <HomeCard img="/zoom/icons/join-meeting.svg" title="Join Meeting" description="via invitations link" handleClick={() => setMeetingState('isJoiningMeeting')} className="bg-yellow-1"/>
   {!callDetails && (
    <MeetingModal 
      isOpen={meetingState === 'isScheduleMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Create Meeting"
      handleClick={createMeeting}
    >
<div className="flex flex-col gap-2.5">
  <label className="text-base text-normal leading-5.5 text-sky-2">Add a Description</label>
  <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible-ring-offset-0" onChange={(e) => {
    setValues({...values, description: e.target.value})
  }}/>
</div>
<div className="flex w-full flex-col gap-2.5">
  <label className="text-base text-normal leading-5.5 text-sky-2">Select a Date and Time</label>
  <ReactDatePicker selected={values.dateTime} onChange={(date) => setValues({
    ...values,
    dateTime: date!
  })}
  showTimeSelect
  timeFormat="HH:mm"
  timeIntervals={15}
  timeCaption="time"
  dateFormat="MMMM d, yyyy h:mm aa"
  className="w-full rounded bg-dark-3 p-2 focus:outline-none"
  />
</div>

    </MeetingModal>
   ) }

   <MeetingModal
  isOpen={meetingState === 'isInstantMeeting'}
  onClose={() => setMeetingState(undefined)}
  title="Start an Instant Meeting"
  handleClick={createMeeting}
  buttonText="Start Meeting"
/>
  </section>
  )
};
    

export default MeetingTypeList;
