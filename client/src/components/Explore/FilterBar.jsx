import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const Bar = styled.div`
  width: 350px;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  padding-bottom: 5rem;
`
const FilterName = styled.div`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const FilterInput = styled.input`
  outline: none;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3125rem;
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
  border-color: #e9e9e9;
`
const Line = styled.hr`
  width: 100%;
  height: 2px;
  background-color: #e9e9e9;
  margin-top: 1.2rem;
  border: none;
`
const AdvanceFilter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
const AdvanceFilterName = styled.div`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const AdvanceFilterBtn = styled.div`
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
  color: #6b7177;
  margin-right: 1rem;
`
const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  margin-top: 2rem;
  height: 100%;
`

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
`

const Arrow = styled.span`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: transform 0.3s ease;
  font-size: 1rem;
`
const ArrowPrice = styled(Arrow)`
  transform: ${({ isOpenPrice }) =>
    isOpenPrice ? 'rotate(0deg)' : 'rotate(-90deg)'};
`

const CategoryList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  max-height: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
`
const CategoryListPrice = styled(CategoryList)`
  max-height: ${({ isOpenPrice }) => (isOpenPrice ? '100%' : '0')};
  margin-top: 1rem;
  padding-bottom: ${({ isOpenPrice }) => (isOpenPrice ? '1rem' : '0rem')};
`
const CategoryListSkill = styled(CategoryList)`
  max-height: ${({ isOpenSkills }) => (isOpenSkills ? '100%' : '0')};
  margin-top: 1rem;
  padding-bottom: ${({ isOpenSkills }) => (isOpenSkills ? '1rem' : '0rem')};
`

const CategoryItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  background-color: ${({ isChecked }) =>
    isChecked ? '#8BC34A' : 'transparent'};
  padding: 5px;
  border-radius: 4px; // To round the edges a bit

  &:hover {
    background-color: ${({ isChecked }) => (isChecked ? '#7CB342' : '#e6fced')};
  }
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  &:checked + label::before {
    background-color: #1f4b3f;
    border-color: #1f4b3f;
  }

  &:checked + label::after {
    content: '\\2713'; // Unicode checkmark
    color: white;
    display: block;
    text-align: center;
    line-height: 16px;
  }
`

const CategoryLabel = styled.label`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
  font-weight: 300;
  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #1f4b3f;
    border-radius: 3px;
    margin-right: 10px;
    vertical-align: middle;
  }

  &::after {
    content: '';
    position: absolute;
    left: 1px;
    width: 18px;
    height: 18px;
  }
`
const MoreText = styled.p`
  color: #5bbb7b;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
  margin-top: 10px;
`
const MinMax = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const PriceBox = styled.input`
  width: 90%;
  height: 2rem;
  padding: 1.5rem 1rem;
  outline: none;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3125rem;
  border-radius: 0.25rem;
  border: 1px solid #e9e9e9;
  color: #6b7177;
`

const RangeWrapper = styled.div`
  position: relative;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`
const RangeLabel = styled.p`
  font-weight: 500;
  line-height: 1.75rem;
`
const RangeInputWrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`
const RangeInput = styled.input.attrs({ type: 'range' })`
  position: absolute;
  margin-top: 1rem;
  margin-bottom: 1rem;

  width: 50%;
  height: 0.25rem;
  background: #5bbb7b;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border: 1px solid #5bbb7b;
    background-color: white;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border: 1px solid #5bbb7b;
    background-color: white;
    cursor: pointer;
    border-radius: 50%;
  }
`
const RangeInputTwo = styled(RangeInput)`
  right: 0;
`

const FilterBar = () => {
  const [minValue, setMinValue] = useState('20')
  const [maxValue, setMaxValue] = useState('80000')
  const [isOpen, setIsOpen] = useState(true)
  const [isOpenPrice, setisOpenPrice] = useState(true)
  const [isOpenSkills, setisOpenSkills] = useState(true)

  const categories = [
    { name: 'Designer', number: 231 },
    { name: 'Web developer', number: 145 },
    { name: 'Node.js', number: 78 },
    { name: 'Editor', number: 52 },
    { name: 'Singers', number: 109 },
  ]
  const skillsSet = [
    { name: 'Adobe', number: 22 },
    { name: 'Figma', number: 345 },
    { name: 'Web3', number: 23 },
    { name: 'React.js', number: 567 },
    { name: 'Cloud', number: 34 },
  ]

  return (
    <>
      <Bar>
        <FilterName>Location</FilterName>
        <FilterInput placeholder='Anywhere' />
        <Line />
        <AdvanceFilter>
          <AdvanceFilterName>Advance Filter</AdvanceFilterName>
          <AdvanceFilterBtn>Reset</AdvanceFilterBtn>
        </AdvanceFilter>
        <Line />
        <Wrapper>
          <CategoryButton onClick={() => setIsOpen(!isOpen)}>
            Category
            <Arrow isOpen={isOpen}>&#x25B6;</Arrow>
          </CategoryButton>

          <CategoryList isOpen={isOpen}>
            {categories.map((category, index) => (
              <CategoryItem key={index}>
                <Checkbox id={category.name} />
                <CategoryLabel htmlFor={category.name}>
                  {category.name}
                </CategoryLabel>
                <span>({category.number})</span>
              </CategoryItem>
            ))}
            <MoreText>+20 more</MoreText>
          </CategoryList>
          <Line />
        </Wrapper>
        <Wrapper>
          <CategoryButton onClick={() => setisOpenPrice(!isOpenPrice)}>
            Price
            <ArrowPrice isOpenPrice={isOpenPrice}>&#x25B6;</ArrowPrice>
          </CategoryButton>
          <Line />

          <CategoryListPrice isOpenPrice={isOpenPrice}>
            <MinMax>
              <RangeInputWrap>
                <RangeLabel>Min Price</RangeLabel>
                <PriceBox placeholder='Min' value={minValue} readOnly />
              </RangeInputWrap>
              <RangeInputWrap>
                <RangeLabel>Max Price</RangeLabel>
                <PriceBox placeholder='Max' value={maxValue} readOnly />
              </RangeInputWrap>
            </MinMax>
            <RangeWrapper>
              <RangeInput
                min='20'
                max='4000'
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
              />
              <RangeInputWrap>
                <RangeInputTwo
                  min='40000'
                  max='80000'
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                />
              </RangeInputWrap>
            </RangeWrapper>
          </CategoryListPrice>
          <Line />
        </Wrapper>
        <Wrapper>
          <CategoryButton onClick={() => setisOpenSkills(!isOpenSkills)}>
            Skills
            <Arrow isOpenSkills={isOpenSkills}>&#x25B6;</Arrow>
          </CategoryButton>
          <CategoryListSkill isOpenSkills={isOpenSkills}>
            {skillsSet.map((skill, index) => (
              <CategoryItem key={index}>
                <Checkbox id={skill.name} />
                <CategoryLabel htmlFor={skill.name}>{skill.name}</CategoryLabel>
                <span>({skill.number})</span>
              </CategoryItem>
            ))}
            <MoreText>+20 more</MoreText>
          </CategoryListSkill>
          <Line />
        </Wrapper>
      </Bar>
    </>
  )
}

export default FilterBar
