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
                <PlayerAvatar src="./second-god2.png" isTopPlayer={false} />
                <PlayerInfo>
                  <div>{res[1].points} Points</div>
                  <div>{res[1].username}</div>
                </PlayerInfo>
              </PlayerCard>

              <PlayerCard isTopPlayer={true}>
                <CrownIcon src="./crawn.png" isTopPlayer={true} />
                <PlayerAvatar src="./first-god.png" isTopPlayer={true} />
                <PlayerInfo>
                  <div>{res[0].points} Points</div>
                  <div>{res[0].username}</div>
                </PlayerInfo>
              </PlayerCard>

              <PlayerCard isTopPlayer={false}>
                <PlayerAvatar src="./third-god2.png" isTopPlayer={false} />
                <PlayerInfo>
                  <div>{res[2].points} Points</div>
                  <div>{res[2].username}</div>
                </PlayerInfo>
              </PlayerCard>
            </TopPlayersContainer>
          )}


          <LeaderboardContainer>
            {
              res?.map((item: any, index: number) => (
                <PlayerRow key={index}>
                  <PlayerInfo>#{index + 1}</PlayerInfo>
                  <PlayerInfo>{item.username}</PlayerInfo>
                  <PlayerInfo>{item.points} Points</PlayerInfo>
                </PlayerRow>
              ))
            }
          </LeaderboardContainer>
        </AppContainer>
      </StyledApp>
    </>

  );
}
