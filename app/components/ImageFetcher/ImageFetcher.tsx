import { useState, useEffect, useMemo } from "react";
import Alert from "@mui/material/Alert";

import { shuffle } from "@utils/shuffle";
import { ImageType, ImageI } from "types";

import styles from "./ImageFetcher.module.css";

const IMAGES_PER_PAGE = 9;
export default function ImageFetcher({
  onDecrementScore,
  onIncrementScore,
  data,
}: {
  onDecrementScore: () => void;
  onIncrementScore: () => void;
  data: ImageI[];
}) {
  const [page, setPage] = useState(1);
  const [shouldPreloadNextSet, setShouldPreloadNextSet] = useState(false);

  const currentPageData = useMemo(() => {
    return shuffle(
      data.slice((page - 1) * IMAGES_PER_PAGE, page * IMAGES_PER_PAGE)
    );
  }, [page, data]);

  useEffect(() => {
    if (shouldPreloadNextSet) {
      const nextPageData = data.slice(
        page * IMAGES_PER_PAGE,
        (page + 1) * IMAGES_PER_PAGE
      );
      const shuffledNextPageData = shuffle(nextPageData);

      const preloadImages = shuffledNextPageData.map((img) => {
        const image = new Image();
        image.src = img.url;
        return image;
      });

      Promise.all(
        preloadImages.map((img) => {
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      )
        .then(() => {
          console.log("All images preloaded");
        })
        .catch((error) => console.error("Error preloading images", error));

      setShouldPreloadNextSet(false);
    }
  }, [shouldPreloadNextSet, data, page]);

  const handleClick = (type: ImageType) => {
    setPage(page + 1);
    setShouldPreloadNextSet(true);

    if (type === "fox") {
      onIncrementScore();
    } else {
      onDecrementScore();
    }
  };

  if (page > 60) {
    return <Alert severity="warning">You are too fast! Are you human?</Alert>;
  }

  return (
    <div className={styles.imageContainer}>
      {currentPageData.map((img, idx) => (
        <img
          alt={String(idx)}
          src={img.url}
          key={idx}
          className={`${styles.image}`}
          onClick={() => handleClick(img.type)}
          data-testid={`${img.type}-image-${idx}`}
        />
      ))}
    </div>
  );
}
