import styled from 'styled-components'
import Container from './Container'

const Page = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
  align-items: flex-start;
  // background-color: #d0e4f5;
  background-image: url('/images/ccake/bg-main.png');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;


  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

export default Page