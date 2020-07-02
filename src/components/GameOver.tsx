import React from "react";
import styled from "styled-components";

const Game = ({ startGame, finalScore }: any) => {
  return (
    <Container>
      <h2>Game Over</h2>
      <p>
        Your score was <strong>{finalScore}</strong>
      </p>
      <button onClick={startGame}>Try Again</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  color: palegreen;

  & p,
  h2 {
    color: inherit;
  }

  & p {
    margin-bottom: 15px;
  }
`;

export default Game;
