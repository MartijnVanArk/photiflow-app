import { Redirect } from "expo-router";

import useEventAuthContext from "@/hooks/useEventAuthContext";

const Index = () => {
  const { EventState } = useEventAuthContext();

  console.log("In Index Check : ", EventState);

  if (EventState.loading) return null;

  if (EventState.isValidEventId) return <Redirect href="/(root)/EventScreen" />;

  return <Redirect href="/(start)/WelcomeScreen" />;
};

export default Index;
