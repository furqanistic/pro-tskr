import styled, { keyframes, css } from 'styled-components'
import React from 'react'

const slide = keyframes`
  0% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(50px);
  }
`

const escalade = (pathLength) => keyframes`
  0% {
    stroke-dasharray: 0 ${pathLength};
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: ${pathLength} ${pathLength};
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: ${pathLength} ${pathLength};
    stroke-dashoffset: -${parseFloat(pathLength) - 1}px;
  }
`

const SVG = styled.svg`
  overflow: visible;
  width: 100px;
  height: 150px;

  g {
    animation: ${slide} 2s linear infinite;

    &:nth-child(2) {
      animation-delay: 0.5s;
      path {
        animation-delay: 0.5s;
        stroke-dasharray: 0px 158px;
        stroke-dashoffset: 1px;
      }
    }
  }

  path {
    stroke: url(#gradient);
    stroke-width: 20px;
    stroke-linecap: round;
    fill: none;
    stroke-dasharray: 0 157px;
    stroke-dashoffset: 0;
    animation: ${(props) =>
      css`
        ${escalade('157px')} 2s cubic-bezier(0.8, 0, 0.2, 1) infinite
      `};
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Name = styled.p`
  font-size: 1.5rem;
  color: #003c14;
  text-align: center;
  font-weight: 700;
`

const LoaderBasic = ({ Message }) => (
  <>
    <Container>
      <SVG>
        <g>
          <path d='M 50,100 A 1,1 0 0 1 50,0' />
        </g>
        <g>
          <path d='M 50,75 A 1,1 0 0 0 50,-25' />
        </g>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop
              offset='0%'
              style={{ stopColor: '#003c14', stopOpacity: '1' }}
            />
            <stop
              offset='100%'
              style={{ stopColor: '#5bbb7b', stopOpacity: '1' }}
            />
          </linearGradient>
        </defs>
      </SVG>
      <Name>{Message}</Name>
    </Container>
  </>
)

export default LoaderBasic
