import { Redirect } from "expo-router";

import usePartyAuthContext from "@/hooks/usePartyAuthContext";

const Index = () => {
  const { partyState } = usePartyAuthContext();

  if (partyState.isValidPartyId) return <Redirect href="/(root)/" />;

  return <Redirect href="/(start)/welcome" />;
};

export default Index;
