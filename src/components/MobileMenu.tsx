import { faLock, faHome, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MobileMenuContainer = styled.div`
    position: fixed;
    bottom: 20px;
    border-radius: 8px;
    border: 1px solid;
    border-image-source: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.0114) 100%);
    left: 50%;
    transform: translate(-50%, 0%);
    width: 79%;
    background-color: #131313;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: space-around;
    -webkit-justify-content: space-around;
    -ms-flex-pack: space-around;
    -webkit-box-pack: space-around;
    -webkit-justify-content: space-around;
    -ms-flex-pack: space-around;
    justify-content: space-around;
    padding: 12px 24px 12px 24px;
    z-index: 100;
`;

const MenuIcon = styled.div`
  //background-color: ${(props: { active: boolean }) => (props.active ? '#08f' : 'transparent')};
  background-color: transparent;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  // padding: 10px
`;

const MenuLabel = styled.span`
  flex-direction: column;
  display: flex;
  font-size: 14px;
  color: ${(props: { active: boolean }) => (props.active ? '#FFEEB1' : '#939393')};
`;

export interface MenueProps {

  onItemClick: Function,
  activeItem: string
}

export function MobileMenue({ activeItem, onItemClick }: MenueProps) {
  const navigate = useNavigate();

  return (
    <MobileMenuContainer>
      <MenuIcon active={activeItem === 'games'} onClick={() => { onItemClick('home'); navigate('/'); }}>
        <MenuLabel active={activeItem === 'games'}>
          <img style={{ width: "24px", margin: "auto" }} src={activeItem === 'games' ? "./Gamepad-active.svg" : "./Gamepad.svg"} alt="" />
          <span style={{ marginTop: "5px", fontSize: "12px" }}>Games</span>
        </MenuLabel>
      </MenuIcon>
      <MenuIcon active={activeItem === 'home'} onClick={() => { onItemClick('home'); navigate('/'); }}>
        <MenuLabel active={activeItem === 'home'}>
          <img style={{ width: "24px", margin: "auto" }} src={activeItem === 'home' ? "./Bolt-active.svg" : "./Bolt.svg"} alt="" />
          <span style={{ marginTop: "5px", fontSize: "12px" }}>Home</span>
        </MenuLabel>
      </MenuIcon>
      <MenuIcon active={activeItem === 'leaderboard'} onClick={() => { onItemClick('leaderboard'); navigate('/leader'); }}>
        <MenuLabel active={activeItem === 'leaderboard'}>
          <img style={{ width: "24px", margin: "auto" }} src={activeItem === 'leaderboard' ? "./Cup-active.svg" : "./Cup.svg"} alt="" />
          <span style={{ marginTop: "5px", fontSize: "12px" }}>High Score</span>
        </MenuLabel>
      </MenuIcon>
    </MobileMenuContainer>
  );
};
