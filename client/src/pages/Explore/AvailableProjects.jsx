import React, { useState } from 'react'
import Navbar from '../../components/Explore/Navbar'
import { styled } from 'styled-components'
import bgImg from '/Explore/bg.svg'
import SearchIconImg from '/Auth/find.svg'
import FilterBar from '../../components/Explore/FilterBar'
import DropIcon from '/Explore/drop.svg'
import DpIcon from '/Explore/dp.png'
import LocateIcon from '/Explore/locate.svg'
import ContractIcon from '/Explore/contract.svg'
import CalenderIcon from '/Explore/cal.svg'
import UpIcon from '/Explore/up.svg'
import { useQuery } from 'react-query'
import { axiosInstance } from '../../config'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import Footer from '../../components/Explore/Footer'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
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
  top: 20%;
  left: 10%;
`
const SearchBar = styled.div`
  width: 40%;
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.5rem;
  margin-top: 10px;
  border-radius: 4px;
`
const SearchInput = styled.input`
  all: unset;
  font-size: 1rem;
  height: 4rem;
  width: 60%;
`
const SearchBtn = styled.button`
  display: flex;
  width: 86px;
  height: 44px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 6px;
  background-color: #5bbb7b;
  color: white;
  border: none;
  position: absolute;
  right: 30px;
  font-weight: 600;
`
const SearchIcon = styled.img`
  width: 40px;
  padding: 10px;
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
`
const LayoutLeft = styled.div`
  height: 100%;
  min-width: 400px;
`
const LayoutRight = styled.div`
  min-width: 1000px;
  height: 100%;
`
const SideBar = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AvaliableInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
const Numb = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
`
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`

const DropdownLabel = styled.div`
  padding: 10px 15px;
  position: relative;
`

const DropdownOptions = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 150px;
  z-index: 1;
  text-align: right;
`

const Option = styled.div`
  padding: 10px 15px;
`
const OptionIcon = styled.img`
  width: 5px;
  margin-left: 5px;
  margin-bottom: 4px;
`
const ProposalWrap = styled.div`
  width: 100%;
`
const ProposalItem = styled.div`
  width: 100%;
  padding: 1rem;
  flex: 7;
  display: flex;
  border: 1px solid #e9e9e9;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ProposalImage = styled.img`
  width: 6rem;
  padding: 1rem;
  border-radius: 50%;
`
const Mid = styled.div`
  flex: 4;
`
const ProposalInfoWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 1rem;
`
const ProposalTitle = styled.p`
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
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
const ProposalDesc = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 300;
  line-height: 1.75rem;
  margin-top: 0.5rem;
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
const Right = styled.div`
  flex: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`
const PropsalStats = styled.div`
  display: flex;
  flex-direction: column;
`
const ProposalPrice = styled.p`
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const ProposalPriceType = styled.p`
  text-align: center;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem;
`
const SendBtn = styled.button`
  display: flex;
  padding: 0.6875rem 1.125rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: center;
  border-radius: 0.25rem;
  background: #f1fcfa;
  color: #5bbb7b;
  width: 80%;
  border: none;
  font-weight: 600;
  transition: all 0.2s ease;
  &:hover {
    background: #5bbb7b;
    color: #f1fcfa;
  }
`
const BtnIcon = styled.img`
  width: 1rem;
`
const Linker = styled(Link)`
  text-decoration: none;
`
const AvailableProjects = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Most Recent')
  const [projectsLength, setProjectsLength] = useState(0)
  const { currentUser } = useSelector((state) => state.user)

  const { data, status } = useQuery('projects', async () => {
    const res = await axiosInstance.get(`/upload/project/`)
    setProjectsLength(res.data.length)
    return res.data
  })

  if (status === 'loading') {
    return <Loader />
  }

  return (
    <>
      <AppContainer>
        <Navbar />
        <Header>
          <HeaderRoute>Home / Available Projects</HeaderRoute>
          <HeaderBlock>
            <HeaderImage src={bgImg} />
            <HeaderWrap>
              <Title>Available Projects</Title>
              <Description>
                All the Lorem Ipsum generators on the Internet tend to repeat.
              </Description>
              <SearchBar>
                <SearchIcon src={SearchIconImg} />
                <SearchInput placeholder='Project title,keywords' />
                <SearchBtn>Search</SearchBtn>
              </SearchBar>
            </HeaderWrap>
          </HeaderBlock>
        </Header>
        <PageLayout>
          <LayoutLeft>
            <SideBar>
              <FilterBar />
            </SideBar>
          </LayoutLeft>
          <LayoutRight>
            <AvaliableInfo>
              <Numb>{projectsLength} projects available</Numb>
              <DropdownContainer onClick={() => setIsOpen(!isOpen)}>
                <DropdownLabel>
                  Sort By : <b>{selectedOption}</b>
                  <OptionIcon src={DropIcon} />
                </DropdownLabel>
                <DropdownOptions isOpen={isOpen}>
                  {selectedOption !== 'Most Recent' && (
                    <Option onClick={() => setSelectedOption('Most Recent')}>
                      Most Recent
                    </Option>
                  )}
                  {selectedOption !== 'Popular' && (
                    <Option onClick={() => setSelectedOption('Popular')}>
                      Popular
                    </Option>
                  )}
                </DropdownOptions>
              </DropdownContainer>
            </AvaliableInfo>
            <ProposalWrap>
              {data.map((project) => (
                <ProposalItem>
                  <Left>
                    <ProposalImage src={DpIcon} />
                  </Left>
                  <Mid>
                    <ProposalInfoWrap>
                      <ProposalTitle>{project.projectName}</ProposalTitle>
                      <ProposalInfoWrapped>
                        <ProposalInfo>
                          <ProposalImg src={LocateIcon} />
                          <ProposalImgRight>London, Uk</ProposalImgRight>
                        </ProposalInfo>
                        <ProposalInfo>
                          <ProposalImg src={ContractIcon} />
                          <ProposalImgRight>
                            {dayjs(project.postedAt).fromNow()}
                          </ProposalImgRight>
                        </ProposalInfo>
                        <ProposalInfo>
                          <ProposalImg src={CalenderIcon} />
                          <ProposalImgRight>
                            {project.proposals} Proposals
                          </ProposalImgRight>
                        </ProposalInfo>
                      </ProposalInfoWrapped>
                      <ProposalDesc>{project.description}</ProposalDesc>
                      <TagsSet>
                        <ProposalTags>Figma</ProposalTags>
                        <ProposalTags>Sketch</ProposalTags>
                        <ProposalTags>HTML5</ProposalTags>
                      </TagsSet>
                    </ProposalInfoWrap>
                  </Mid>
                  <Right>
                    <PropsalStats>
                      <ProposalPrice>{project.amount}$</ProposalPrice>
                      <ProposalPriceType>{project.type}</ProposalPriceType>
                    </PropsalStats>
                    <Linker to={`details/${project._id}`}>
                      <SendBtn>
                        Send Proposal
                        <BtnIcon src={UpIcon} />
                      </SendBtn>
                    </Linker>
                  </Right>
                </ProposalItem>
              ))}
            </ProposalWrap>
          </LayoutRight>
        </PageLayout>
      </AppContainer>
      <Footer />
    </>
  )
}

export default AvailableProjects
