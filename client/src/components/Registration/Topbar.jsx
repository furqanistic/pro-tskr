import React from 'react'
import { styled } from 'styled-components'
import CompanyLogo from '/logo.svg'
import SideBarControlIcon from '/sidebar-control.svg'
import CompanyIcon from '/Auth/logo.svg'
import CompanyNameIcon from '/Auth/tskr.svg'
import ComIcon from '/Auth/com.svg'
import { Link } from 'react-router-dom'
const Bar = styled.div`
  background-color: #ffffff;
  height: 60px;
  width: 100vw;
`
const BarWrap = styled.div`
  width: 100%;
  flex: 7;
  display: flex;
`
// LEFT SECTION OF TOPBAR
const Left = styled.div`
  flex: 1;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 250px;
  position: sticky;
  top: 0;
`
const Logo = styled.img`
  object-fit: contain;
  width: 150px;
  height: 100%;
  margin-left: 15px;
`
const VerticalLine = styled.div`
  width: 1px;
  height: 40px;
  background-color: #e9e9e9;
  margin-left: 1rem;
`
// MID SECTION OF TOPBAR

const Mid = styled.div`
  flex: 1;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`
const IconImg = styled.img`
  object-fit: contain;
  width: 17px;
`
// RIGHT SECTION OF TOPBAR
const Right = styled.div`
  flex: 5;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const CategoryName = styled.p`
  color: #222;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  margin-left: 2rem;
`
const SignUpBtn = styled.div`
  display: flex;
  padding: 4px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #5bbb7b;
  color: white;
  font-size: 15px;
  font-weight: 700;
  line-height: 28px;
  margin: 0 2rem;
`
const Topbar = (props) => {
  return (
    <>
      <Bar>
        <BarWrap>
          <Left>
            <Logo src={CompanyIcon} />
            <VerticalLine></VerticalLine>
          </Left>
          <Mid>
            <IconImg src={SideBarControlIcon} onClick={props.toggleSidebar} />
          </Mid>
          <Right>
            <CategoryName>Home</CategoryName>
            <Link to='jobs' style={{ textDecoration: 'none' }}>
              <CategoryName>Avaliable Jobs</CategoryName>
            </Link>
            <CategoryName>Blog</CategoryName>
            <VerticalLine></VerticalLine>
            <CategoryName>Login</CategoryName>
            <SignUpBtn>Sign Up</SignUpBtn>
          </Right>
        </BarWrap>
      </Bar>
    </>
  )
}

export default Topbar
