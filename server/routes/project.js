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
} from '../controllers/project.js'

const router = express.Router()

router.post('/project', verifyToken, createProject)
router.get('/project/:id', verifyToken, getProjectById) //  Get a specific project by ID
router.get('/categories', getCategories) // this will fethch project categories
router.get('/options', getOptions) // this will fethh project options
router.get('/project/client/:clientId', verifyToken, getProjectsByClientId)
router.put('/project/:id', verifyToken, updateProject)
router.delete('/project/:id', verifyToken, deleteProject)
router.get('/project', verifyToken, listProjects)

export default router
