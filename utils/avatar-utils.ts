import * as FileSystem from "expo-file-system";

export const avatarSaveURI = (): string => {
  return (
    FileSystem.documentDirectory +
    "avatar.jpg?t=" +
    encodeURIComponent(new Date().toISOString())
  );
};

export const saveAvatar = async (fromURI: string, oldUri: string) => {
  await deleteAvatar(oldUri);
  await FileSystem.copyAsync({ from: fromURI, to: avatarSaveURI() });
};

export const deleteAvatar = async (uri: string) => {
  const fi = await FileSystem.getInfoAsync(uri);
  if (fi.exists) await FileSystem.deleteAsync(uri);
};

export const getSavedAvatarURI = async (uri: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    FileSystem.getInfoAsync(uri)
      .then((fileinfo) => {
        resolve(fileinfo.exists ? fileinfo.uri : "");
      })
      .catch(() => resolve(""));
  });
};
