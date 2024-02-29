import styled from "styled-components";

export const StyledApp = styled.div`
  background-color: #222;
  color: white;
  min-height: 100vh;
  padding: 10px;
  font: 
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props: { isOpen: boolean }) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: visibility 0s, opacity 0.3s ease;
`;

export const ModalContent = styled.div`
  background: #2e2d2c;
  padding: 20px;
  margin: 30px;
  border-radius: 8px;
  text-align: center;
`;


export const PointContainer = styled.div`
  display: flex;
  align-items: center;
  // padding: 10px;
  border: 1px solid #404043;
  border-radius: 5px;
`;

export const DescriptionColumn = styled.div`
  flex: 4;
  padding: 0 10px;
`;

export const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  // padding: 10px;
  border: 1px solid #404043;
  border-radius: 5px;
`;

export const TaskIcon = styled.div`
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
  font-size: x-large;
`;

export const HeroImage = styled.div`
  background-image: url(${(props: { image: string }) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  height: 500px; // You can adjust this value based on your needs
  width: 100%;
`;