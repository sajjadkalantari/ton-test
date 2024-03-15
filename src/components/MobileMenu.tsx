import { faLock, faHome, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MobileMenuContainer = styled.div`
position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background-color: rgba(0, 0, 0);
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
    padding: 5px 0;
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
  padding: 10px
`;

const MenuLabel = styled.span`
  flex-direction: column;
  display: flex;
  font-size: 14px;
  color: ${(props: { active: boolean }) => (props.active ? '#08f' : '#FFF')};
`;

export interface MenueProps {

  onItemClick: Function,
  activeItem: string
}

export function MobileMenue({ activeItem, onItemClick }: MenueProps) {
  const navigate = useNavigate();

  return (
    <MobileMenuContainer>
      {/* <MenuIcon active={activeItem === 'play'} onClick={() => onItemClick('play')}>
        <MenuLabel active={activeItem === 'play'}>
          <FontAwesomeIcon icon={faLock} />
          <span style={{marginTop: "5px"}}>Play</span>
        </MenuLabel>
      </MenuIcon> */}
      <MenuIcon active={activeItem === 'home'} onClick={() => { onItemClick('home'); navigate('/'); }}>
        <MenuLabel active={activeItem === 'home'}>
        <FontAwesomeIcon icon={faHome} />
          <span style={{marginTop: "5px"}}>Home</span>
        </MenuLabel>
      </MenuIcon>
      <MenuIcon active={activeItem === 'leaderboard'} onClick={() => { onItemClick('leaderboard'); navigate('/leader');}}>
        <MenuLabel active={activeItem === 'leaderboard'}>
        <FontAwesomeIcon icon={faTrophy} />
          <span style={{marginTop: "5px"}}>Leaders</span>
        </MenuLabel>
      </MenuIcon>
    </MobileMenuContainer>
  );
};
