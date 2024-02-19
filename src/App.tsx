import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { Task, TaskProps } from "./components/Task";
import { Point } from "./components/Point";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { useState } from "react";
import axios from "axios";
import { useAsyncInitialize } from "./hooks/useAsyncInitialize";
import Slides from "./components/Slides";
import WebApp from '@twa-dev/sdk';

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



  const urlParams = new URLSearchParams(window.location.search);
  const [username, setUsername] = useState<string | null>(urlParams.get('username'));
  const [initData, setInitData] = useState<any>();


  const res = useAsyncInitialize(async () => {
    const response = await axios.get(`http://localhost:5120/App/1/${username}`);
    setInitData(response.data);
    console.log(response.data);
    return response;
  }, [username]);

  const tasks = initData?.actions as TaskProps[] ?? [];

  const pointMessage = `${username} your point is`;
  WebApp.BackButton.show();
  WebApp.BackButton.onClick(() => {
    WebApp.BackButton.hide();
  });


  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <Slides />

          <Point description={pointMessage} points={initData?.user.points ?? 0} />
          {
            tasks.map((task, index) => (
              <Task
                key={index}
                redirectionLink={task.redirectionLink}
                type={task.type}
                id={task.id}
                isLocked={initData?.user.userActions.some((item: { actionId: number }) => item.actionId === task.id) ? false : true}
                description={task.description}
                point={task.point}
                title={task.title}
              />
            ))
          }


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
