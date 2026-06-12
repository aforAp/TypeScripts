import {
  SignUp,
} from "@clerk/react";
const SignUps = () => {
  return (
  <div className="flex flex-col h-screen w-full items-center justify-center">
          <SignUp
          routing="path"
      path="/sign-up"
      signInUrl="/sign-in"/>
      </div>
  )
}

export default SignUps;