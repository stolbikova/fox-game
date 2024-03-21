import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { GameContext } from "@state/GameContext";
import { Counter } from "@components/Counter/Counter";
import { fetchImageData } from "../../app/utils/fetchData";
import { ImageI } from "types";

const ImageFetcher = dynamic(
  () => import("@components/ImageFetcher/ImageFetcher"),
  {
    ssr: false,
  }
);

import styles from "@pages/index.module.css";

export const PlAY_TIME_MS = 30 * 1000;

export default function Game({ data }: { data: ImageI[] }) {
  const [score, setScore] = useState<number>(0);
  const [countdown] = useState<number>(Date.now() + PlAY_TIME_MS);
  const { state, setState } = useContext(GameContext);
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== undefined &&
      document.referrer.includes("scoreboard")
    ) {
      const newData = [...state.data];
      newData.push({
        name: state.currentPlayer,
        score: 0,
        date: new Date().toDateString(),
      });
      setState({
        ...state,
        data: newData,
      });
    }
  }, []);

  const handleExpire = () => {
    let newData = [...state.data];

    if (newData[state.data.length - 1])
      newData[state.data.length - 1].score = score;

    setState({
      ...state,
      data: newData,
    });

    router.push("/scoreboard");
  };

  return (
    <div className={styles.container} data-testid="game-page">
      <Head>
        <title>Fox game</title>
      </Head>

      <main>
        <h1 className={styles.title}>Click the Fox! Game</h1>

        <p className={styles.description}>
          <span data-testid="score">Score: {score}</span>
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
  const res = await fetchImageData();

  return { props: { data: res }, revalidate: 10 };
}
