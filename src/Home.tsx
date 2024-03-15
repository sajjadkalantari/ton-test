import "@twa-dev/sdk";
import { useState } from "react";
import "./App.css";
import { getAppUserData, postUserAction, setAuthToken } from "./apis/api";
import { getAccountNftItems } from "./apis/tonApi";
import Modal from "./components/Modal/Modal";
import { NftItem, NftsDisplay } from "./components/Nfts";
import { Point } from "./components/Point";
import { Task, TaskProps } from "./components/Task";
import { AppContainer, FlexBoxCol, StyledApp } from "./components/styled/styled";
import { useAsyncInitialize } from "./hooks/useAsyncInitialize";
import { useTonConnect } from "./hooks/useTonConnect";



function Home() {
  const [initData, setInitData] = useState<any>();
  const [selectedTaskId, setSelectedTaskId] = useState<any>();
  const [isModalOpen, setModalOpen] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const appToken = urlParams.get('token');
  if (appToken)
    localStorage.setItem('token', appToken)
  // const [token, setToken] = useState<string | null>(appToken || );
  const token = localStorage.getItem('token');
  if (token)
    setAuthToken(token);
  const [nftItems, setNftItems] = useState<NftItem[]>([]);

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
    const response = await getAppUserData(1);
    setInitData(response);
    return response;
  }, []);

  const tasks = initData?.actions as TaskProps[] ?? [];
  const username = initData?.user.username;
  const pointMessage = `@${username} points balance`;
  console.log(username);
  useAsyncInitialize(async () => {
    if (username && wallet && nftItems.length <= 0) {
      const res = await getAccountNftItems(wallet, { limit: 1000 });

      let items = res.nft_items.map((m: any) => {
        let url = m.previews.find((preview: any) => preview.resolution === "500x500")?.url;
        m.metadata.imageUrl = url;
        return m.metadata;
      });

      setNftItems(items);
    }
  }, [nftItems, wallet, username]);

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>

          <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
          <img src="./roolzHero2.png" style={{ width: "100%", height: "auto", borderRadius: "5px" }} />

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
