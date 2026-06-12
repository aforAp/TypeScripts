import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { ClerkProvider } from '@clerk/react'

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

<App />
   </ClerkProvider> 
);
