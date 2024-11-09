import { createContext } from "react";

import { CCActions } from "@/actions/CommandCenterActions";

interface CommandCenterContextProps {
  perform: (action: CCActions) => void;
}

export const CommandCenterContext =
  createContext<CommandCenterContextProps | null>(null);
