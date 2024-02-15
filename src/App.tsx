import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { Task } from "./components/Task";
import { Point } from "./components/Point";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();
  const tasks = [{
    isLocked: false,
    description: 'Complete a coding challenge',
    url: 'https://example.com/coding-challenge',
    points: 50,
  },
  {
    isLocked: true,
    description: 'Complete a coding challenge',
    url: 'https://example.com/coding-challenge',
    points: 1,
  }];

  const point = {
    description: "your poins is",
    point: 40
  };

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <Point description={point.description} points={point.point} />

          {tasks.map((task, index) => (
            <Task
              key={index} // Ensure to provide a unique key for each task
              isLocked={task.isLocked}
              description={task.description}
              url={task.url}
              points={task.points}
            />
          ))}

          <FlexBoxRow>
            <TonConnectButton />
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>
          </FlexBoxRow>
          <Counter />
          <TransferTon />
          <Jetton />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
