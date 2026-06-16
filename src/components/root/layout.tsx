import { StreamVideoProvider } from "@/provider/StreamClientProvider";
import {type ReactNode} from "react";
const layout = ({children}: {children: ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>

        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default layout;

