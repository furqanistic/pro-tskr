import React, { useState } from 'react'
import Navbar from '../../components/Explore/Navbar'
import { keyframes, styled } from 'styled-components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../config'
import { bidSchema } from '../../schemas'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import FindIcon from '/Explore/find.svg'
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding: 2rem;
  flex-direction: column;
`
const HeaderRoute = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  margin-bottom: 1.5rem;
`
const Heading = styled.p`
  font-size: 2.8125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const Line = styled.hr`
  width: 100%;
  height: 2px;
  background-color: #e9e9e9;
  margin-top: 2rem;
  border: none;
`
const Desc = styled.p`
  color: #6b7177;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem; /* 186.667% */
`
const DescGreen = styled(Desc)`
  color: #5bbb7b;
  font-weight: 400;
`

const DescBold = styled.a`
  color: #222;
  font-weight: 700;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem; /* 186.667% */
`
const TextWrap = styled.div`
  width: 100%;
  margin-top: 1rem;
`
const InputDivide = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const BudgetDetails = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
const BarName = styled.p`
  color: #222;
  font-size: 15px;
  font-weight: 500;
  line-height: 28px;
  margin-bottom: 5px;
`
const AmountBar = styled.div`
  width: 100%;
  display: flex;
`

const InputAmount = styled.input`
  width: 100%;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  background-color: rgba(255, 255, 255, 0);
  padding-left: 15px;
  outline: none;
  font-size: 1rem;
  padding: 1rem;
`
const TextBox = styled.textarea`
  width: 100%;
  font-size: 1rem;
  height: 300px;
  outline: none;
  padding: 1rem;
  resize: none;
  border: 1px solid #eaeaea;
`
const Hint = styled.p`
  color: #6b7177;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 200% */
`
const FileInputContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
  border: 1px solid #e9e9e9;
`

const CustomFileButton = styled.button`
  background-color: #6b7177;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`
const ButtonSet = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 5rem;
`
const Butn = styled.button`
  cursor: pointer;
  display: flex;
  padding: 11.387px 50.766px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 14px;
  border-radius: 4px;
  background-color: ${(props) => props.bg};
  border: none;
  color: ${(props) => props.dg};
  box-shadow: 0px 5px 20px 0px rgba(91, 187, 123, 0.15);
  margin-right: 10px;
`

const FileInput = styled.input.attrs({ type: 'file' })`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
`
const ChooseBox = styled.div`
  min-height: 6rem;
  border: 1px solid #e9e9e9;
  padding: 1rem 2rem;
  margin-top: 1rem;
  position: relative;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid #1f4b3f;
  }
  &.active {
    border: 3px solid #1f4b3f;
  }
`
const BidAmount = styled.div`
  color: #222;
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
  right: 2rem;
  top: 33%;
`
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
  `

const scaleUp = keyframes`
  from {
    transform: scale(0.5) translate(-50%, -50%);
  }
  to {
    transform: scale(1) translate(-50%, -50%);
  }
`

const Overlay = styled.div`
  position: fixed; // Cover the whole viewport
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.678); // Semi-transparent black
  z-index: 999; // Just behind the card
  animation: ${fadeIn} 0.3s ease-out forwards;
`

const Card = styled.div`
  background: white;
  padding: 60px;
  border-radius: 4px;
  box-shadow: 0 2px 3px #c8d0d8;
  position: fixed; // Keep it fixed on screen
  top: 50%; // Center vertically
  left: 50%; // Center horizontally
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: ${scaleUp} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; // cubic-bezier values for easeOutQuart easing
`

const ErrMsg = styled.p`
  font-size: 0.8rem;
  color: red;
  margin-top: 0.3rem;
  text-align: start;
`
const Linker = styled(Link)`
  text-decoration: none;
`

const Circle = styled.div`
  border-radius: 50%;
  height: 150px;
  width: 150px;
  background: #006a23;
  margin: 0 auto;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CheckmarkIcon = styled.i`
  color: #00d246;
  font-size: 100px;
  line-height: 200px;
  margin-left: -15px;
`

const SuccessTitle = styled.h1`
  color: #00d246;
  font-weight: 900;
  font-size: 40px;
  margin-bottom: 10px;
`

const Message = styled.p`
  color: #ffffff;
  font-size: 15px;
  margin: 0;
