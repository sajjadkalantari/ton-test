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
import { getAppUserData, postUserAction, setAuthToken } from "./apis/api";
import { getAccountNftItems } from "./apis/tonApi";
import { NftItem, NftsDisplay } from "./components/Nfts";



function Home() {
  const [initData, setInitData] = useState<any>();
  const [selectedTaskId, setSelectedTaskId] = useState<any>();
  const [isModalOpen, setModalOpen] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const [token, setToken] = useState<string | null>(urlParams.get('token'));
  const [nftItems, setNftItems] = useState<NftItem[]>([]);
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

  const { wallet } = useTonConnect();



  useAsyncInitialize(async () => {
    if (wallet && nftItems.length <= 0) {
      const res = await getAccountNftItems(wallet, { limit: 1000 });

      let items = res.nft_items.map((m: any) => {
        let url = m.previews.find((preview: any) => preview.resolution === "500x500")?.url;
        m.metadata.imageUrl = url;
        return m.metadata;
      });

      setNftItems(items);
    }
  }, [nftItems, wallet]);





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

          {nftItems.length > 0 && (<NftsDisplay items={nftItems} />)}


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
