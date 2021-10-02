import React from "react";
import styled from "styled-components";

type ButtonProps = {
  text?: string;
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
};

function Button({ children, className, text }: ButtonProps) {
  return (
    <DefaultButton className={className}>
      {children}
      {text}
    </DefaultButton>
  );
}

const DefaultButton = styled.button`
  cursor: pointer;
  outline: none;
`;

export default Button;
