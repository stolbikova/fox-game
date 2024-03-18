import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { GameContext } from "@state/GameContext";
import { Table, Button, TableHead, TableRow, TableBody } from "@mui/material";
const TableCell = dynamic(() => import("@mui/material/TableCell"), {
  ssr: false,
});

import styles from "@pages/index.module.css";

export default function Scoreboard() {
  const { state } = useContext(GameContext);
  const router = useRouter();

  const handleClickPlayScreen = () => {
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
            {state.data.map((row, idx) => (
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
