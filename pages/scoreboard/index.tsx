import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { GameContext } from "@state/GameContext";
import {
  Table,
  Button,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

import styles from "@pages/index.module.css";

export default function Scoreboard() {
  const { state, setState } = useContext(GameContext);
  const router = useRouter();

  const handleClickPlayScreen = () => {
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
    router.push("/game");
  };
  const handleClickWelcomeScreen = () => {
    router.push("/welcome");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Fox game</title>
      </Head>

      <main>
        <h1 className={styles.title}>Scoreboard</h1>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data
              .sort((a, b) => (a.score > b.score ? -1 : 1))
              .map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <div className={styles.buttonWrap}>
          <Button
            color="primary"
            size="medium"
            variant="outlined"
            onClick={handleClickWelcomeScreen}
          >
            To Welcome Screen
          </Button>
          <Button
            color="primary"
            size="medium"
            variant="outlined"
            onClick={handleClickPlayScreen}
          >
            PLAY!
          </Button>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
