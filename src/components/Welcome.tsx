import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import StartButton from "./StartButton";
import { fullWidthAndHeight } from "./styles/mixin";

function Welcome() {
  return (
    <Wrapper>
      <Link to="/stages/1">
        <StartButton />
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${fullWidthAndHeight}

  background-size: cover;
  background-position: center;
  background-image: url("welcome.png");
`;

export default Welcome;
