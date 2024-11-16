export const getIconNameFromNavPath = (path: string) => {
  switch (path) {
    case "/(management)/(Tabs)/EventSettingsScreen":
      return "party-popper";
    case "/(management)/(Tabs)/EventModerationScreen":
      return "file-image-remove-outline";
    default:
      return "close";
  }
};
