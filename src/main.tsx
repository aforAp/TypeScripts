import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { ClerkProvider } from '@clerk/react'
import { StreamVideoProvider } from './provider/StreamClientProvider';
import { Toaster } from 'sonner';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

createRoot(document.getElementById('root')!).render(

   <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}   appearance={{
     elements: {
    socialButtonsBlockButtonText: {
      display: "none",
    },
  },
    layout: {
        logoImageUrl: '/zoom/icons/yoom-logo.svg',
        logoPlacement: "inside",
    },
    variables: {
      footerActionLink: "text-blue-400",
      colorPrimary: '#0E78F9',
      colorBackground: '#1c1f2e'
    },
  }}>
<StreamVideoProvider>

<App />
<Toaster className='bg-dark-1 text-white'/>
</StreamVideoProvider>
   </ClerkProvider> 
  
);
