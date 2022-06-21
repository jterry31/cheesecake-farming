import React from 'react'
import styled from 'styled-components'
import { Image, Button } from 'uikit'
import { CommunityTag } from 'components/Tags'
import useI18n from 'hooks/useI18n'
import Card from './Card'
import CardTitle from './CardTitle'

const Balance = styled.div`
  color: ${({ theme }) => theme.colors.backgroundDisabled};
  margin-top: 10px;
  font-size: 40px;
  font-weight: 600;
  // background-image: url('/images/ccake/question1.png');
  // width: 20%;
  // height: 20%;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.backgroundDisabled};
  font-size: 14px;
  margin-bottom: 16px;
`

const DetailPlaceholder = styled.div`
  display: flex;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.backgroundDisabled};
  line-height: 200%
`
const Value = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: 500;
`

const Footer = styled.div`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  padding: 24px;
`
const Binocs = styled.div`
  position: top;
  margin-bottom: 14px;
  margin-left: 20px;
`

const StyledBinocs = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  height: 50px;
`

const StyledImage = styled.div`
  margin-bottom: 20px;
  margin-left: 20px;
`

const Coming: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Card>
      <div style={{ padding: '24px' }}>
        <StyledBinocs>
        <CardTitle>
        Your Project?
        </CardTitle>
         
        </StyledBinocs>
       
        <StyledImage>
        <Image src="/images/ccake/question1.png" width={90} height={90} alt="Your project here" />
        </StyledImage>
        <Label>{TranslateString(416, 'Create a pool for your token')}</Label>
       
        <Button
          variant="primary"
          as="a"
          href="https://docs.google.com/forms/d/e/1FAIpQLSeUSgL2sghmJ20LO_eMH70291QKNcf5T29pmUEUUpxII-vcSw/viewform?usp=sf_link"
          external
          fullWidth
          mb="16px"
        >
          {TranslateString(418, 'Apply Now')}
        </Button>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APR')}:</div>
          <Value>N/A %</Value>
        </DetailPlaceholder>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>
            {TranslateString(384, 'Your Stake')}:
           
          </div>
          <Value>CCAKE</Value>
        </DetailPlaceholder>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>
           Your Reward:  
          </div>
          <Value>???</Value>
        </DetailPlaceholder>
      </div>
      <Footer>
        <CommunityTag />
      </Footer>
    </Card>
  )
}

export default Coming
