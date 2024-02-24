import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { Task, TaskProps } from "./components/Task";
import { Point } from "./components/Point";
import { TransferTon } from "./components/TransferTon";
import { AppContainer, Button, FlexBoxCol, FlexBoxRow, StyledApp } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { useState } from "react";
import { useAsyncInitialize } from "./hooks/useAsyncInitialize";
import Modal from "./components/Modal/Modal";
import { getAppUserData, postUserAction, setAuthToken } from "./api";



function Home() {
  const [initData, setInitData] = useState<any>();
  const [selectedTaskId, setSelectedTaskId] = useState<any>();
  const [isModalOpen, setModalOpen] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const [token, setToken] = useState<string | null>(urlParams.get('token'));
  if (token)
    setAuthToken(token);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (text: any) => {
    if (selectedTaskId) {
      await postUserAction(selectedTaskId, {
        data: text
      });

      window.location.reload();
    }
  };

  const { network } = useTonConnect();

  useAsyncInitialize(async () => {
    const response = await getAppUserData(1);
    setInitData(response);
    return response;
  }, []);

  const tasks = initData?.actions as TaskProps[] ?? [];
  const username = initData?.user.username;
  const pointMessage = `${username} your point is`;


  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>

          <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />

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
                openModal={openModal}
                setSelectedTaskId={setSelectedTaskId}
              />
            ))
          }


          {/* {<FlexBoxRow>
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
          } */}
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>

  );
}

export default Home;
