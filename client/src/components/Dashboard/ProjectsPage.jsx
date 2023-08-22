import React, { useEffect, useState } from 'react'
import Layout from '../../pages/Layout'
import styled from 'styled-components'
import DeleteIcon from '/Dashboard/delete 1.svg'
import EditIcon from '/Dashboard/pencil 1.svg'
import PlaceIcon from '/Dashboard/place.svg'
import CalenderIcon from '/Dashboard/30-days.svg'
import ProposalsIcon from '/Dashboard/contract.svg'
import PrevIcon from '/Dashboard/prev 1.svg'
import NextIcon from '/Dashboard/next 1.svg'
import { Link, useNavigate } from 'react-router-dom'
import { QueryClient, useMutation, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import Loader from '../../pages/Loader'
import { axiosInstance } from '../../config'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const Wrap = styled.div`
  padding: 2rem 4rem;
`

const PageHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 100px;
  padding: 1rem;
`

const HeadWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const HeadButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 214px;
  height: 51px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #5bbb7b;
  box-shadow: 0px 5px 20px 0px rgba(91, 187, 123, 0.15);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
`

const Title = styled.p`
  color: #222;
  font-size: 32px;
  font-weight: 700;
`

const Desc = styled.p`
  color: #222;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
`

const BodyWrap = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  padding: 1rem;
`

const CatBar = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem 0;
  justify-content: flex-start;
`

const CatName = styled.p`
  position: relative;
  color: ${(props) => (props.$active ? '#5BBB7B' : '#6b7177')};
  font-size: 17px;
  font-weight: 500;
  line-height: 28px;
  margin-right: 2rem;
  cursor: pointer;
`

const FullLine = styled.hr`
  height: 1px;
  background-color: #e9e9e9;
  width: 100%;
  position: relative;
  z-index: 0;
  border: none;
`

const ActiveLine = styled.hr`
  position: absolute;
  left: ${(props) => props.$left || '0'}px;
  width: ${(props) => props.$width || '0'}px;
  height: 3px;
  background-color: #5bbb7b;
  transition: all 0.3s;
  z-index: 1;
  border: none;
`
const ContentWrap = styled.div`
  display: flex;
  width: 100%;
  flex: 4;
  flex-wrap: wrap;
  padding: 1.5rem 1rem;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  flex: 1;
  border: 1px solid #d9d9d9;
  border-radius: 25px;
  margin: 1rem;
  min-width: 300px;
  max-width: 300px;
  min-height: 300px;
  position: relative;
`
const ContentCorner = styled.div`
  width: 96px;
  height: 50px;
  position: absolute;
  top: -3px;
  right: -1px;
  border-top: 5px solid white;
  border-right: 5px solid white;
  border-bottom: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  border-radius: 5px 21px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  padding-left: 30px;
`
const Button = styled.img`
  cursor: pointer;
  width: 35px;
  height: 35px;
  padding: 0.5rem;
  border-radius: 6px;
  margin-right: 5px;
  margin-bottom: 10px;
  background-color: ${(props) => props.bg};
`
const ProjectWrap = styled.div`
  margin-top: 20%;
  width: 100%;
  padding: 1rem 2rem;
`
const ProjectCat = styled.p`
  color: #6b7177;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
`
const ProLine = styled.hr`
  height: 2px;
  color: #e9e9e9;
`
const ProName = styled.p`
  color: #222;
  font-size: 19px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
`
const DetailsBundle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex: 2;
  margin-top: 5px;
`
const BundleWrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`
const BundleImage = styled.img`
  width: 14px;
  margin-right: 3px;
`
const BundleText = styled.p`
  color: #6b7177;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
`
const ProjPrice = styled.div`
  width: 100%;
  margin-top: 20px;
`
const ProjNum = styled.p`
  color: #58b276;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const PaginationSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PageBtns = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PageNum = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  margin-right: 5px;
  background-color: ${({ selected }) => (selected ? '#5BBB7B' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
`

const PaginationIcon = styled.img`
  width: 14px;
`
const NothingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20%;
`
const NothingText = styled.p`
  font-size: 2rem;
  font-weight: 800;
`

const Linker = styled(Link)`
  text-decoration: none;
`
const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('Active Projects')
  const [lineStyles, setLineStyles] = useState({})
  const [projects, setProjects] = useState([])
  const categoryRefs = {}
  const [currentPage, setCurrentPage] = useState(1) // assuming 1 as the starting page
  const { currentUser } = useSelector((state) => state.user)
  // Handle side icon click
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
    if (currentPage === 5) {
      setCurrentPage(1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      // To ensure it doesn't go below the minimum page number
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  useEffect(() => {
    if (categoryRefs['Active Projects']) {
      const rect = categoryRefs['Active Projects'].getBoundingClientRect()
      setLineStyles({
        left: rect.left,
        width: rect.width,
      })
    }
  }, [])
  // getting projects from database
  const { data, error, status, refetch } = useQuery(
    'user-projects',
    async () => {
      const res = await axiosInstance.get(
        `/upload/project/client/${currentUser._id}`
      )
      return res.data
    }
  )

  // it will delete a specific item
  const handleDelete = (projectId) => {
    // Make a DELETE request to the backend to delete the project
    axiosInstance
      .delete(`/upload/project/${projectId}`)
      .then(() => {
        // Update the projects state after successful deletion
        setProjects(projects.filter((project) => project._id !== projectId))
        refetch()
      })
      .catch((error) => console.error(error))
  }

  if (status === 'loading') {
    return <Loader />
  }

  const categories = [
    'Active Projects',
    'Draft Projects',
    'Expired Projects',
    'Completed Projects',
    'Canceled Projects',
  ]

  const handleCategoryClick = (category) => {
    setActiveCategory(category)

    const rect = categoryRefs[category].getBoundingClientRect()
    setLineStyles({
      left: rect.left,
      width: rect.width,
    })
  }
  return (
    <Layout>
      <Wrap>
        <PageHead>
          <HeadWrap>
            <Title>My Projects</Title>
            <Desc>These are the projects you’ve posted on Tskr.</Desc>
          </HeadWrap>
          <Link to='post-project' style={{ textDecoration: 'none' }}>
            <HeadButton>Add a New Project</HeadButton>
          </Link>
        </PageHead>
        {error && (
          <BodyWrap style={{ minHeight: '900px' }}>
            <NothingDiv>
              <NothingText>Nothing Posted Yet</NothingText>
              <Link to='post-project' style={{ textDecoration: 'none' }}>
                <HeadButton>Add a New Project</HeadButton>
              </Link>
            </NothingDiv>
          </BodyWrap>
        )}
        {data && (
          <BodyWrap>
            <CatBar>
              {categories.map((category) => (
                <CatName
                  key={category}
                  $active={activeCategory === category}
                  onClick={() => handleCategoryClick(category)}
                  ref={(el) => {
                    categoryRefs[category] = el
                  }}
                >
                  {category}
                </CatName>
              ))}
            </CatBar>
            <FullLine />
            {activeCategory && (
              <ActiveLine $left={lineStyles.left} $width={lineStyles.width} />
            )}
            <ContentWrap>
              {data.map((project) => (
                <Content key={project._id}>
                  <ContentCorner>
                    <Linker to={`update-project/${project._id}`}>
                      <Button src={EditIcon} bg='#EAF6EE' />
                    </Linker>
                    <Button
                      src={DeleteIcon}
                      bg='#FCEDED'
                      onClick={() => handleDelete(project._id)}
                    />
                  </ContentCorner>
                  <ProjectWrap>
                    <ProjectCat>{project.category}</ProjectCat>
                    <ProLine />
                    <ProName>{project.projectName}</ProName>
                    <DetailsBundle>
                      <BundleWrap>
                        <BundleImage src={PlaceIcon} />
                        <BundleText>London, Uk</BundleText>
                      </BundleWrap>
                      <BundleWrap>
                        <BundleImage src={CalenderIcon} />
                        <BundleText>
                          {dayjs(project.postedAt).fromNow()}
                        </BundleText>
                      </BundleWrap>
                    </DetailsBundle>
                    <BundleWrap>
                      <BundleImage src={ProposalsIcon} />
                      <BundleText style={{ color: '#5BBB7B' }}>
                        {project.proposals} Proposals
                      </BundleText>
                    </BundleWrap>
                    <ProjPrice>
                      <ProjNum>
                        ${project.amount}/{project.type}
                      </ProjNum>
                    </ProjPrice>
                  </ProjectWrap>
                </Content>
              ))}
            </ContentWrap>
            <PaginationSection>
              <PageBtns>
                <PageNum
                  style={{ border: '1px solid black' }}
                  onClick={handlePrevPage}
                >
                  <PaginationIcon src={PrevIcon} />
                </PageNum>
                {[1, 2, 3, 4, 5].map((num) => (
                  <PageNum
                    key={num}
                    selected={num === currentPage}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </PageNum>
                ))}

                <PageNum>...</PageNum>
                <PageNum>20</PageNum>
                <PageNum
                  style={{ border: '1px solid black' }}
                  onClick={handleNextPage}
                >
                  <PaginationIcon src={NextIcon} />
                </PageNum>
              </PageBtns>
            </PaginationSection>
          </BodyWrap>
        )}
      </Wrap>
    </Layout>
  )
}

export default ProjectsPage
