import React from 'react'
import { styled } from 'styled-components'
import CompanyLogo from '/logo.svg'
import SideBarControlIcon from '/sidebar-control.svg'
import HeartIcon from '/heart 1.svg'
import MailIcon from '/mail 1.svg'
import NotificationIcon from '/notification 1.svg'
import UserIcon from '/user.svg'
const Bar = styled.div`
  background-color: #222222;
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
  width: 40px;
  margin-left: 15px;
`
// MID SECTION OF TOPBAR

const Mid = styled.div`
  flex: 5;
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
  flex: 1;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const RightIconImg = styled.img`
  object-fit: contain;
  width: 20px;
  margin-right: 25px;
`
const LogoName = styled.p`
  color: #fff;
  font-family: DM Sans;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 10px;
`
const Topbar = (props) => {
  return (
    <>
      <Bar>
        <BarWrap>
          <Left>
            <Logo src={CompanyLogo} />
            <LogoName>
              Tskr<a style={{ color: '#5BBB7B' }}>.com</a>
            </LogoName>
          </Left>
          <Mid>
            <IconImg src={SideBarControlIcon} onClick={props.toggleSidebar} />
          </Mid>
          <Right>
            <RightIconImg src={NotificationIcon} />
            <RightIconImg src={MailIcon} />
            <RightIconImg src={HeartIcon} />
            <RightIconImg style={{ width: '35px' }} src={UserIcon} />
          </Right>
        </BarWrap>
      </Bar>
    </>
  )
}

export default Topbar
