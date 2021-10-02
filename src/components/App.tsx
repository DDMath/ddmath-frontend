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
            <Route path="/stages/:stage" component={Game} />
            <Route path="/stages" />
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
`;

const Content = styled.div`
  ${flexCenter}

  width: ${({ theme }) => theme.size.width};
  height: ${({ theme }) => theme.size.height};

  overflow: hidden;
  border-radius: 5px;

  box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 20px, rgba(0, 0, 0, 0.4) 0px 10px 10px;
`;

export default App;
