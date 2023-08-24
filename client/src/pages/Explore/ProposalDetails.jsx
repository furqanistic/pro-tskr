import React, { useState } from 'react'
import Navbar from '../../components/Explore/Navbar'
import { styled } from 'styled-components'
import bgImg from '/Explore/bg-2.svg'
import Loader from '../Loader'
import CopyIcon from '/Explore/copy.svg'
import LocateIcon from '/Explore/locate.svg'
import ContractIcon from '/Explore/contract.svg'
import ProjectIcon from '/Explore/project.svg'
import LanguageIcon from '/Explore/langauge.svg'
import CalenderIcon from '/Explore/cal.svg'
import RankIcon from '/Explore/rank.svg'
import LikeIcon from '/Explore/like.svg'
import DurationIcon from '/Explore/duration.svg'
import SellerIcon from '/Explore/seller.svg'
import { useQuery } from 'react-query'
import { axiosInstance } from '../../config'
import Footer from '../../components/Explore/Footer'
import { Link, useParams } from 'react-router-dom'
import Pricebar from '../../components/Explore/Pricebar'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Rating from '../../components/Explore/Rating'
import RatingComments from '../../components/Explore/RatingComments'
dayjs.extend(relativeTime)
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const Header = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
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
  margin-left: 10%;
  margin-bottom: 1.5rem;
`
const HeaderImage = styled.img`
  height: 100%;
  background-color: #ffede8;
  background-repeat: no-repeat;
  width: 100%;
`
const HeaderBlock = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`
const HeaderWrap = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
`

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
`
const Description = styled.div`
  font-size: 15px;
  font-weight: 400;
  line-height: 28px; /* 186.667% */
`
const PageLayout = styled.div`
  display: flex;
  flex: 1; /* Allow this to grow and take up any additional space */
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  align-self: center;
  position: relative;
  min-height: 100vh;
`
const LayoutRight = styled.div`
  min-height: 100vh;
  min-width: 400px;
  position: absolute;
  top: -12rem;
  right: 0;
`
const LayoutLeft = styled.div`
  min-width: 1000px;
  min-height: 100vh;
`
const SideBar = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const ProposalInfo = styled.div`
  display: flex;
  margin-right: 1rem;
`
const ProposalInfoWrapped = styled.div`
  display: flex;
  margin-top: 0.5rem;
  align-items: center;
`
const ProposalImg = styled.img`
  width: 12px;
`
const ProposalImgRight = styled.p`
  color: #6b7177;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
  width: 100%;
  margin-left: 0.2rem;
`
const ProjectInfo = styled.div`
  margin-top: 1rem;

  min-width: 900px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 2rem;
`
const ProjectInfoItem = styled.div`
  min-width: 300px;
  display: flex;
`
const ItemLeft = styled.div`
  display: flex;
`
const LeftImg = styled.img`
  width: 3.6rem;
`
const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`
const ItemTitle = styled.p`
  font-family: DM Sans;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
`
const ItemCompany = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
`
const Line = styled.hr`
  width: 67%;
  height: 2px;
  background-color: #e9e9e9;
  margin-top: 3rem;
  border: none;
`
const ProjectDescriptionTitle = styled.p`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 15px;
`
const ProjectDescription = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 186.667% */
  width: 65%;
  margin-top: 15px;
`

const TagsSet = styled.div`
  display: flex;
`
const ProposalTags = styled.div`
  display: flex;
  padding: 0rem 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 3.75rem;
  background: #ffede8;
  width: 4rem;
  padding: 0.5rem;
  font-size: 0.85rem;
  margin-right: 1rem;
  margin-top: 1rem;
`
const AttachmentBox = styled.div`
  display: flex;
  width: 13.125rem;
  height: 5rem;
  padding: 1rem;
  align-items: flex-end;
  border-radius: 0.25rem;
  background: rgba(91, 187, 123, 0.1);
  position: relative;
  margin-top: 1rem;
`
const AttachmentIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  position: absolute;
  bottom: 10px;
  right: 10px;
`
const AttachmentName = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
  color: rgb(8, 81, 32);
