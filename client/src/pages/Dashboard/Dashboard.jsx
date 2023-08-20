import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import { styled } from 'styled-components'
import Layout from '../Layout'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <Layout>
      <p style={{ fontSize: '2rem', marginLeft: '20px', marginTop: '20px' }}>
        Welcome {currentUser.fname}
      </p>
    </Layout>
  )
}

export default Dashboard
