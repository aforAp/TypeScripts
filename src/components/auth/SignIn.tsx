import {
  SignUp,
} from "@clerk/react";
const SignUps = () => {
  return (
  <div className="flex flex-col h-screen w-full items-center justify-center">
    <h1>Hello</h1>
          <SignUp
          routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
      forceRedirectUrl="/"
      />
      </div>
  )
}

export default SignUps;