import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import StartButton from "./StartButton";

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
  position: relative;
  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: center;
  background-image: url("welcome.png");
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

export default Welcome;
