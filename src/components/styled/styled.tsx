import styled from "styled-components";

export const Card = styled.div`
  padding: 18px 20px;
  border-radius: 8px;
  background-color: white;

  @media (prefers-color-scheme: dark) {
    background-color: #111;
  }
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
  border: 1px solid #c2c2c2;

  @media (prefers-color-scheme: dark) {
    border: 1px solid #fefefe;
  }
`;


export const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;


export const PointContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #d2f5d3;
  border-radius: 5px;
`;

export const DescriptionColumn = styled.div`
  flex: 4;
  padding: 0 10px;
`;

export const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
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
`;

export const BadgeColumn = styled.div`
  flex: 1;
  text-align: center;
`;

export const Badge = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  margin-top: 10px; /* Adjust as needed */
`;