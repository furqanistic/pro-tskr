import express from 'express'
import { verifyToken } from '../verifyToken.js'
import {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  listProjects,
  getProjectsByClientId,
  getCategories,
  getOptions,
  submitProposal,
} from '../controllers/project.js'

const router = express.Router()

router.post('/project', verifyToken, createProject)
router.post('/submit', verifyToken, submitProposal) // used to submit propsal
router.get('/project/:id', verifyToken, getProjectById) //  Get a specific project by ID
router.get('/categories', getCategories) // this will fethch project categories
router.get('/options', getOptions) // this will fethh project options
router.get('/project/client/:clientId', verifyToken, getProjectsByClientId)
router.get('/project', verifyToken, listProjects)
router.put('/project/:id', verifyToken, updateProject)
router.delete('/project/:id', verifyToken, deleteProject)

export default router
