import { useTonConnectModal } from "@tonconnect/ui-react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserStakingInfo, postClaimStakedPoints, postStakingNFTs } from './apis/api';
import { getAccountNftItems } from './apis/tonApi';
import Loader from './components/Loader';
import ConfirmModal from './components/Modal/ConfirmModal';
import { NftItem, NftsDisplay } from './components/Nfts';
import { Button } from './components/styled/styled';
import { useAsyncInitialize } from './hooks/useAsyncInitialize';
import { useTonConnect } from './hooks/useTonConnect';


const StakingContainer = styled.div`
  // position: fixed;
  // display: flex;
  flex-direction: column;
  // top: 0;
  // left: 0;
  // width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.8) 50%, rgba(0,0,0,1) 100%), url('./bg2.png');
  background-size: cover;
  background-position: center;
  display: flex;
  // justify-content: center;
  padding: 10px;
  //align-items: center;
`;


const StakingTitle = styled.div`
font-size: 18px;
font-weight: 500;
line-height: 22.5px;
text-align: center;
color: #FFFFFF;
display: block;
margin-top: 20px
`;

const StakingPointsContainer = styled.div`
margin-top: 10px;
// padding: 8px;
color: white;
// border-radius: 8px;
//opacity: 0px;
//background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.035) 119.61%);
// border: 1px solid #FFFFFF1A;
// backdrop-filter: blur(3px);
display: flex;
align-items: center; // Centers the divider vertically
justify-content: space-between;

`;


// Style for the sections (left and right)
const Section = styled.div`
display: flex;
flex-direction: column;
align-items: center; // Centers the divider vertically
justify-content: space-between;
flex: 1;
padding: 8px; // Adjust padding as needed
`;

// Style for the vertical divider
const Divider = styled.div`
  height: 80%; // Makes the divider stretch to fill the container height
  width: 1px; // Adjust width as needed for the divider
  background-color: #FFFFFF1A; // Divider color
  margin: 0 10px; // Adds some space around the divider
  // border: 1px solid #FFFFFF1A
`;

const ClaimRewardsContainer = styled.div`
background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.035) 119.61%);
border: 1px solid #FFFFFF0F;
display: flex;
justify-content: space-around;
align-items: center;
`;
interface StakingInfo {
  stakingPoints: number, isStaking: boolean, points: number, stakingStartTime: Date
};

