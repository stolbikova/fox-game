import { useState, useEffect } from "react";
import {
  ImageI,
  ImageType,
  CatApiResponse,
  DogApiResponse,
  FoxApiResponse,
} from "types";

const urls = [
  process.env.NEXT_PUBLIC_CAT_API,
  process.env.NEXT_PUBLIC_DOG_API,
  process.env.NEXT_PUBLIC_FOX_API,
];
const MAX_NUMBER_PER_BREED = 4;

// I would like to load at least 60 samples of data. Еo change images on average every half a second.
export const useFetchData = (triggerFetch: number) => {
  const [data, setData] = useState<ImageI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!triggerFetch) return;

    setIsLoading(true);
    setData([]);
    setError(null);

    let formattedResponses: ImageI[] = [];

    const fetchData = async () => {
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
            formattedResponses.push({
              url,
              type: ImageType.CAT,
            });
          });
        }

        if (dogRes) {
          dogRes.message.slice(0, MAX_NUMBER_PER_BREED).forEach((url) => {
            formattedResponses.push({
              url,
              type: ImageType.DOG,
            });
          });
        }
        if (foxRes) {
          formattedResponses.push({
            url: foxRes.image,
            type: ImageType.FOX,
          });
        }
      } catch (error) {
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    for (let i = 0; i < 60; i++) {
      fetchData();
    }
    setData(formattedResponses);
  }, [triggerFetch]);

  return { data, isLoading, error };
};
