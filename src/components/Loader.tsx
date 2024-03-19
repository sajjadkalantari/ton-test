import React from 'react';
import styled, { keyframes } from 'styled-components';

const overlayFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
`;

const spinnerSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0;
  animation: ${overlayFade} 0.3s forwards;
`;

const Spinner = styled.div`
  position: fixed;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spinnerSpin} 1s linear infinite;
`;

const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <>
            {loading && (
                <>
                    <Overlay />
                    <Spinner />
                </>
            )}
        </>
    );
};

export default Loader;