`
const BrowseProjects = styled.button`
  border: none;
  background-color: #00d246;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  font-weight: 300;
  color: white;
  font-size: 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const BtnImg = styled.img`
  width: 16px;
`

const SubmitProposal = () => {
  const { currentUser } = useSelector((state) => state.user)

  const [isActive, setIsActive] = useState(false)
  const params = useParams()
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()

  // console.log(params.projectID)

  const handleActive = () => {
    setIsActive(!isActive)
  }

  const handleBid = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('submit/bids', {
        amount: values.amount,
        message: values.message,
        bidder: currentUser._id,
        project: params.projectID,
        proposedDuration: values.proposedDuration,
        attachments: ['attached file test'],
      })
      setShowPopup(true)
    } catch (err) {
      console.log(err)
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        amount: '',
        message: '',
        bidder: '',
        project: '',
        proposedDuration: '',
        attachments: ['attached file test'],
      },
      validationSchema: bidSchema,
      handleBid,
    })

  return (
    <>
      <Navbar />
      <AppContainer>
        {showPopup && (
          <>
            <Overlay />
            <Card>
              <Circle>
                <CheckmarkIcon className='checkmark'>✓</CheckmarkIcon>
              </Circle>
              <SuccessTitle>Submitted</SuccessTitle>
              <Message>Your Proposal is submitted successfully!</Message>
              <Linker to='/jobs'>
                <BrowseProjects>
                  <BtnImg src={FindIcon} />
                  Browse Jobs
                </BrowseProjects>
              </Linker>
            </Card>
          </>
        )}
        <Wrap>
          <HeaderRoute>Home / Available Projects /</HeaderRoute>
          <Heading>Submit a Proposal</Heading>

          <Line />
          <TextWrap>
            <Desc>
              This proposal requires: <DescBold>8 Bids</DescBold>
            </Desc>
            <Desc>
              When you submit this proposal, you'll have 9 bids remaining.
            </Desc>
            <DescGreen>Available Bids: 0</DescGreen>
          </TextWrap>
          <Line />
          <InputDivide>
            <BudgetDetails>
              <BarName>Your Proposed Cost</BarName>
              <AmountBar>
                <InputAmount
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id='amount'
                  placeholder='$$$'
                  type='text'
                />
              </AmountBar>
              {errors.amount && touched.amount && (
                <ErrMsg>{errors.amount}</ErrMsg>
              )}
            </BudgetDetails>
          </InputDivide>
          <BarName>Cover Letter</BarName>
          <BudgetDetails>
            <BarName>Turnaround Time</BarName>
            <AmountBar>
              <InputAmount
                value={values.proposedDuration}
                onChange={handleChange}
                onBlur={handleBlur}
                id='proposedDuration'
                placeholder='e.g 2 weeks'
                type='text'
              />
            </AmountBar>
            {errors.proposedDuration && touched.proposedDuration && (
              <ErrMsg>{errors.proposedDuration}</ErrMsg>
            )}
          </BudgetDetails>
          <BudgetDetails>
            <BarName>Cover Letter</BarName>
            <AmountBar>
              <TextBox
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                id='message'
                placeholder='Your Cover Letter here...'
                type='message'
              />
            </AmountBar>
            {errors.message && touched.message && (
              <ErrMsg>{errors.message}</ErrMsg>
            )}
            <Hint>Do not add resume/portfolio here...</Hint>
          </BudgetDetails>
          <BarName>Upload File(s):</BarName>
          <FileInputContainer>
            <CustomFileButton>Choose File</CustomFileButton>
            <FileInput />
          </FileInputContainer>
          <Hint>
            You may attach up to 10 files under the size of 25 MB each
          </Hint>
          <ChooseBox
            className={isActive ? 'active' : ''}
            onClick={handleActive}
          >
            <BarName>Promote Proposal</BarName>
            <Desc>Pin this proposal to the top of the client’s list</Desc>
            <BidAmount>1 Bid</BidAmount>
          </ChooseBox>
          <ButtonSet>
            <Butn bg='#5BBB7B' dg='#FFFFFF' onClick={handleBid}>
              Submit a Proposal (8 Bid)
            </Butn>
            <Butn bg='#FFFFFF' dg='#555555'>
              Cancel
            </Butn>
          </ButtonSet>
        </Wrap>
      </AppContainer>
    </>
  )
}

export default SubmitProposal
