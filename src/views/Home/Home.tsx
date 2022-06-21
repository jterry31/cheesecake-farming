import React, { useCallback, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Button, Card, useModal } from 'uikit'
import RoutingWarningModal from 'views/Lottery/components/TicketCard/RoutingWarningModal'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import BigNumber from 'bignumber.js'
import { useMatchBreakpoints } from "uikit/hooks";
import { Context } from "uikit/widgets/Modal/ModalContext";
import { Handler } from "uikit/widgets/Modal/types";
import FarmStakingCard from './components/FarmStakingCard'
import LotteryCard from './components/LotteryCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import Timer from './components/Timer'	
import TwitterCard from './components/TwitterCard'


const Hero = styled.div`
  // align-items: stretch;
  // justify-content: stretch;
  background-image: url('/images/ccake/banner.png');
  background-repeat: no-repeat;

  background-size: cover; 
  background-position: center; 
  height: 200px;

  // flex-direction: column;
  // margin: auto;
  // padding-top: 116px;
  // text-align: center;

`
const MobileHero = styled.div`
  // align-items: stretch;
  // justify-content: stretch;
  background-image: url('/images/ccake/banner400-150.png');
  background-repeat: no-repeat;
  background-size: cover; 
  background-position: center; 
  height: 150px;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Home: React.FC = () => {
  const TranslateString = useI18n()
  const handleClick = null;
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  // const [onPresentApprove] = useModal(<RoutingWarningModal />);
  // const { onPresent, onDismiss, setCloseOnOverlayClick } = useContext(Context);
 
  /*
  React.useEffect(() => {

    onPresent(<RoutingWarningModal />);
  }, []);
  */

  return (
    <>
      {isMobile ? <MobileHero /> : <Hero />}
      <Page>
        {/*
        <div style={{display: "flex", color: "rgba(125, 67, 84, 1)", fontSize: "20px", fontWeight: "bold", justifyContent: "center"}}> 
          FARMS WILL START IN:
        </div> */}
        <div>
         
          <Cards>
    
            <FarmStakingCard />

            <CakeStats />
          </Cards>
        </div>
        <Row /> <Row /> <Row /> <Row />
      </Page>
    </>
  )
}

export default Home
