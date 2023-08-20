import React, { useEffect, useState } from 'react'
import Layout from '../../pages/Layout'
import styled from 'styled-components'
import CaseIcon from '/Dashboard/Frame.svg'
import PageIcon from '/Dashboard/Brief.svg'
import DollarIcon from '/Dashboard/Dollar.svg'
import DollarGreenIcon from '/Dashboard/Dollargreen.svg'
import DollarGIcon from '/Dashboard/dollarg.svg'
import PencilBIcon from '/Dashboard/pencildark.svg'
import CopyIcon from '/Explore/copy.svg'
import Loader from '../../pages/Loader'
import { axiosInstance } from '../../config'
import { useQuery } from 'react-query'
import { basicSchema, projectSchema } from '../../schemas'
import { useFormik, useFormikContext } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
  min-height: 900px;
  width: 100%;
  background-color: white;
  padding: 1rem;
  padding-bottom: 5rem;
  position: relative;
`
const BodyHead = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`
const StepsWrap = styled.div`
  display: flex;
  margin-right: 5rem;
`
const StepImg = styled.img`
  width: 80px;
  background-color: ${(props) => props.bg};
  padding: 1rem;
  border-radius: 6px;
`
const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`
const StepName = styled.p`
  color: #222;
  font-size: 17px;
  font-weight: 500;
  line-height: 28px;
`
const StepDesc = styled.p`
  color: #a7a7a7;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
`
const BudgetDetails = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-left: 30px;
  margin-bottom: 2rem;
`
const BarName = styled.p`
  color: #222;
  font-size: 15px;
  font-weight: 500;
  line-height: 28px;
  margin-bottom: 5px;
`
const AmountBar = styled.div`
  width: 100%;
  display: flex;
`
const InputImage = styled.img`
  width: 42px;
  background-color: #eaf6ee;
  padding: 12px 14px;
`
const InputAmount = styled.input`
  width: 90%;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  background-color: rgba(255, 255, 255, 0);
  padding-left: 15px;
  outline: none;
  font-size: 1rem;
  padding: 1rem;
`
const TextBox = styled.textarea`
  width: 93%;
  font-size: 1rem;
  height: 300px;
  outline: none;
  padding: 1rem;
  resize: none;
  border: 1px solid #eaeaea;
`
const ButtonSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translate(-50%, -50%);
`
const Butn = styled.button`
  display: flex;
  /* width: 222.337px;
  height: 52.795px; */
  padding: 11.387px 73.766px 12.422px 73.766px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 14px;
  border-radius: 4px;
  background-color: ${(props) => props.bg};
  border: none;
  color: ${(props) => props.dg};
  box-shadow: 0px 5px 20px 0px rgba(91, 187, 123, 0.15);
  margin-right: 10px;
`
const PageTwoBars = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`
const AttachmentBox = styled.div`
  display: flex;
  width: 13.125rem;
  height: 5rem;
  padding: 1rem;
  align-items: flex-end;
  border-radius: 0.25rem;
  background: rgba(91, 187, 123, 0.1);
  position: relative;
  margin-top: 1rem;
`
const AttachmentIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  position: absolute;
  bottom: 10px;
  right: 10px;
`
const AttachmentName = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
  color: rgb(8, 81, 32);
`
const UploadMore = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13.125rem;
  height: 5rem;
  padding: 1rem;
  border-radius: 0.25rem;
  background: #ffede8;
  margin-top: 1rem;
  border: 1px dashed #1f4b3f;
  color: #1f4b3f;
  text-align: center;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem; /* 186.667% */
  margin-left: 2rem;
  outline: none;
  position: relative;
`
const FilesWrap = styled.div`
  display: flex;
  width: 100%;
