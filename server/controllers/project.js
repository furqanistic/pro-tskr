import Project from '../models/Project.js'

// 1. Create a new project
export const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body)
    await newProject.save()
    res.status(201).send(newProject)
  } catch (error) {
    res.status(400).send(error)
  }
}

// 2. Get a specific project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('client')
    if (!project) {
      return res.status(404).send({ message: 'Project not found' })
    }
    res.status(200).json(project)
  } catch (error) {
    res.status(500).send(error)
  }
}

// 3. Update a project
export const updateProject = async (req, res) => {
  try {
    // Create an object to hold only the fields you want to update
    const updateFields = {}

    // Add the fields you want to update to the updateFields object
    if (req.body.title) {
      updateFields.title = req.body.title
    }

    if (req.body.option) {
      updateFields.option = req.body.option
    }

    if (req.body.category) {
      updateFields.category = req.body.category
    }

    if (req.body.projectName) {
      updateFields.projectName = req.body.projectName
    }

    if (req.body.description) {
      updateFields.description = req.body.description
    }

    if (req.body.deliverables) {
      updateFields.deliverables = req.body.deliverables
    }

    if (req.body.type) {
      updateFields.type = req.body.type
    }

    if (req.body.proposals) {
      updateFields.proposals = req.body.proposals
    }

    if (req.body.files) {
      updateFields.files = req.body.files
    }

    // You can continue adding other fields here...

    // Update the project using only the specified fields
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).send({ message: 'Project not found' })
    }

    res.send(project)
  } catch (error) {
    res.status(400).send(error)
  }
}

// 4. Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).send({ message: 'Project not found' })
    }
    res.send(project)
  } catch (error) {
    res.status(500).send(error)
  }
}

// 5. List all projects
export const listProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate('client')
      .sort({ createdAt: -1 })
    res.send(projects)
  } catch (error) {
    res.status(500).send(error)
  }
}

// get all  projects by client id
export const getProjectsByClientId = async (req, res, next) => {
  try {
    const clientId = req.params.clientId // Assuming you're passing client ID as a route parameter

    const projects = await Project.find({ client: clientId })

    if (!projects.length) {
      return res
        .status(404)
        .json({ message: 'No projects found for the given client ID.' })
    }

    return res.status(200).json(projects)
  } catch (error) {
    next(error) // This will forward the error to your error-handling middleware
  }
}
// get project categories
export const getCategories = (req, res) => {
  try {
    const categories = Project.getCategories()
    res.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
}
// get project options
export const getOptions = (req, res) => {
  try {
    const option = Project.getOptions()
    res.json(option)
  } catch (error) {
    console.error('Error fetching options:', error)
    res.status(500).json({ error: 'Failed to fetch options' })
  }
}
