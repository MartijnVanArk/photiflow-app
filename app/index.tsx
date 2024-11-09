import { Redirect } from "expo-router";

import usePartyAuthContext from "@/hooks/usePartyAuthContext";

const Index = () => {
  const { partyState } = usePartyAuthContext();

  console.log("In Index Check : ", partyState);

  if (partyState.loading) return null;

  if (partyState.isValidPartyId) return <Redirect href="/(root)/" />;

  return <Redirect href="/(start)/welcome" />;
};

export default Index;
