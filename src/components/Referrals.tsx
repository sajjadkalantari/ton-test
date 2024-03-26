import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserReferrals } from '../apis/api';
import { useAsyncInitialize } from '../hooks/useAsyncInitialize';
import { setMenuVisibility } from '../states/actions';
import { Button } from './styled/styled';
import Loader from './Loader';

const ReferralContainer = styled.div`
  // position: fixed;
  // display: flex;
  flex-direction: column;
  // top: 0;
  // left: 0;
  // width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%), url('./bg2.png');
  background-size: cover;
  background-position: center;
  display: flex;
  // justify-content: center;
  padding: 20px;
  //align-items: center;
`;


const ReferralTitle = styled.div`
font-size: 18px;
font-weight: 500;
line-height: 22.5px;
text-align: center;
color: #FFFFFF;
display: block;
`;

const ReferralPointsContainer = styled.div`
margin-top: 20px;
padding: 8px;
border-radius: 8px;
opacity: 0px;
background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.035) 119.61%);
border: 1px solid #FFFFFF1A;
backdrop-filter: blur(3px);
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
  height: 90%; // Makes the divider stretch to fill the container height
  width: 1px; // Adjust width as needed for the divider
  background-color: #FFFFFF1A; // Divider color
  margin: 0 10px; // Adds some space around the divider
  // border: 1px solid #FFFFFF1A
`;

export function Referrals() {

  const navigate = useNavigate();
  WebApp.BackButton.show();
  WebApp.BackButton.onClick(async () => {
    WebApp.BackButton.hide();
    navigate("/");
  });

  const dispatch = useDispatch();

  const res = useAsyncInitialize(async () => {
    try {
      setLoading(true);
      const response = await getUserReferrals();
      return response;
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    dispatch(setMenuVisibility(false));
    return () => {
      dispatch(setMenuVisibility(true));
    };
  }, []);

  const copyReferralLink = async () => {
    if (res?.referralLink) {
      await navigator.clipboard.writeText(res?.referralLink)
    } else {
      alert("Please reload page");
    }
  }
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loader loading={loading} />
      <ReferralContainer>
        <ReferralTitle>
          FRIENDS BOARD
        </ReferralTitle>
        <ReferralPointsContainer>
          <Section>
            <span style={{ fontWeight: 500, fontSize: 20 }}>{res?.totalInvites}</span>
            <span style={{ fontSize: 15, textAlign: 'center', marginTop: "10px" }}>FRIENDS JOINED</span>
          </Section>
          <Divider />
          <Section>
            <span style={{ fontWeight: 500, fontSize: 20 }}>{res?.points}</span>
            <span style={{ fontSize: 15, textAlign: 'center', marginTop: "10px" }}>POINTS</span>
          </Section>
        </ReferralPointsContainer>
        <Button style={{ width: "100%", marginTop: "20px", padding: "12px", fontSize: "15px" }} onClick={copyReferralLink}>
          COPY REFERRAL LINK
        </Button>
      </ReferralContainer>
    </>


  )
}