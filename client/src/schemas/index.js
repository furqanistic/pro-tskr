import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
const nameRules = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/

// A list of some popular temporary email providers.
const bannedDomains = [
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'trashmail.com',
  'yopmail.com',
  'getnada.com',
  'mohmal.com',
  'throwawaymail.com',
  // ... you can extend this list as you discover more domains
]

export const basicSchema = yup.object().shape({
  fname: yup.string().required('Please enter your first name'),
  lname: yup.string().required('Please enter your last name'),
  email: yup
    .string()
    .required('Please enter an email address')
    .email('Please enter a valid email')
    .test(
      'banned-domain-check',
      'Temporary emails are not allowed',
      (value) => {
        if (!value) return true // If no email, the previous required rule will catch it.
        const domain = value.split('@')[1]
        return !bannedDomains.includes(domain)
      }
    ),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        'Please create a stronger password - a password must contain 1 upper case letter, 1 lower case letter, 1 numeric digit',
    })
    .required('Password is required'),
})

export const projectSchema = yup.object().shape({
  projectName: yup
    .string()
    .required('Project title is required')
    .min(5, 'Title should have at least 5 characters'),

  option: yup.string().required('Please select a category from the dropdown'),

  description: yup
    .string()
    .required('Project description is required')
    .min(20, 'Description should have at least 20 characters'),

  amount: yup
    .number()
    .required('Project budget is required')
    .min(1, 'Budget should be at least 1')
    .typeError('Budget must be a number'),

  deliverables: yup
    .string()
    .required('Expected deliverables are required')
    .min(10, 'Please provide more detailed deliverables'),
})

export const bidSchema = yup.object().shape({
  amount: yup
    .number()
    .required('Bid amount is required')
    .min(1, 'Amount should be at least 1')
    .typeError('Amount must be a number'),

  message: yup
    .string()
    .required('A message or description is required for your bid')
    .min(10, 'Your message should have at least 10 characters'),
  proposedDuration: yup
    .string()
    .required(
      'Please specify how long you propose to take to complete the project'
    )
    .min(3, 'Please provide a more detailed duration'),

  attachments: yup
    .array()
    .of(yup.string().url('Must be a valid URL'))
    .min(1, 'At least one attachment or link is required')
    .nullable(),
})
