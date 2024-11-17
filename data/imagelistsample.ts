const SampleImageList = [
  {
    id: "1",
    uri: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
    blurhash: "blurhash:/LIIEeLwc1jRiP;X8ayR+crWBIpt7",
    guest: {
      name: "Martijn van Ark",
      image: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
  {
    id: "2",
    uri: "https://www.scanid.nl/test.jpg",
    blurhash: "blurhash:/LIIEeLwc1jRiP;X8ayR+crWBIpt7",
    guest: {
      name: "Kees Klootviool",
      image: "https://avatar.iran.liara.run/public",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
  {
    id: "3",
    uri: "https://picsum.photos/300/200",
    blurhash: "blurhash:/LIIEeLwc1jRiP;X8ayR+crWBIpt7",
    guest: {
      name: "Martijn van Ark",
      image: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
  {
    id: "4",
    uri: "https://picsum.photos/300/200",
    blurhash: "blurhash:/LIIEeLwc1jRiP;X8ayR+crWBIpt7",
    guest: {
      name: "Martijn van Ark",
      image: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
  {
    id: "5",
    uri: "https://picsum.photos/300/200",
    blurhash: "blurhash:/LIIEeLwc1jRiP;X8ayR+crWBIpt7",
    guest: {
      name: "Martijn van Ark",
      image: "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
      id: "O54321",
    },
    comment: "wat een gezellig feestje",
    timeTaken: "2024-11-08 13:12:14",
    tags: ["party", "fun", "social"],
  },
];

export default SampleImageList;

export const generateExtraImageSampleData = (count: number) => {
  const extraImageList = [...SampleImageList];
  for (let i = 0; i < count; i++) {
    extraImageList.push({
      id: (SampleImageList.length + i).toString(),
      uri: "https://picsum.photos/300/200",
      blurhash: "blurhash:/LIIEeLwc1jRiP;X8ayR+crWBIpt7",
      guest: {
        name: "Martijn van Ark",
        image:
          "https://mvanark.nl/_astro/martijn-van-ark.DTLosh3__Z1EspRT.webp",
        id: "O54321",
      },
      comment: "wat een gezellig feestje",
      timeTaken: "2024-11-08 13:12:14",
      tags: ["party", "fun", "social"],
    });
  }
  return extraImageList;
};
