import React from 'react'
import { styled } from 'styled-components'
import RatingIcon from '/Explore/rating.svg'
import RatingIconZero from '/Explore/rating0.svg'
const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
  margin-top: 2rem;
`
const ProjectDetail = styled.p`
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.75rem; /* 200% */
`
const CommentHead = styled.p`
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem; /* 186.667% */
`
const Comment = styled(CommentHead)`
  font-weight: 400;
`
const RatingImg = styled.img`
  width: 0.8rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
`
const OriginalUser = styled.a`
  color: #5bbb7b;
`
const Line = styled.hr`
  width: 100%;
  border: none;
  height: 2px;
  background-color: #e9e9e9;
  margin-top: 2rem;
`
const RatingComments = () => {
  return (
    <Container>
      <ProjectDetail>Jul 2023 - Aug 2023 | Fixed-price $52.00</ProjectDetail>
      <CommentHead>
        Need help trouble shooting Media Encoder Working with Ali Taufan was
        truly a pleasure.{' '}
      </CommentHead>
      <Comment>
        His unwavering support made the experience all the more enjoyable. I
        would definitely love to have the opportunity to work with him once
        again.
      </Comment>
      <RatingImg src={RatingIcon} />
      <RatingImg src={RatingIcon} />
      <RatingImg src={RatingIcon} />
      <RatingImg src={RatingIcon} />
      <RatingImg src={RatingIcon} />
      <CommentHead>
        To freelancer: <OriginalUser>Tahir M</OriginalUser>
      </CommentHead>
      <Comment>Will definitely hire and recommend Tahir M</Comment>
      <RatingImg src={RatingIcon} />
      <RatingImg src={RatingIcon} />
      <RatingImg src={RatingIcon} />
      <RatingImg src={RatingIcon} />
      <RatingImg src={RatingIconZero} />
      <Line />
    </Container>
  )
}

export default RatingComments
