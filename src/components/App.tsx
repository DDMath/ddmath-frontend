import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "./styles/theme";
import { flexCenter } from "./styles/mixin";
import { GlobalStyle } from "./styles/globalStyle";

import Game from "./Game";
import Welcome from "./Welcome";

function App() {
  return (
    <DisplayContainer>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Content>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/stages" component={Game} />
            <Redirect to="/" />
          </Switch>
        </Content>
      </ThemeProvider>
    </DisplayContainer>
  );
}

const DisplayContainer = styled.div`
  ${flexCenter}

  width: 100vw;
  height: 100vh;

  background: linear-gradient(
    90deg,
    hsla(224, 88%, 93%, 1) 0%,
    hsla(275, 18%, 79%, 1) 15%,
    hsla(351, 47%, 88%, 1) 47%,
    hsla(312, 91%, 96%, 1) 74%,
    hsla(233, 100%, 94%, 1) 100%
  );
`;

const Content = styled.div`
  ${flexCenter}

  position: relative;
  aspect-ratio: 4 / 3;

  width: 100%;
  height: auto;

  max-width: ${({ theme }) => theme.size.maxWidth};
  max-height: ${({ theme }) => theme.size.maxHeight};

  overflow: hidden;
  border-radius: 5px;

  box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 20px, rgba(0, 0, 0, 0.4) 0px 10px 10px;
`;

export default App;
