import React from "react";
import styled from "styled-components";

import Button from "./Button";

function StartButton() {
  return <StyledButton text="시작하기" />;
}

const StyledButton = styled(Button)`
  position: absolute;
  right: 255px;
  bottom: 100px;

  padding: 15px 12px;
  width: 280px;

  color: ${({ theme }) => theme.colors.darkblue};
  font-size: 40px;
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.yellow};
  letter-spacing: 5px;
  transition: 200ms;

  &:hover {
    transform: translate(-5px, -5px);
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.4);
  }
`;

export default StartButton;
