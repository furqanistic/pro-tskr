import React from 'react'
import { styled } from 'styled-components'
import dpIcon from '/Explore/dp.png'
import starIcon from '/Explore/star.svg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const Wrap = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 0.5rem;
  height: 100%;
  /* margin-bottom: 13rem; */
`
const BidBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid #e9e9e9;
  border-radius: 0.25rem;
`
const BidPrice = styled.p`
  text-align: center;
  /* 28/Bold */
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const BidType = styled.p`
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 200% */
  margin-bottom: 20px;
`
const SubmitBid = styled.button`
  display: flex;
  padding: 0.6875rem 1.125rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.25rem;
  background: #5bbb7b;
  box-shadow: 0px 5px 20px 0px rgba(91, 187, 123, 0.15);
  border: none;
  margin-bottom: 10px;
  color: white;
  font-weight: 600;
`

const SaveJobBtn = styled.button`
  display: flex;
  padding: 0.6875rem 1.125rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: white;
  border: none;
  margin-bottom: 10px;
  color: #555555;
  font-weight: 600;
`
const Line = styled.hr`
  width: 100%;
  height: 2px;
  background-color: #e9e9e9;
  margin-top: 1.2rem;
  border: none;
`
const SendTxt = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
  margin-top: 2rem;
`
const AvlTxt = styled.p`
  color: #5bbb7b;
  text-align: right;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 200% */
`
const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid #e9e9e9;
`
const ClientTitle = styled.p`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const ClientInfoWrap = styled.div`
  width: 100%;
  display: flex;
  flex: 4;
  margin-top: 2.5rem;
`
const ClientLeft = styled.div`
  flex: 1;
  width: 100%;
  padding-right: 1rem;
`
const ClientRight = styled.div`
  flex: 3;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const ClientDp = styled.img`
  width: 5.6rem;
  height: 5.6rem;
  object-fit: cover;
  border-radius: 50%;
`
const ClientName = styled.p`
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
`
const ClientSkill = styled.p`
  color: #6b7177;
  text-align: start;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 200% */
`
const RatingSet = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  width: 100%;
`
const StarImg = styled.img`
  width: 10px;
`
const StarInfo = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
  margin-left: 5px;
`
const StarInfoTotal = styled.p`
  color: #6b7177;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
  margin-left: 5px;
`
const Additional = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const Subject = styled.p`
  margin-top: 1.5rem;

  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
`
const SubjectInfo = styled.p`
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
`
const JobLinkInput = styled.input`
  color: #6b7177;
  margin-top: 10px;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 200% */
  padding: 0.4rem 1rem;
  outline: none;
  border: 1px solid #e9e9e9;
`
const Btn = styled.button`
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.75rem; /* 186.667% */
  display: flex;
  padding: 0.25rem 0.875rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.25rem;
  background: #5bbb7b;
  width: 8rem;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 15px;
`
const Pricebar = ({ userInfo, projectinfo }) => {
  return (
    <Wrap>
      <BidBox>
        <BidPrice>$400</BidPrice>
        <BidType>Hourly</BidType>
        <SubmitBid>Submit a Proposal</SubmitBid>
        <SaveJobBtn>Save Job</SaveJobBtn>
        <Line />
        <SendTxt>Send a proposal for: 8 bids</SendTxt>
        <AvlTxt>
          Available Bids: <b>232</b>
        </AvlTxt>
      </BidBox>
      <ClientInfo>
        <ClientTitle>About Client</ClientTitle>
        <ClientInfoWrap>
          <ClientLeft>
            <ClientDp src={dpIcon} />
          </ClientLeft>
          <ClientRight>
            <ClientName>
              {userInfo.fname} {userInfo.lname}
            </ClientName>
            <ClientSkill>{projectinfo.category} </ClientSkill>
            <RatingSet>
              <StarImg src={starIcon} />
              <StarInfo>0</StarInfo>
              <StarInfoTotal>(0 reviews)</StarInfoTotal>
            </RatingSet>
          </ClientRight>
        </ClientInfoWrap>
        <Line />
        <Additional>
          <Subject>Location</Subject>
          <SubjectInfo>London, Uk</SubjectInfo>
          <Subject>Empoloyees</Subject>
          <SubjectInfo>Small company (2-9 people)</SubjectInfo>
          <Subject>Industry</Subject>
          <SubjectInfo>{projectinfo.category}</SubjectInfo>
          <Line />
          <Subject>Jobs Posted</Subject>
          <SubjectInfo>0 jobs</SubjectInfo>
          <Subject>Total Spent</Subject>
          <SubjectInfo>0 hires, 0 active</SubjectInfo>
          <Subject>$25.00 /hr avg hourly rate paid</Subject>
          <SubjectInfo>40 hours</SubjectInfo>
          <Subject>Member since</Subject>
          <SubjectInfo>{dayjs(projectinfo.postedAt).fromNow()}</SubjectInfo>
          <Line />
          <Subject>Job Links</Subject>
          <JobLinkInput
            placeholder='https://www.tskr.com/job/Food Delivery ...'
            readOnly
          />
          <Btn>Copy Links</Btn>
        </Additional>
      </ClientInfo>
    </Wrap>
  )
}

export default Pricebar
