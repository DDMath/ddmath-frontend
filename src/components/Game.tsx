import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";

import styled from "styled-components";
import { fullWidthAndHeight } from "./styles/mixin";

import Phaser from "phaser";
import { config } from "~/phaser-game/config";

type T = { stage: string };

function Game({ match }: RouteComponentProps<T>) {
  const { stage } = match.params;

  useEffect(() => {
    const phaserGame = new Phaser.Game(config);

    return () => {
      phaserGame.destroy(true);
    };
  }, []);

  return (
    <Wrapper>
      <div id="game-container" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${fullWidthAndHeight}
`;

export default Game;
