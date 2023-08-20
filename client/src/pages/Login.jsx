import React, { useState } from 'react'
import Topbar from '../components/Registration/Topbar'
import { styled } from 'styled-components'
import UpIcon from '/Auth/Up.svg'
import EyeIcon from '/Auth/eve.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess } from '../redux/userSlice'
import { axiosInstance } from '../config'

const PageBody = styled.div`
  background-color: #ffede8;
  width: 100%;
  height: calc(100vh - 60px);
`
const PageHead = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PageTitle = styled.h1`
  color: #222;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`
const RegisterSection = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`
const RegisterPage = styled.div`
  width: 680px;
  background-color: white;
`
const Wrap = styled.div`
  padding: 3rem;
  width: 100%;
`
const WrapTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`
const WrapTitle = styled.p`
  color: #222;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
`
const WrapDesc = styled.p`
  color: #222;
  text-align: center;
  font-size: 15px;
  font-weight: 300;
  line-height: 45px;
`
const WrapDescGreen = styled(WrapDesc)`
  color: green;
  font-weight: 500;
  margin-left: 5px;
`
const InputName = styled.p`
  color: #222;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 34px;
`
const InputWrap = styled.div`
  display: flex;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
`
const InputField = styled.input`
  display: flex;
  padding: 14px 16px;
  align-items: center;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  background-color: #fff;
  width: 100%;
  outline: none;
`
const InputFieldPass = styled(InputField)`
  border: none;
`
const InputLogo = styled.img`
  width: 40px;
  padding: 8px;
`
const CheckboxContainer = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? '#1F4B3F' : 'transparent')};
  border-radius: 4px;
  border: 1px solid #1f4b3f;
  position: relative;
  cursor: pointer;
  margin: 10px;
`

const TickMark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  font-size: 10px;
  color: white;
  transition: transform 0.3s;
  transform: ${(props) =>
    props.checked
      ? 'translate(-50%, -50%) scale(1)'
      : 'translate(-50%, -50%) scale(0)'};
`
const CheckWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
`
const CheckText = styled.p`
  color: #222;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 186.667% */
`
const ClickLink = styled.p`
  color: #222;
  text-align: right;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 186.667% */
  text-decoration-line: underline;
  position: absolute;
  right: 0;
`
const Btn = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  padding: 11px 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  background-color: #5bbb7b;
  border-radius: 4px;
  width: 100%;
  margin-top: 20px;
  color: white;
  font-weight: 600;
`
const FooterSec = styled.div`
  height: 400px;
  background-color: #222222;
  width: 100%;
  position: relative;
`
const Foot = styled.div`
  position: absolute;
  bottom: 0;
`
const FootText = styled.p`
  opacity: 0.7;
  color: white;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  padding-bottom: 2rem;
  margin-left: 10vw;
`
const UpButton = styled.img`
  position: absolute;
  width: 30px;
  bottom: 0;
  right: 5vw;
  background-color: #2d2d2d;
  border-radius: 50%;
  padding: 4px;
  margin-bottom: 10px;
`
const Failure = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 1rem;
  color: red;
  text-align: center;
`
const Login = () => {
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [showFailure, setShowFailure] = useState(false)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginStart())

    try {
      const res = await axiosInstance.post('/auth/signin', {
        email,
        password,
      })
      dispatch(loginSuccess(res.data))
    } catch (err) {
      console.log(err)
      setShowFailure(true)
    }
  }

  return (
    <>
      <Topbar />
      <PageBody>
        <PageHead>
          <PageTitle>Login</PageTitle>
        </PageHead>
        <RegisterSection>
          <RegisterPage>
            <Wrap>
              <WrapTitle>Welcome Back!</WrapTitle>
              <WrapTop>
                <WrapDesc>Don't have an account?</WrapDesc>
                <Link to='register' style={{ textDecoration: 'none' }}>
                  <WrapDescGreen>Signup!</WrapDescGreen>
                </Link>
              </WrapTop>
              <InputName>Email Address</InputName>
              <InputField
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                placeholder='Enter your email... '
                type='text'
                autoComplete='off'
              />
              <InputName style={{ marginTop: '1rem' }}>Password</InputName>
              <InputWrap>
                <InputFieldPass
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your Password... '
                  type='password'
                  autoComplete='off'
                />
                <InputLogo src={EyeIcon} />
              </InputWrap>
              {showFailure && (
                <Failure>Wrong Email or Password, Please try again</Failure>
              )}
              <CheckWrap>
                <CheckboxContainer
                  checked={checked}
                  onClick={() => setChecked(!checked)}
                >
                  <TickMark checked={checked}>✓</TickMark>
                </CheckboxContainer>
                <CheckText>Remember me</CheckText>
                <ClickLink>Forgot password?</ClickLink>
              </CheckWrap>
              <Btn type='submit' onClick={handleLogin}>
                Log in
              </Btn>
            </Wrap>
          </RegisterPage>
        </RegisterSection>
      </PageBody>
      <FooterSec>
        <Foot>
          <FootText>© Tskr.com - 2023. All rights reserved.</FootText>
        </Foot>
        <UpButton src={UpIcon} onClick={scrollToTop} />
      </FooterSec>
    </>
  )
}

export default Login
