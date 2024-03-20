import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getLeaderBoard } from '../apis/api';
import { useAsyncInitialize } from '../hooks/useAsyncInitialize';
import { AppContainer, CrownIcon, LeaderboardContainer, PlayerAvatar, PlayerCard, PlayerInfo, PlayerRow, StyledApp, TopPlayersContainer } from './styled/styled';
import { useState } from 'react';
import Loader from './Loader';

export function LeaderBoard() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  WebApp.BackButton.show();
  WebApp.BackButton.onClick(async () => {
    WebApp.BackButton.hide();
    navigate(-1);
  });
  let res = useAsyncInitialize(async () => {
    try {
      setLoading(true);
      const response = await getLeaderBoard();
      return response;
    } finally {
      setLoading(false);
    }

  });

  return (
    <>
      <Loader loading={loading} />
      <StyledApp>

        <AppContainer>
          {res && res.length > 0 && (

            <TopPlayersContainer>
              <PlayerCard isTopPlayer={false}>
                <PlayerAvatar src="./2.svg" isTopPlayer={false} />
                <PlayerInfo>
                  <div style={{ color: "#02B1AA", fontSize: "14px", fontWeight: "400" }}>{res[1].points} <img width={14} src="./gem.svg" alt="" /></div>
                  <div style={{ color: "#5B5B5B", marginTop: "5px" }}>{res[1].username}</div>
                </PlayerInfo>
              </PlayerCard>

              <PlayerCard isTopPlayer={true}>
                <CrownIcon src="./crawn.svg" isTopPlayer={true} />
                <PlayerAvatar src="./1.svg" isTopPlayer={true} />
                <PlayerInfo>
                  <div style={{ color: "#02B1AA", fontSize: "14px", fontWeight: "400" }}>{res[0].points} <img width={14} src="./gem.svg" alt="" /></div>
                  <div style={{ color: "#5B5B5B", marginTop: "5px" }}>{res[0].username}</div>
                </PlayerInfo>
              </PlayerCard>

              <PlayerCard isTopPlayer={false}>
                <PlayerAvatar src="./3.svg" isTopPlayer={false} />
                <PlayerInfo>
                  <div style={{ color: "#02B1AA", fontSize: "14px", fontWeight: "400" }}>{res[2].points} <img width={14} src="./gem.svg" alt="" /></div>
                  <div style={{ color: "#5B5B5B", marginTop: "5px" }}>{res[2].username}</div>
                </PlayerInfo>
              </PlayerCard>
            </TopPlayersContainer>
          )}


          <LeaderboardContainer>
            {              
              res?.map((item: any, index: number) =>  {
                
                let backgrounfColor = "#222222";
                let color = "#FFEEB1";
                
                if(index == 0) {
                  backgrounfColor = "#FFEEB1";
                  color = "black";
                }
                if(index == 1) {
                  backgrounfColor = "#E2E2E2";
                  color = "black";
                }
                if(index == 2) {
                  backgrounfColor = "#FFC4B1";
                  color = "black";
                }
                return (
                <PlayerRow key={index}>
                  <PlayerInfo style={{ border: "1px solid #4C4C4C", width: "20px", height: "20px", borderRadius: "8px", color: color, backgroundColor: backgrounfColor, padding: "12px", display: "flex", justifyContent: "center", alignItems: "center" }}>#{index + 1}</PlayerInfo>
                  <PlayerInfo style={{ textAlign: "start", flexGrow: "8", marginLeft: "20px", fontSize: "14px", fontWeight: "400" }}>{item.username}</PlayerInfo>
                  <PlayerInfo style={{ color: "#02B1AA", fontSize: "14px", fontWeight: "400" }}>{item.points} <img width={14} src="./gem.svg" alt="" /></PlayerInfo>
                </PlayerRow>
              )})
            } 
          </LeaderboardContainer>
        </AppContainer>
      </StyledApp>
    </>

  );
}
