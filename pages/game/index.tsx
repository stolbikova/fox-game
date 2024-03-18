import { useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { GameContext, DataItem } from "@state/GameContext";
import ImageFetcher from "@components/ImageFetcher/ImageFetcher";
import { Counter } from "@components/Counter/Counter";
import { fetchImageData } from "./fetchData";
import { ImageI } from "types";

import styles from "@pages/index.module.css";

export const PlAY_TIME_MS = 30 * 1000;
export default function Game({ data }: { data: ImageI[] }) {
  const [score, setScore] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(Date.now() + PlAY_TIME_MS);
  const { state, setState } = useContext(GameContext);
  const router = useRouter();

  const handleExpire = () => {
    const newItem: DataItem | undefined = state.data.find(
      (i) => i.name === state.currentPlayer
    );
    if (newItem) newItem.score = score;

    const newData = [
      ...state.data.filter((i) => i.name !== state.currentPlayer),
    ];
    if (newItem) newData.push(newItem);

    setState({
      ...state,
      data: newData,
    });

    router.push("/scoreboard");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Fox game</title>
      </Head>

      <main>
        <h1 className={styles.title}>Click the Fox! Game</h1>

        <p className={styles.description}>
          <span>Score: {score}</span>
          <span>
            Time left:&nbsp;
            <Counter countdown={countdown} onExpire={handleExpire} />
          </span>
        </p>
        <ImageFetcher
          onDecrementScore={() => setScore(score - 1)}
          onIncrementScore={() => setScore(score + 1)}
          data={data}
        />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getStaticProps({}) {
  // Fetch data here
  const res = await fetchImageData();

  return { props: { data: res }, revalidate: 10 }; // Optional: Revalidate at most once every 10 seconds
}
