import {
  ImageI,
  ImageType,
  CatApiResponse,
  DogApiResponse,
  FoxApiResponse,
} from "../../types";

const urls = [
  process.env.NEXT_PUBLIC_CAT_API,
  process.env.NEXT_PUBLIC_DOG_API,
  process.env.NEXT_PUBLIC_FOX_API,
];
const MAX_NUMBER_PER_BREED = 4;
const NUMBER_OF_SAMPLES = 60;

const fetchData = async (output: ImageI[]) => {
  try {
    const [catsRes, dogRes, foxRes]: [
      CatApiResponse[],
      DogApiResponse,
      FoxApiResponse
    ] = (await Promise.all(
      urls.map(async (url) => {
        if (!url) throw new Error("URL is null");
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Network response was not ok");
        return resp.json();
      })
    )) as [CatApiResponse[], DogApiResponse, FoxApiResponse];

    if (catsRes) {
      catsRes.slice(0, MAX_NUMBER_PER_BREED).forEach(({ url }) => {
        output.push({
          url,
          type: ImageType.CAT,
        });
      });
    }

    if (dogRes) {
      dogRes.message.slice(0, MAX_NUMBER_PER_BREED).forEach((url) => {
        output.push({
          url,
          type: ImageType.DOG,
        });
      });
    }
    if (foxRes) {
      output.push({
        url: foxRes.image,
        type: ImageType.FOX,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchImageData = async () => {
  let formattedResponses: ImageI[] = [];

  await Promise.all(
    new Array(NUMBER_OF_SAMPLES)
      .fill(null)
      .map(() => fetchData(formattedResponses))
  );

  return formattedResponses;
};
