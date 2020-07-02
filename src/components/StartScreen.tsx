import React from "react";
import styled from "styled-components";

const Game = ({ startGame }: any) => {
  return (
    <Container>
      <button onClick={startGame}>Start Game</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Game;
