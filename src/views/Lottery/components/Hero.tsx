import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from 'uikit'
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'
import LotteryProgress from './LotteryProgress'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  background: rgb(241,238,195);
  background: linear-gradient(90deg, rgba(241,238,195,1) 0%, rgba(241,238,195,1) 11%, rgba(202,238,253,1) 100%);
  height: 200px;
  padding-bottom: 40px;
  padding-top: 40px;
`

const StyledContainer = styled(Container)`
  display: flex;

  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-left: 0;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
    padding-left: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 32px;
  }
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <StyledContainer>
       
       
       <LotteryProgress />
        
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero
