import React, { useState } from 'react'
import { keyframes, styled } from 'styled-components'
import SideBarControlIcon from '/sidebar-control.svg'
import CompanyIcon from '/Auth/logo.svg'
import { Link } from 'react-router-dom'
import SearchIconImg from '/Auth/find.svg'
const Bar = styled.div`
  background-color: #ffffff;
  height: 60px;
  width: 100vw;
  border-bottom: 1px solid #e9e9e9;
`
const BarWrap = styled.div`
  width: 100%;
  flex: 7;
  display: flex;
  height: 100%;
`
// LEFT SECTION OF Navbar
const Left = styled.div`
  flex: 1;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 250px;
  position: sticky;
  top: 0;
`
const Logo = styled.img`
  object-fit: contain;
  width: 150px;
  height: 100%;
  margin-left: 15px;
`
const VerticalLine = styled.div`
  width: 1px;
  height: 40px;
  background-color: #e9e9e9;
  margin-left: 1rem;
`
// MID SECTION OF Navbar

const Mid = styled.div`
  flex: 1;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`
const IconImg = styled.img`
  object-fit: contain;
  width: 17px;
`
// RIGHT SECTION OF Navbar
const Right = styled.div`
  flex: 5;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const CategoryName = styled.p`
  color: ${(props) =>
    props.selected
      ? '#5BBB7B'
      : '#222'}; // Change '#00FF00' to your desired shade of green
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  margin-left: 2rem;
  border-top: ${(props) =>
    props.selected
      ? '2px solid #5BBB7B'
      : 'none'}; // green underline for selected

  transition: border-top 0.3s, color 0.3s; // smooth transition for changes
`

const SignUpBtn = styled.div`
  display: flex;
  padding: 4px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #5bbb7b;
  color: white;
  font-size: 15px;
  font-weight: 700;
  line-height: 28px;
  margin: 0 2rem;
`
const slideRight = keyframes`
    from {
        width: 0;
    }
    to {
        width: 200px;
    }
`

const SearchInput = styled.input`
  animation: ${slideRight} 0.3s forwards;
  width: 200px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  margin-left: 10px;
`

const SearchIcon = styled.img`
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  margin-left: 2rem;
  width: 30px;
  &:hover {
    background-color: #eaf6ee;
  }
`
const Linker = styled(Link)`
  text-decoration: none;
`
const CategoryWrapper = styled(Link)`
  text-decoration: none;
  color: inherit; // to inherit the color from CategoryName
`

const Navbar = (props) => {
  const [isInputVisible, setInputVisible] = useState(false)
  const [selected, setSelected] = useState('')

  const handleCategoryClick = (category) => {
    setSelected(category)
  }

  const categories = [
    { name: 'Home', link: '/' },
    { name: 'Browse Jobs', link: '#' },
    { name: 'Services', link: '#' },
    { name: 'Blog', link: '#' },
    { name: 'Pages', link: '#' },
    { name: 'Contact', link: '#' },
    { name: 'Become a seller', link: '#' },
    { name: 'Sign In', link: '/login' },
  ]

  return (
    <Bar>
      <BarWrap>
        <Left>
          <Logo src={CompanyIcon} />
        </Left>
        <Mid>
          <IconImg src={SideBarControlIcon} onClick={props.toggleSidebar} />
        </Mid>
        <Right>
          {categories.map((category) => (
            <CategoryWrapper key={category.name} to={category.link}>
              <CategoryName
                selected={selected === category.name}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </CategoryName>
            </CategoryWrapper>
          ))}

          <VerticalLine />

          {isInputVisible && <SearchInput />}

          <SearchIcon
            src={SearchIconImg}
            onClick={() => setInputVisible(!isInputVisible)}
          />

          <Linker to='/signup'>
            <SignUpBtn>Join</SignUpBtn>
          </Linker>
        </Right>
      </BarWrap>
    </Bar>
  )
}

export default Navbar