export function Staking() {
  const { state, open, close } = useTonConnectModal();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formatString = (str: string) => {
    // Keep the first three words and last two words
    const firstThree = str.slice(0, 3);
    const lastTwo = str.slice(-3);

    // Replace the middle words with asterisks
    const middle = "****";
    // Concatenate the first three, asterisks, and last two words
    return `${firstThree}${middle}${lastTwo}`;
  }


//  const user = useSelector((state: any) => state.user)
  const [loading, setLoading] = useState(false);
  const [stakingInfo, setStakingInfo] = useState<StakingInfo>();
  
//  const [isStaking, setIsStaking] = useState(false);
  const [nftItems, setNftItems] = useState<NftItem[]>([]);
  let { wallet } = useTonConnect();
  //const [walletAddress, setWalletAddress] = useState<string | null>(wallet);

  const collectionAddress = "EQCLN0mc5zJwjBAxhwtpQFlPq2nLoA5HR0pWbt5lXObX5oqa";
  useAsyncInitialize(async () => {
    if (wallet && nftItems.length <= 0) {
      const res = await getAccountNftItems(wallet, { limit: 1000, collection: collectionAddress });

      let items = res.nft_items.map((m: any) => {
        let url = m.previews.find((preview: any) => preview.resolution === "500x500")?.url;
        m.metadata.imageUrl = url;
        return m.metadata;
      });

      setNftItems(items);
    }
  }, [wallet]);

  const res = useAsyncInitialize(async () => {
    try {
      setLoading(true);
      const response = await getUserStakingInfo();
      setStakingInfo(response);
     // setIsStaking(response?.isStaking ?? false);
      return response;
    } finally {
      setLoading(false);
    }

  }, []);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      console.log(modalAction)
      setLoading(true);
      if (modalAction == "claim") {
        const response = await postClaimStakedPoints();
        setStakingInfo(response);
      }
      if (modalAction == "staking") {
        await postStakingNFTs({ isStaking: true });
        const response = await postClaimStakedPoints();
        setStakingInfo(response);
       // setIsStaking(true);
      }
    }
    finally {
      setLoading(false);
    }

  };
  return (
    <>
      <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
      <Loader loading={loading} />
      <StakingContainer>

        <StakingPointsContainer>
          <div style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            height: "100%",
            flexGrow: 1,
            marginRight: 20,
            alignItems: 'center'
          }}>

            <Section>
              <span style={{ color: "#FFFFFF33", fontSize: "12px" }}>SCORE</span>
              <span style={{ fontWeight: 400, fontSize: 16, textAlign: 'center', marginTop: "10px" }}>
                <img style={{ marginRight: 5 }} src="./star.svg" alt="" />
                {stakingInfo?.stakingPoints.toString()}
              </span>
            </Section>
            <Divider />
            <Section>
              <span style={{ color: "#FFFFFF33", fontSize: "12px" }}>ROOLZ</span>
              <span style={{ fontWeight: 400, fontSize: 16, textAlign: 'center', marginTop: "10px" }}>
                <img style={{ marginRight: 5 }} src="./gem.svg" alt="" />
                {stakingInfo?.points.toString()}
              </span>
            </Section>
          </div>

          {/* <TonConnectButton style={{ marginTop: "16px", fontSize: "small", background: "red !important" }} /> */}


          <button onClick={() => {
            open();

          }} style={{ border: "1px solid #02B1AA", background: "transparent", color: "white", borderRadius: 8, textAlign: "center", padding: 12, display: "flex", justifyContent: "center", alignContent: "center" }}>
            <img style={{ marginRight: 5 }} src="./wallet2.svg" alt="" />
            <span style={{ margin: "auto", alignItems: "center" }}>{wallet ? formatString(wallet) : "CONNECT"}</span>
          </button>
        </StakingPointsContainer>

        <StakingTitle>
          NFT STAKING
        </StakingTitle>

        <ClaimRewardsContainer style={{
          background: "linear-gradient(180deg, #1B1B1B 0%, #101010 119.61%)",
          border: "1px solid #FFFFFF0F",
          borderRadius: 8,
          padding: "0px 8px",
          marginTop: 20
        }}>
          <div style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            height: "100%",
            flexGrow: 1,
            marginRight: 20,
            alignItems: 'center',
          }}>

            <Section style={{
              alignItems: "flex-start",
              background: "transparent",
              border: "none"
            }}>
              <span style={{ color: "#FFFFFF33", fontSize: "12px" }}>SCORE</span>
              <span style={{ fontWeight: 400, fontSize: 16, textAlign: 'center', marginTop: "10px" }}>
                <img style={{ marginRight: 5 }} src="./star.svg" alt="" />
                {stakingInfo?.stakingPoints.toString()} SCORES
              </span>
            </Section>
          </div>
          <Button disabled={stakingInfo && stakingInfo?.stakingPoints > 0 ? false : true} style={{ padding: "12px", fontSize: "15px", display: "flex", justifyContent: "center", alignContent: "center" }}
            onClick={() => {
              setModalAction("claim");
              openModal();
            }}
          >
            CLAIM
          </Button>
        </ClaimRewardsContainer>
        <div style={{
          marginTop: 20,
          minHeight: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {
            (!nftItems || nftItems.length <= 0) && (
              <p style={{ textAlign: "center" }}>
                You don't have an NFT, make a vollet connection or buy an NFT
              </p>
            )
          }

          {nftItems.length > 0 && (<NftsDisplay items={nftItems} />)}

        </div>
        <Button disabled={stakingInfo?.isStaking ? true : false} style={{ width: "100%", marginTop: "20px", padding: "12px", fontSize: "15px" }}
          onClick={() => {
            setModalAction("staking");
            openModal();
          }}>
          STAKE YOUR NFTS
        </Button>
      </StakingContainer>

    </>

  )
}