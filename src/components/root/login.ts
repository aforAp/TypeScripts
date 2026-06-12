import { useAuth } from "@clerk/react";

const { isSignedIn } = useAuth();
  console.log(isSignedIn);