import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Stage, Sprite } from "@inlet/react-pixi";
import PetTypes from "./PetTypes";
import { randomRange } from "../util/functions";
import heart from "../images/heart.png";
// import song from "../music/song.mp3";
import bg from "../images/bg.png";

const Game = ({ endGame, setFinalScore }: any) => {
  const [lives, changeLives] = useState(3);
  const [score, changeScore] = useState(0);

  let audio: any;
  let timer: any;

  const scoreRef = useRef(score);
  scoreRef.current = score;

  const livesRef = useRef(lives);
  livesRef.current = lives;

  const setScore = (change: number): void => {
    changeScore(scoreRef.current + change);
  };

  const loseLife = (): void => {
    changeLives(livesRef.current - 1);
  };

  const getTimer = () => {
    const currentScore = scoreRef.current;

    if (currentScore > 60) {
      return 500;
    }
    if (currentScore > 50) {
      return 600;
    }
    if (currentScore > 40) {
      return 800;
    }

    if (currentScore > 30) {
      return 1000;
    }

    if (currentScore > 20) {
      return 1200;
    }

    if (currentScore > 10) {
      return 1500;
    }

    return 1800;
  };

  const loadPet = (e: any) => {
    const limit = Math.min(
      Math.round(scoreRef.current / 10),
      PetTypes.length - 1
    );
    const index = randomRange(0, limit);
    const currentPet = PetTypes[index];
    currentPet(e, setScore, loseLife);

    if (e.stage) {
      timer = setTimeout(() => {
        loadPet(e);
      }, getTimer());
    }
  };

  useEffect(() => {
    if (lives <= 0) {
      clearTimeout(timer);
      setFinalScore(scoreRef.current);
      endGame();
    }
  }, [lives]);

  const onLoad = (e: any) => {
    loadPet(e);
    // audio = new Audio(
    //   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    // );
    // audio.play();
  };

  return (
    <Container>
      <Hud>
        <p>Score: {score}</p>
        <HeartsContainer>
          {Array(lives).fill(<img src={heart} />)}
        </HeartsContainer>
      </Hud>
      <Stage onMount={(e: any) => onLoad(e)}>
        <Sprite image={bg} x={0} y={0} />
      </Stage>
    </Container>
  );
};

const Hud = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  & p {
    color: palegreen;
    font-size: 20px;
  }
`;

const HeartsContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Game;
