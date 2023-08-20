import React from 'react'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import HomeIcon from '/home.svg'
import DocumentIcon from '/document 2.svg'
import NotificationIcon from '/chat 1.svg'
import DollarIcon from '/dollar 1.svg'
import ProfileIcon from '/photo 1.svg'
import LogoutIcon from '/logout 1.svg'
import { logout } from '../redux/userSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const SideBarWrap = styled(motion.div)`
  transition: 0.1s;
  display: flex;
  height: 100vh;

  top: 0;
  min-width: 250px;
`

const LeftWrap = styled.div`
  width: 100%;
  padding: 1rem 1rem 0 0;
`
const SectionWrap = styled.div`
  margin-bottom: 2rem;
`
const Company = styled.p`
  font-size: 1rem;
  color: #6b7177;
  font-weight: 400;
  margin-bottom: 20px;
  padding-left: 1.5rem;
`
const CategoriesSet = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 1.5rem;
  color: #222;
  border-radius: 0 5px 5px 0;
  &:hover {
    background-color: black;
    color: #f1fcfa;
  }
`
const Icon = styled.img`
  width: 20px;
`
const CatName = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 0.7rem;
  font-weight: 500;
`

const sidebarVariants = {
  open: { x: 0, transition: { duration: 0.2 } },
  closed: { x: '-100%', transition: { duration: 0.2 } },
}

const Sidebar = (props) => {
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      <SideBarWrap
        initial='closed'
        animate={props.isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        <LeftWrap>
          <SectionWrap>
            <Company>Tskr</Company>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <CategoriesSet>
                <Icon src={HomeIcon} />
                <CatName>Dashboard</CatName>
              </CategoriesSet>
            </Link>
            <Link to='/projects' style={{ textDecoration: 'none' }}>
              <CategoriesSet>
                <Icon src={DocumentIcon} />
                <CatName>My Projects</CatName>
              </CategoriesSet>
            </Link>
            <Link to='/messages' style={{ textDecoration: 'none' }}>
              <CategoriesSet>
                <Icon src={NotificationIcon} />
                <CatName>Messages</CatName>
              </CategoriesSet>
            </Link>
          </SectionWrap>
          <SectionWrap>
            <Company>Account</Company>
            <Link to='/finances' style={{ textDecoration: 'none' }}>
              <CategoriesSet>
                <Icon src={DollarIcon} />
                <CatName>Finances</CatName>
              </CategoriesSet>
            </Link>
            <Link to='/edit' style={{ textDecoration: 'none' }}>
              <CategoriesSet>
                <Icon src={ProfileIcon} />
                <CatName>Edit Profile</CatName>
              </CategoriesSet>
            </Link>

            <CategoriesSet onClick={handleClick}>
              <Icon src={LogoutIcon} />
              <CatName>Logout</CatName>
            </CategoriesSet>
          </SectionWrap>
        </LeftWrap>
      </SideBarWrap>
    </>
  )
}

export default Sidebar