`
const PropsBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`
const ProposalData = styled.p`
  color: #6b7177;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem; /* 186.667% */
`
const ProposalDataMore = styled.p`
  /* 15/Medium */
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
  margin-left: 5px;
`
const SeeMoreBtn = styled.button`
  border: none;
  cursor: pointer;
  background-color: #f1fcfa;
  display: flex;
  width: 12.5625rem;
  padding: 0.6875rem 1.125rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: #5bbb7b;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem; /* 186.667% */
  margin-bottom: 5rem;
`
const ProposalDetails = () => {
  const { projectID } = useParams()

  const { data, status } = useQuery('project-details', async () => {
    const res = await axiosInstance.get(`/upload/project/${projectID}`)

    return res.data
  })

  if (status === 'loading') {
    return <Loader />
  }

  return (
    <>
      <Navbar />

      <AppContainer>
        <Header>
          <HeaderRoute>
            Home / Available Projects / {data.projectName}
          </HeaderRoute>
          <HeaderBlock>
            <HeaderImage src={bgImg} />

            <HeaderWrap>
              <Title>{data.projectName}</Title>
              <ProposalInfoWrapped>
                <ProposalInfo>
                  <ProposalImg src={LocateIcon} />
                  <ProposalImgRight>London,UK</ProposalImgRight>
                </ProposalInfo>
                <ProposalInfo>
                  <ProposalImg src={ContractIcon} />
                  <ProposalImgRight>
                    {data.proposals} Proposals
                  </ProposalImgRight>
                </ProposalInfo>
                <ProposalInfo>
                  <ProposalImg src={CalenderIcon} />
                  <ProposalImgRight>
                    {dayjs(data.postedAt).fromNow()}
                  </ProposalImgRight>
                </ProposalInfo>
              </ProposalInfoWrapped>
            </HeaderWrap>
          </HeaderBlock>
        </Header>
        <PageLayout>
          <LayoutLeft>
            <ProjectInfo>
              <ProjectInfoItem>
                <ItemLeft>
                  <LeftImg src={SellerIcon} />
                </ItemLeft>
                <ItemRight>
                  <ItemTitle>Seller Type</ItemTitle>
                  <ItemCompany>Company</ItemCompany>
                </ItemRight>
              </ProjectInfoItem>
              <ProjectInfoItem>
                <ItemLeft>
                  <LeftImg src={ProjectIcon} />
                </ItemLeft>
                <ItemRight>
                  <ItemTitle>Project Type</ItemTitle>
                  <ItemCompany>{data.type}</ItemCompany>
                </ItemRight>
              </ProjectInfoItem>
              <ProjectInfoItem>
                <ItemLeft>
                  <LeftImg src={DurationIcon} />
                </ItemLeft>
                <ItemRight>
                  <ItemTitle>Project Duration</ItemTitle>
                  <ItemCompany>10-15 days</ItemCompany>
                </ItemRight>
              </ProjectInfoItem>
            </ProjectInfo>
            <ProjectInfo>
              <ProjectInfoItem>
                <ItemLeft>
                  <LeftImg src={LikeIcon} />
                </ItemLeft>
                <ItemRight>
                  <ItemTitle>Project Level</ItemTitle>
                  <ItemCompany>{data.option}</ItemCompany>
                </ItemRight>
              </ProjectInfoItem>
              <ProjectInfoItem>
                <ItemLeft>
                  <LeftImg src={LanguageIcon} />
                </ItemLeft>
                <ItemRight>
                  <ItemTitle>Languages</ItemTitle>
                  <ItemCompany>English</ItemCompany>
                </ItemRight>
              </ProjectInfoItem>
              <ProjectInfoItem>
                <ItemLeft>
                  <LeftImg src={RankIcon} />
                </ItemLeft>
                <ItemRight>
                  <ItemTitle>English Level</ItemTitle>
                  <ItemCompany>Professional</ItemCompany>
                </ItemRight>
              </ProjectInfoItem>
            </ProjectInfo>
            <Line />
            <ProjectDescriptionTitle>
              Project Description
            </ProjectDescriptionTitle>
            <ProjectDescription>{data.description}</ProjectDescription>
            <Line />
            <ProjectDescriptionTitle>
              Skills & Expertise
            </ProjectDescriptionTitle>
            <TagsSet>
              <ProposalTags>Figma</ProposalTags>
              <ProposalTags>Sketch</ProposalTags>
              <ProposalTags>HTML5</ProposalTags>
            </TagsSet>
            <Line />
            <ProjectDescriptionTitle>Attachments</ProjectDescriptionTitle>
            <AttachmentBox>
              <AttachmentName>File Name</AttachmentName>
              <AttachmentIcon src={CopyIcon} />
            </AttachmentBox>
            <AttachmentBox>
              <AttachmentName>File Name</AttachmentName>
              <AttachmentIcon src={CopyIcon} />
            </AttachmentBox>
            <Line />
            <ProjectDescriptionTitle>
              Activity On This Job
            </ProjectDescriptionTitle>
            <PropsBox>
              <ProposalData>Proposal: </ProposalData>
              <ProposalDataMore>Less than 5</ProposalDataMore>
            </PropsBox>
            <PropsBox>
              <ProposalData> Last viewed by client: </ProposalData>
              <ProposalDataMore> Unknown </ProposalDataMore>
            </PropsBox>

            <PropsBox>
              <ProposalData>Interviewing: </ProposalData>
              <ProposalDataMore>0</ProposalDataMore>
            </PropsBox>
            <PropsBox>
              <ProposalData>Interview Sent: </ProposalData>
              <ProposalDataMore>0</ProposalDataMore>
            </PropsBox>
            <PropsBox>
              <ProposalData>Unanswered invites: </ProposalData>
              <ProposalDataMore>0</ProposalDataMore>
            </PropsBox>
            <Line />
            <ProjectDescriptionTitle>
              Client's Recent History (0)
            </ProjectDescriptionTitle>
            <Rating />
            <RatingComments />
            <RatingComments />
            <RatingComments />
            <RatingComments />
            <SeeMoreBtn>See More</SeeMoreBtn>
          </LayoutLeft>
          <LayoutRight>
            <SideBar>
              <Pricebar userInfo={data.client} projectinfo={data} />
            </SideBar>
          </LayoutRight>
        </PageLayout>
      </AppContainer>
      <Footer />
    </>
  )
}

export default ProposalDetails
