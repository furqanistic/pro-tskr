import React from 'react'
import styled from 'styled-components'
import fbIcon from '/Explore/Facebook.svg'
import inIcon from '/Explore/Insta.svg'
import lnIcon from '/Explore/linked.svg'
import twIcon from '/Explore/Twitter.svg'
import appleIcon from '/Explore/apple.svg'
import androidIcon from '/Explore/android.svg'
const Wrap = styled.div`
  min-height: 300px;
  background-color: #222;
  width: 100%;
  margin-top: 1rem;
  overflow: hidden;
`
const Top = styled.div`
  min-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
`
const TopLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const TopRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Links = styled.p`
  color: #fff;
  margin-right: 2rem;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem; /* 164.706% */
  cursor: pointer;
`
const SocialIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 1.5rem;
  cursor: pointer;
`
const Line = styled.hr`
  height: 1px;
  width: 90%;
  background-color: #e9e9e954;
  margin: 1rem auto;
  border: none;
`
const OtherSec = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex: 9;
  color: white;
`
const Sec = styled.div`
  flex: 2;
  height: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: start;
  flex-direction: column;
`
const SecName = styled.p`
  color: #fff;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem; /* 164.706% */
`
const SecLinks = styled.p`
  color: #fff;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.1875rem; /* 233.333% */
  opacity: 0.7;
`
const InputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1rem;
`
const SubInput = styled.input`
  width: 100%;
  outline: none;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  font-size: 1rem;
  padding: 1rem;
  color: white;
`
const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`
const IconImg = styled.img`
  width: 14px;
  margin-right: 7px;
`
const FooterEnd = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
`
const CopyR = styled.p`
  color: #fff;
  opacity: 0.7;
  width: 100%;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 200% */
  padding-bottom: 1rem;
`
const Footer = () => {
  return (
    <>
      <Wrap>
        <Top>
          <TopLeft>
            <Links>Terms of Service</Links>
            <Links>Privacy Policy</Links>
            <Links>Site Map</Links>
          </TopLeft>
          <TopRight>
            <Links>Follow Us</Links>
            <SocialIcon src={fbIcon} />
            <SocialIcon src={inIcon} />
            <SocialIcon src={lnIcon} />
            <SocialIcon src={twIcon} />
          </TopRight>
        </Top>
        <Line />
        <OtherSec>
          <Sec>
            <SecName>About</SecName>
            <SecLinks>Press & News</SecLinks>
            <SecLinks>Partnerships</SecLinks>
            <SecLinks>Privacy Policy</SecLinks>
            <SecLinks>Terms of Service</SecLinks>
            <SecLinks>Investor Relations</SecLinks>
          </Sec>
          <Sec>
            <SecName> Graphics & Design</SecName>
            <SecLinks>Digital Marketing</SecLinks>
            <SecLinks>Writing & Translation</SecLinks>
            <SecLinks>Video & Animation</SecLinks>
            <SecLinks>Music & Audio</SecLinks>
            <SecLinks>Programming & Tech</SecLinks>
            <SecLinks>Data Business Lifestyle</SecLinks>
          </Sec>
          <Sec>
            <SecName> Support</SecName>
            <SecLinks>Help & Support</SecLinks>
            <SecLinks>Trust & Safety</SecLinks>
            <SecLinks>Selling on Tskr</SecLinks>
            <SecLinks>Buying on Tskr</SecLinks>
          </Sec>
          <Sec>
            <SecName> Subscribe</SecName>
            <InputBox>
              <SubInput placeholder='Your Email Address...' type='Email' />
            </InputBox>
            <SecName style={{ marginTop: '3rem' }}> Apps</SecName>
            <IconWrap>
              <IconImg src={appleIcon} />
              <SecLinks>IOS App</SecLinks>
            </IconWrap>
            <IconWrap>
              <IconImg src={androidIcon} />
              <SecLinks>Android App</SecLinks>
            </IconWrap>
          </Sec>
        </OtherSec>
        <Line />
        <FooterEnd>
          <CopyR>© Tskr.com 2023 FURBA. All rights reserved.</CopyR>
        </FooterEnd>
      </Wrap>
    </>
  )
}

export default Footer
