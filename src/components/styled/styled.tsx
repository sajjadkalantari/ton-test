import styled from "styled-components";

export const StyledApp = styled.div`
  background-color: rgba(0,0,0,0.6);
  color: white;
  min-height: 100vh;
  padding: 10px;
  font-family: "Inter", sans-serif;
`;



export const Card = styled.div`
`;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
`;

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Input = styled("input")`
  padding: 10px 0px 10px 2px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #fefefe;
`;



export const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;


export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props: { isOpen: boolean }) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: visibility 0s, opacity 0.3s ease;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  padding: 40px;
  text-align: center;
  width: 100%;
`;


export const PointContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #02B1AA;
  border-radius: 8px;
`;

export const DescriptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  padding: 0 15px;
`;

export const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  //border: 1px solid #404043;
  border-radius: 8px;
  background-color: #2D2D2D;
  position: relative;
`;
export const PointIcon = styled.div`
  flex: 1;
  text-align: center;
`;
export const TaskIcon = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 48px;
  height: 48px;
  border: 1px solid #8A8A8A;
  border-radius: 8px;
  //padding: 12px;
  flex: 1;
  text-align: center;
`;

export const TextColumn = styled.div`
  flex: 4;
  padding: 0 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

export const BadgeColumn = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled.div`
  // background-color: dodgerblue;
  // color: #fff;
  // padding: 5px;
  // border-radius: 5px;
  // width: 20px;
  // height: 20px;  

  color: dodgerblue;
  font-size: small;
`;

export const HeroImage = styled.div`
  background-image: url(${(props: { image: string }) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  height: 500px; // You can adjust this value based on your needs
  width: 100%;
`;


// Styled components
export const LeaderboardContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  // padding: 20px 10px;
  // background: rgba(0, 0, 0, 0.5);;
  // border-radius: 8px;
  // box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const PlayerRow = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 16px 10px 10px;
  // border-bottom: 1px solid #ddd;
  background: #1E1E1E;
  margin-bottom: 10px;
`;

export const PlayerInfo = styled.span`
  font-size: 10px;
  text-align: center;
`;


// Styled-components
export const TopPlayersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
  // margin-bottom: 10px;
  padding: 20px 0px;
  box-sizing: border-box;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%), url('/bg3.svg');
  background-size: cover;
  background-position: center;
`;

export const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props: { isTopPlayer: boolean }) => (props.isTopPlayer ? '150px' : '120px')};
  padding: ${({ isTopPlayer }) => (isTopPlayer ? '8px' : '10px')};
  background: #1E1E1E;
  // border: 1px solid #404043;
  border: 1px solid;
  border-image-source: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
  border-radius: 8px;
`;

export const PlayerAvatar = styled.img`
  width: ${(props: { isTopPlayer: boolean }) => (props.isTopPlayer ? '100px' : '80px')};
  height: ${({ isTopPlayer }) => (isTopPlayer ? '100px' : '80px')};
  margin-bottom: 10px;
`;

export const CrownIcon = styled.img`
  width: 30px;
  height: 30px;
  position: relative;
  top: ${(props: { isTopPlayer: boolean }) => (props.isTopPlayer ? '-5px' : '0px')}; // Adjust based on your layout
`;