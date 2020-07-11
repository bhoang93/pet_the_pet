import React, { useState } from "react";
import Game from "./components/Game";
import StartScreen from "./components/StartScreen";
import GameOver from "./components/GameOver";
import styled from "styled-components";
import logo from "./images/logo.png";
import Shake from "shake.js";

function App() {
  const [gameState, changeGameState] = useState("start");
  const [finalScore, setFinalScore] = useState(null);

  const myShakeEvent = new Shake({
    threshold: 5,
  });

  const startGame = () => {
    const requestPermissions = () => {
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        (DeviceMotionEvent as any)
          .requestPermission()
          .then((permissionState) => {
            if (permissionState === "granted") {
              myShakeEvent.start();
            }
          })
          .then(() => {
            if (
              typeof (DeviceOrientationEvent as any).requestPermission ===
              "function"
            ) {
              (DeviceOrientationEvent as any)
                .requestPermission()
                .then((permissionState) => {
                  if (permissionState === "granted") {
                    // window.addEventListener("deviceorientation", () => {});
                  }
                })
                .then(() => {
                  changeGameState("game");
                })
                .catch(console.error);
            }
          })
          .catch(console.error);
      } else {
        changeGameState("game");
      }
    };

    requestPermissions();
  };

  const endGame = () => {
    changeGameState("gameOver");
  };

  return (
    <Container>
      <img src={logo} alt="Pet the Pet" />
      {gameState === "start" ? (
        <StartScreen key={Math.random()} startGame={startGame} />
      ) : gameState === "game" ? (
        <Game
          key={Math.random()}
          endGame={endGame}
          setFinalScore={setFinalScore}
        />
      ) : (
        <GameOver
          key={Math.random()}
          startGame={startGame}
          finalScore={finalScore}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  flex-direction: column;

  & img {
    max-width: 200px;
  }
`;

export default App;
