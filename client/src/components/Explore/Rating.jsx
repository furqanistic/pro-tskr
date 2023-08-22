import React from 'react'
import { keyframes, styled } from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`
const Left = styled.div`
  min-height: 250px;
  min-width: 250px;
  background-color: #ffede8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const RatingNum = styled.p`
  color: #e1c03f;
  text-align: center;
  font-size: 3.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const RatingExc = styled.p`
  color: #222;
  text-align: center;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem; /* 164.706% */
`
const RatingTotal = styled.p`
  color: #222;
  text-align: center;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 186.667% */
`
const Right = styled.div`
  width: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 5rem;
`
const Progress = styled.div`
  position: relative;
  height: 10px;
  width: 100%;
  background-color: #e5f6f3;
  border-radius: 15px;
  margin: 0 1rem;
`

const Color = styled.div`
  position: absolute;
  background-color: #e1c03f;
  width: ${(props) => props.wd};
  height: 10px;
  border-radius: 15px;
`
const TotalStar = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  min-width: 4rem;
`
const NumberReview = styled.div`
  font-size: 0.9rem;
  color: #6b7177;
`
const ProgressWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  width: 100%;
  margin-bottom: 1.5rem;
`
const Rating = () => {
  return (
    <Container>
      <Left>
        <RatingNum>4.4</RatingNum>
        <RatingExc>Exceptional</RatingExc>
        <RatingTotal>5 Reviews</RatingTotal>
      </Left>
      <Right>
        <ProgressWrap>
          <TotalStar>5 Star</TotalStar>
          <Progress>
            <Color wd='100%'></Color>
          </Progress>
          <NumberReview>2</NumberReview>
        </ProgressWrap>
        <ProgressWrap>
          <TotalStar>4 Star</TotalStar>
          <Progress>
            <Color wd='70%'></Color>
          </Progress>
          <NumberReview>2</NumberReview>
        </ProgressWrap>
        <ProgressWrap>
          <TotalStar>3 Star</TotalStar>
          <Progress>
            <Color wd='40%'></Color>
          </Progress>
          <NumberReview>2</NumberReview>
        </ProgressWrap>
        <ProgressWrap>
          <TotalStar>2 Star</TotalStar>
          <Progress>
            <Color wd='10%'></Color>
          </Progress>
          <NumberReview>2</NumberReview>
        </ProgressWrap>
        <ProgressWrap>
          <TotalStar>1 Star</TotalStar>
          <Progress>
            <Color wd='0%'></Color>
          </Progress>
          <NumberReview>2</NumberReview>
        </ProgressWrap>
      </Right>
    </Container>
  )
}

export default Rating