`
const FileInput = styled.input.attrs({ type: 'file' })`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`
const RemiderText = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 186.667% */
  margin-left: 2rem;
  margin-bottom: 10rem;
`
const SelectCat = styled.select`
  width: 90%;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  background-color: rgba(255, 255, 255, 0);
  padding-left: 15px;
  outline: none;
  font-size: 1rem;

  padding: 1rem;
`
const SelectOpt = styled.option`
  width: 100%;
`
const ErrMsg = styled.p`
  font-size: 0.8rem;
  color: red;
  margin-top: 0.3rem;
  text-align: start;
`
const PostProject = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [showPageOne, setshowPageOne] = useState(true)
  const [showPageTwo, setshowPageTwo] = useState(false)
  const [showPageThree, setshowPageThree] = useState(false)
  const [cvalues, setCvalues] = useState()
  const navigate = useNavigate()
  const MainPage = () => {
    setshowPageOne(true)
    setshowPageTwo(false)
    setshowPageThree(false)
  }
  const NextPage = () => {
    setshowPageOne(false)
    setshowPageTwo(true)
    setshowPageThree(false)
  }
  const LastPage = () => {
    setshowPageOne(false)
    setshowPageTwo(false)
    setshowPageThree(true)
  }

  const handleProject = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance.post('upload/project', {
        projectName: values.projectName,
        amount: values.amount,
        description: values.description,
        client: currentUser._id,
        deliverables: values.deliverables,
        option: values.option,
        category: values.category,
      })
      navigate('/projects')
    } catch (err) {
      console.log(err)
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        projectName: '',
        amount: '',
        description: '',
        deliverables: '',
        client: '',
        option: '',
        category: '',
      },
      validationSchema: projectSchema,
      handleProject,
    })

  const { data, status } = useQuery('post-project', async () => {
    const res = await axiosInstance.get(`/upload/categories`)
    return res.data
  })
  if (status === 'loading') {
    return <Loader />
  }

  const scopsCats = ['Easy', 'Medium', 'Hard']
  const categories = [
    'Web & App design',
    'Content Writing',
    'Digital Marketing',
    'Software Development',
    'Graphics & Design',
    'IT & Networking',
    'Data Science & Analytics',
    'Engineering & Architecture',
    'Admin Support',
    'Customer Service',
    'Sales & Marketing',
    'Accounting & Consulting',
    'Translation',
    'Video & Animation',
    'Legal',
  ]

  return (
    <Layout>
      <Wrap>
        <form onSubmit={handleSubmit}>
          <PageHead>
            <HeadWrap>
              <Title>Post a New Project</Title>
              <Desc>Post a project for freelancers to apply to help with.</Desc>
            </HeadWrap>
            <HeadButton>Post a New Project</HeadButton>
          </PageHead>

          {showPageOne && !showPageTwo && !showPageThree && (
            <BodyWrap>
              <BodyHead>
                <StepsWrap>
                  <StepImg src={CaseIcon} bg='#222222' />
                  <StepInfo>
                    <StepName>Project Type</StepName>
                    <StepDesc>Add Details here</StepDesc>
                  </StepInfo>
                </StepsWrap>
                <StepsWrap>
                  <StepImg src={DollarGIcon} bg='#EAF6EE' />
                  <StepInfo>
                    <StepName>Project Type</StepName>
                    <StepDesc>Add Details here</StepDesc>
                  </StepInfo>
                </StepsWrap>
                <StepsWrap>
                  <StepImg src={PageIcon} bg='#EAF6EE' />
                  <StepInfo>
                    <StepName>Project Type</StepName>
                    <StepDesc>Add Details here</StepDesc>
                  </StepInfo>
                </StepsWrap>
              </BodyHead>
              <PageTwoBars>
                <BudgetDetails>
                  <BarName>Project Title</BarName>
                  <AmountBar>
                    <InputAmount
                      value={values.projectName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id='projectName'
                      placeholder='Enter Project Name...'
                      type='text'
                    />
                  </AmountBar>
                  {errors.projectName && touched.projectName && (
                    <ErrMsg>{errors.projectName}</ErrMsg>
                  )}
                </BudgetDetails>
                <BudgetDetails>
                  <BarName>Project Scope</BarName>
                  <SelectCat
                    value={values.option}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='option'
                    name='option'
                  >
                    {scopsCats.map((category) => (
                      <SelectOpt key={category} value={category}>
                        {category}
                      </SelectOpt>
                    ))}
                  </SelectCat>
                  {errors.option && touched.option && (
                    <ErrMsg>{errors.option}</ErrMsg>
                  )}
                </BudgetDetails>
              </PageTwoBars>
              <BudgetDetails>
                <BarName>Project Description</BarName>
                <AmountBar>
                  <TextBox
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='description'
                    placeholder='Enter Description...'
                    type='text'
                  />
                </AmountBar>
                {errors.description && touched.description && (
                  <ErrMsg>{errors.description}</ErrMsg>
                )}
              </BudgetDetails>
              <ButtonSet>
                <Butn bg='#EAF6EE' dg='#2DC66A'>
                  Previous
                </Butn>
                <Butn bg='#2DC66A' dg='#EAF6EE' onClick={NextPage}>
                  Next Step
                </Butn>
              </ButtonSet>
            </BodyWrap>
          )}
          {!showPageOne && showPageTwo && !showPageThree && (
            <BodyWrap>
              <BodyHead>
                <StepsWrap>
                  <StepImg src={CaseIcon} bg='#5BBB7B' />
                  <StepInfo>
                    <StepName>Project Type</StepName>
                    <StepDesc>Add Details here</StepDesc>
                  </StepInfo>
                </StepsWrap>
                <StepsWrap>
                  <StepImg src={DollarIcon} bg='#222222' />
                  <StepInfo>
                    <StepName>Project Type</StepName>
                    <StepDesc>Add Details here</StepDesc>
                  </StepInfo>
                </StepsWrap>
                <StepsWrap>
                  <StepImg src={PageIcon} bg='#EAF6EE' />
                  <StepInfo>
                    <StepName>Project Type</StepName>
                    <StepDesc>Add Details here</StepDesc>
                  </StepInfo>
                </StepsWrap>
              </BodyHead>
              <PageTwoBars>
                <BudgetDetails>
                  <BarName>Project Budget</BarName>
                  <AmountBar>
                    <InputImage src={DollarGreenIcon} />
                    <InputAmount
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id='amount'
                      placeholder='Enter Amount...'
                      type='number'
                    />
                  </AmountBar>
                  {errors.amount && touched.amount && (
                    <ErrMsg>{errors.amount}</ErrMsg>
                  )}
                </BudgetDetails>
                <BudgetDetails>
                  <BarName>Project Scope</BarName>
                  <SelectCat
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='category'
                    name='category'
                  >
                    {categories.map((category) => (
                      <SelectOpt key={category} value={category}>
                        {category}
                      </SelectOpt>
                    ))}
                  </SelectCat>
                  {errors.option && touched.option && (
                    <ErrMsg>{errors.option}</ErrMsg>
                  )}
                </BudgetDetails>
              </PageTwoBars>
              <BudgetDetails>
                <BarName>Expected Deliverables</BarName>
                <AmountBar>
                  <TextBox
                    value={values.deliverables}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='deliverables'
                    placeholder='Enter Expected Deliverables...'
                    type='text'
                  />
                </AmountBar>
                {errors.deliverables && touched.deliverables && (
                  <ErrMsg>{errors.deliverables}</ErrMsg>
                )}
              </BudgetDetails>
              <ButtonSet>
                <Butn bg='#EAF6EE' dg='#2DC66A' onClick={MainPage}>
                  Previous
                </Butn>
                <Butn bg='#2DC66A' dg='#EAF6EE' onClick={LastPage}>
                  Next Step
                </Butn>
              </ButtonSet>
            </BodyWrap>
          )}
          {!showPageOne && !showPageTwo && showPageThree && (
            <BodyWrap>
              <BodyHead>
                <StepsWrap>
                  <StepImg src={CaseIcon} bg='#5BBB7B' />
                  <StepInfo>
                    <StepName>Project Type</StepName>
                    <StepDesc>Add Details here</StepDesc>
                  </StepInfo>
                </StepsWrap>
                <StepsWrap>
                  <StepImg src={DollarIcon} bg='#5BBB7B' />
                  <StepInfo>
                    <StepName>Project Type</StepName>
                    <StepDesc>Add Details here</StepDesc>
                  </StepInfo>
                </StepsWrap>
                <StepsWrap>
                  <StepImg src={PencilBIcon} bg='#222222' />
                  <StepInfo>
                    <StepName>Project Type</StepName>
                    <StepDesc>Add Details here</StepDesc>
                  </StepInfo>
                </StepsWrap>
              </BodyHead>
              <BudgetDetails>
                <BarName>Upload Attachments</BarName>
                <FilesWrap>
                  <AttachmentBox>
                    <AttachmentName>File Name</AttachmentName>
                    <AttachmentIcon src={CopyIcon} />
                  </AttachmentBox>
                  <UploadMore>
                    Upload More <FileInput placeholder='Upload Files' />
                  </UploadMore>
                </FilesWrap>
              </BudgetDetails>

              <RemiderText>Maximum File Size is 50mb</RemiderText>
              <ButtonSet>
                <Butn bg='#EAF6EE' dg='#2DC66A' onClick={NextPage}>
                  Previous
                </Butn>
                <Butn bg='#2DC66A' dg='#EAF6EE' onClick={handleProject}>
                  Save & Publish
                </Butn>
              </ButtonSet>
            </BodyWrap>
          )}
        </form>
      </Wrap>
    </Layout>
  )
}

export default PostProject
