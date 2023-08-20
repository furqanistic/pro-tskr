import React, { useState } from 'react'
import Topbar from '../components/Topbar'
import Dashboard from './Dashboard/Dashboard'
import { styled } from 'styled-components'
import Sidebar from '../components/Sidebar'
import { motion } from 'framer-motion'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`
const Direction = styled.div`
  display: flex;
`

const Left = styled(motion.div)`
  width: 250px;
  position: sticky;
`

const Right = styled.div`
  width: 100%;
  background-color: #f0efec;
`
const sidebarVariants = {
  open: {
    x: 0,
    width: '250px',
    flexGrow: 1,
    opacity: 1,
    transition: { duration: 0.2 },
  },
  closed: {
    x: '-250px',
    width: '0px',
    flexGrow: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <Wrap>
      <Topbar toggleSidebar={toggleSidebar} />
      <Direction>
        <Left
          initial='open'
          animate={isSidebarOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          expand={isSidebarOpen}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </Left>
        <Right>{children}</Right>
      </Direction>
    </Wrap>
  )
}

export default Layout
