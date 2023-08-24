import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import ProjectsPage from './Dashboard/ProjectsPage'
import FinancesPage from './Dashboard/FinancesPage'
import EditProfile from './Dashboard/EditProfile'
import NewProject from './Dashboard/NewProject'
import Login from './Login'
import SignUp from './SignUp'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import Messages from './Dashboard/Messages'
import AvailableProjects from './Explore/AvailableProjects'
import ProposalDetails from './Explore/ProposalDetails'
import UpdateProject from './Dashboard/UpdateProject'
import SubmitProposal from './Explore/SubmitProposal'
import LoaderBasic from './LoaderBasic'

const AnimatedRoutes = () => {
  const location = useLocation()
  const { currentUser } = useSelector((state) => state.user)

  return (
    <AnimatePresence>
      {currentUser && (
        <Routes location={location} key={location.pathname}>
          <Route path='/'>
            <Route index element={<Dashboard />} />

            <Route path='projects'>
              <Route index element={<ProjectsPage />} />
              <Route path='post-project' element={<NewProject />} />
              <Route
                path='update-project/:projectID'
                element={<UpdateProject />}
              />
            </Route>
            <Route path='messages' element={<Messages />} />
            <Route path='finances' element={<FinancesPage />} />
            <Route path='edit' element={<EditProfile />} />

            <Route path='inbox' element={<Messages />} />
            <Route path='jobs'>
              <Route index element={<AvailableProjects />} />
              <Route path='details/:projectID'>
                <Route index element={<ProposalDetails />} />
                <Route path='submit/:projectID' element={<SubmitProposal />} />
              </Route>
            </Route>
            <Route path='*' element={<Dashboard />} />
          </Route>
        </Routes>
      )}
      {!currentUser && (
        <Routes location={location} key={location.pathname}>
          <Route path='/'>
            <Route index element={<Login />} />
            <Route path='register' element={<SignUp />} />
            <Route path='jobs'>
              <Route index element={<AvailableProjects />} />
              <Route path='details/:projectID'>
                <Route index element={<ProposalDetails />} />
                <Route path='submit' element={<SubmitProposal />} />
              </Route>
            </Route>
            <Route path='*' element={<SignUp />} />
          </Route>
        </Routes>
      )}
    </AnimatePresence>
  )
}

export default AnimatedRoutes
