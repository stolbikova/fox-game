import { ChangeEvent, useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { GameContext } from "@state/GameContext";
import { Input, InputLabel, Button } from "@mui/material";

import styles from "@pages/index.module.css";

export default function Welcome() {
  const [name, setName] = useState<string>("");
  const { state, setState } = useContext(GameContext);
  const router = useRouter();

  const handleClick = () => {
    if (name) {
      const newItemData = {
        name,
        score: 0,
        date: new Date().toDateString(),
      };
      let newData = [...state.data];

      newData.push(newItemData);
      setState({ data: newData, currentPlayer: name });

      router.push("/game");
    }
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Fox game</title>
      </Head>

      <main>
        <h1 className={styles.title}>Click the Fox! Game</h1>

        <div className={styles.inputWrap}>
          <InputLabel htmlFor="name-input">Name:</InputLabel>
          <Input
            id="name-input"
            autoFocus
            color="primary"
            onChange={handleChangeName}
          />
        </div>
        <Button
          color="primary"
          size="medium"
          variant="outlined"
          onClick={handleClick}
          disabled={name === ""}
          data-testid="play-btn"
        >
          PLAY
        </Button>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
