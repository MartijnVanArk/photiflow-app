export const getIconNameFromNavPath = (path: string) => {
  switch (path) {
    case "/(management)/(Tabs)/EventSettingsScreen":
      return "party-popper";
    case "/(management)/(Tabs)/EventModerationScreen":
      return "file-image-remove-outline";
    case "/(management)/(Tabs)/EventFeedScreen":
      return "image-multiple-outline";
    default:
      return "close";
  }
};
