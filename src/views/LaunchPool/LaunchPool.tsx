import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading, Text } from 'uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarms, usePriceMaticUsdc, usePools } from 'state/hooks'
import { useMatchBreakpoints } from "uikit/hooks";
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = usePools(account)
  const maticPriceUSD = usePriceMaticUsdc()
  const block = useBlock()

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.USDC) {
      return tokenPriceBN.div(maticPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = pools.map((pool) => {
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.pid === 26)
    const stakingTokenFarm = farms.find((s) => s.pid === 26)

    // /!\ Assume that the farm quote price is BNB
    const stakingTokenPriceInBNB = isBnbPool ? new BigNumber(1) : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote)
    const rewardTokenPriceInBNB = priceToBnb(
      pool.tokenName,
      rewardTokenFarm?.tokenPriceVsQuote,
      rewardTokenFarm?.quoteTokenSymbol,
    )

    const totalRewardPricePerYear = rewardTokenPriceInBNB.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;

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

const StyledHead = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
`
  
  return (
    <>
    {isMobile ? <MobileHero /> : <Hero />}
      <Page>    
          <StyledHead>
            <Heading as="h1" size="xxl" mb="16px">
              {TranslateString(282, 'Launch Pool')}
            </Heading>
              <Text color="backgroundDisabled"> Stake CCAKE to earn new tokens. You can unstake at any time.
           Rewards are calculated per block. </Text>
             
         
          </StyledHead>
          <br /><br />
          <PoolTabButtons />
          <Divider />
          <FlexLayout>
            <Route exact path={`${path}`}>
              <>
                {orderBy(openPools, ['sortOrder']).map((pool) => (
                  <PoolCard key={pool.sousId} pool={pool} />
                ))}
                <Coming />
              </>
            </Route>
            <Route path={`${path}/history`}>
              {orderBy(finishedPools, ['sortOrder']).map((pool) => (
                <PoolCard key={pool.sousId} pool={pool} />
              ))}
            </Route>
          </FlexLayout>
      </Page>
    </>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Farm
