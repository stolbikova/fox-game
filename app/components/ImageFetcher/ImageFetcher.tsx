import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageType } from "types";
import { shuffle } from "app/utils/shuffle";
import { ImageI } from "types";

import styles from "./ImageFetcher.module.css";

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

  const shuffledData = shuffle(data.slice((page - 1) * 9, (page - 1) * 9 + 9));

  const handleClick = (type: ImageType) => {
    if (type === "fox") {
      onIncrementScore();
    } else {
      onDecrementScore();
    }
    setPage(page + 1);
  };

  if (page > 60) {
    // You are too fast! Are you human?
  }

  return (
    <div className={styles.imageContainer}>
      {shuffledData.map((img, idx) => (
        <Image
          loading="lazy"
          alt={`${img.type}-idx`}
          src={img.url}
          width={200}
          height={200}
          key={idx}
          className={`${styles.image}`}
          onClick={() => handleClick(img.type)}
        />
      ))}
    </div>
  );
}
