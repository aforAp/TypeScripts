import {
  Show,
  SignIn,
} from "@clerk/react";

const AuthButtons = () => {
  return (
  <div className="flex h-screen w-full items-center justify-center">
          <Show when="signed-out">
          <SignIn  routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"/>
        </Show>
      </div>
  )
}

export default AuthButtons;
