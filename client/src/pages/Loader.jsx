import { Logout } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { logout } from '../redux/userSlice.js'
const jump7456 = keyframes`
    15% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
  `
const shadow324 = keyframes`
  0%,
    100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
`
const LoaderDiv = styled.div`
  width: 48px;
  height: 48px;
  margin: auto;
  position: relative;
  &:before {
    content: '';
    width: 48px;
    height: 5px;
    background: #b8e5c7;
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: ${shadow324} 0.5s linear infinite;
  }
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: #5bbb7b;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: ${jump7456} 0.5s linear infinite;
  }
`
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent; /* Ensuring the background is transparent */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(12px); /* Adjust the blur value as needed */
    z-index: -1; /* Ensuring it stays behind the loader */
  }
`

const Loader = () => {
  return (
    <>
      <Container>
        <LoaderDiv></LoaderDiv>
      </Container>
    </>
  )
}

export default Loader
