import Conversation from '../models/Conversation.js'
import Message from '../models/Message.js'

// 1. Create a new project
export const createConversation = async (req, res) => {
  try {
    const newProject = new Project(req.body)
    await newProject.save()
    res.status(201).send(newProject)
  } catch (error) {
    res.status(400).send(error)
  }
}
