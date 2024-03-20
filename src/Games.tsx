import styled from 'styled-components';

const GameBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%), url('/bg2.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Games() {
    return (
        <GameBackground>
            <p style={{maxWidth: "200px", textAlign: "center"}}>  
              The game is in <span style={{color: "#FFEEB1"}}> development and will be </span> available soon
            </p>
        </GameBackground>
    )
}