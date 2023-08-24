import React, { useState } from 'react'
import Topbar from '../components/Registration/Topbar'
import { keyframes, styled } from 'styled-components'
import UpIcon from '/Auth/Up.svg'
import EyeIcon from '/Auth/eve.svg'
import EyeHideIcon from '/Auth/hide.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { basicSchema } from '../schemas'
import { useFormik } from 'formik'
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
const ChooseBox = styled.div`
  width: 50%;
  background-color: #ffede8;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`
const ChooseTextOne = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  background-color: ${(props) => (props.$isSelected ? 'white' : 'transparent')};
  padding: 7px 20px;
  border-radius: 80px;
  transition: background-color 0.3s ease;
  cursor: pointer;
`

const ChooseTextTwo = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  background-color: ${(props) => (props.$isSelected ? 'white' : 'transparent')};
  padding: 7px 20px;
  border-radius: 80px;
  margin-left: 20px;
  transition: background-color 0.3s ease;
  cursor: pointer;
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
  cursor: pointer;
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
  margin-top: 30px;
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
const NamesWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const NameWrapCol = styled.div`
  display: flex;
  width: 48%;
  flex-direction: column;
  margin-bottom: 10px;
`
const ErrMsg = styled.p`
  font-size: 0.8rem;
  color: red;
  margin-top: 0.3rem;
  text-align: start;
`

const ShowLoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

// Define the styled component
const Loader = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #a8edbf;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-left: 4px solid green;
    border-bottom: 4px solid transparent;
    animation: ${rotation} 0.5s linear infinite reverse;
  }
`
const SignUp = () => {
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  // scroll animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  // control signup

  const handleSignUp = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      await axiosInstance.post('/auth/signup', {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        password: values.password,
        role: selected,
      })
      setLoading(false)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        role: '',
      },
      validationSchema: basicSchema,
      handleSignUp,
    })

  return (
    <>
      <Topbar />
      <PageBody>
        <PageHead>
          <PageTitle>Register</PageTitle>
        </PageHead>
        <RegisterSection>
          <RegisterPage>
            <Wrap>
              <form onSubmit={handleSubmit}>
                <WrapTop>
                  <ChooseBox>
                    <ChooseTextOne
                      $isSelected={selected === 'client'}
                      onClick={() => setSelected('client')}
                    >
                      I'm a Client
                    </ChooseTextOne>
                    <ChooseTextTwo
                      $isSelected={selected === 'freelancer'}
                      onClick={() => setSelected('freelancer')}
                    >
                      I'm a Freelancer
                    </ChooseTextTwo>
                  </ChooseBox>
                </WrapTop>
                <NamesWrap>
                  <NameWrapCol>
                    <InputName>First Name</InputName>
                    <InputField
                      value={values.fname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id='fname'
                      placeholder='Enter first Name...'
                      type='text'
                      size='20'
                    />
                  </NameWrapCol>
                  <NameWrapCol>
                    <InputName>Last Name</InputName>
                    <InputField
                      value={values.lname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id='lname'
                      placeholder='Enter last Name...'
                      type='text'
                      size='20'
                    />
                  </NameWrapCol>
                </NamesWrap>
                {errors.fname && touched.fname && (
                  <ErrMsg>{errors.fname}</ErrMsg>
                )}
                {errors.lname && touched.lname && (
                  <ErrMsg>{errors.lname}</ErrMsg>
                )}

                <InputName>Email Address</InputName>
                <InputField
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='email'
                  placeholder='Enter your Email...'
                  type='email'
                  size='30'
                />
                {errors.email && touched.email && (
                  <ErrMsg>{errors.email}</ErrMsg>
                )}
                <InputName style={{ marginTop: '1rem' }}>Password</InputName>
                <InputWrap>
                  <InputFieldPass
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='password'
                    placeholder='Enter your Password... '
                    type={isPasswordVisible ? 'text' : 'password'}
                    required={true}
                  />
                  {!isPasswordVisible && (
                    <InputLogo
                      src={EyeIcon}
                      onClick={togglePasswordVisibility}
                    />
                  )}
                  {isPasswordVisible && (
                    <InputLogo
                      src={EyeHideIcon}
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </InputWrap>
                {errors.password && touched.password && (
                  <ErrMsg>{errors.password}</ErrMsg>
                )}
                <Btn type='submit' onClick={handleSignUp}>
                  Register
                </Btn>
                <WrapTop>
                  <WrapDesc>Already have an account?</WrapDesc>
                  <Link to='/' style={{ textDecoration: 'none' }}>
                    <WrapDescGreen>Login!</WrapDescGreen>
                  </Link>
                </WrapTop>
              </form>
              {loading && (
                <ShowLoadingBox>
                  <Loader />
                </ShowLoadingBox>
              )}
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

export default SignUp
