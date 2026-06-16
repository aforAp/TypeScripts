import { useCall, VideoPreview } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

const MeetingSetup = () => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

    const call = useCall();

    if(!call) {
        throw new Error('useCall must be used within StreamCall component');
    }
    useEffect(() => {
         if(isMicCamToggledOn) {
            call?.camera.disable();
            call?.microphone.disable();
         } else {
            call?.camera.enable();
            call?.microphone.enable();
         }
    }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">
        Setup
      </h1>
      <div className="flex flex-col w-1/2 h-1/2">

      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center">

        </label>
      </div>
      </div>
    </div>
  )
}

export default MeetingSetup
