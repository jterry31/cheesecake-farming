import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton, Image } from 'uikit'
// import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import { useFarmFromPid, useFarmUser } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { calculateCakeEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronRight, ChevronUp } from 'react-feather'
import { QuoteToken } from 'config/constants/types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import ApyExplanationButton from './ApyExplanationButton'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
  totalValue?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  // background: linear-gradient(
  //   45deg,
  //   rgba(255, 0, 0, 1) 0%,
  //   rgba(255, 154, 0, 1) 10%,
  //   rgba(208, 222, 33, 1) 20%,
  //   rgba(79, 220, 74, 1) 30%,
  //   rgba(63, 218, 216, 1) 40%,
  //   rgba(47, 201, 226, 1) 50%,
  //   rgba(28, 127, 238, 1) 60%,
  //   rgba(95, 21, 242, 1) 70%,
  //   rgba(186, 12, 248, 1) 80%,
  //   rgba(251, 7, 217, 1) 90%,
  //   rgba(255, 0, 0, 1) 100%
  // );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 32px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 2px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  // display: flex;
  // flex-direction: column;
  justify-content: space-around;
  padding-top: 20px;
  padding-right: 20px;
  position: relative;
  text-align: center;
  width: 100%;
  max-width: 100%;
  min-height: 120px;
  // max-height: 300px;
  &:hover {
    cursor: pointer;
  }
`

const ImageWrapper = styled.div`
  position: absolute;
  top: 0px;
  width: 120px;
  height: 120px;
`

const CardWrapper = styled.div`
  display: flex;
`

const InnerCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 150px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const ExpandableWrapper = styled.div``

const RowOnMobile = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  > div {
    &:nth-child(2) {
      font-size: 14px;
    }
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: column;
    justify-content: center;
    > div {
      &:nth-child(2) {
        font-size: 18px;
      }
    }
  }
`

const ExpandIconOnLarge = styled(Flex)`
  display: none;
  ${({ theme }) => theme.mediaQueries.xl} {
    display: flex;
  }
`

const ExpandIconOnMobile = styled(Flex)`
  display: flex;
  ${({ theme }) => theme.mediaQueries.xl} {
    display: none;
  }
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  maticPrice?: BigNumber
  ethPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, maticPrice, ethPrice, ethereum, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmImage = farm.isTokenOnly
    ? farm.tokenSymbol.toLowerCase()
    : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.WMATIC) {
      return maticPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.WETH) {
      return ethPrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [maticPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol
  const earnLabel = 'CCAKE'
  const farmAPY =
    farm.apy &&
    farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })


  const farmApy = farm.apy.times(new BigNumber(100)).toNumber()
  const oneThousandDollarsWorthOfCake = 1000 / cakePrice.toNumber()

  const cakeEarnedPerThousand365D = calculateCakeEarnedPerThousandDollars({ numberOfDays: 365, farmApy, cakePrice })
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, isTokenOnly } = farm

  const { pid } = useFarmFromPid(farm.pid)
  const { earnings, stakedBalance } = useFarmUser(pid)
  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayEarningBalance = rawEarningsBalance.toLocaleString()

  const Icon = showExpandableSection ? ChevronDown : ChevronRight
  const IconDown = showExpandableSection ? ChevronUp : ChevronDown
  const handleClick = () => setShowExpandableSection(!showExpandableSection)

  return (
    <FCard>
      <ImageWrapper>
        <Image
          src={`/images/farms/${farmImage}.png`}
          alt={farm.tokenSymbol}
          width={120}
          height={120}
        />
      </ImageWrapper>
      <Flex flexDirection="column">
        <CardWrapper onClick={handleClick}>
          <InnerCardWrapper>
            {farm.tokenSymbol === 'CCAKE' && <StyledCardAccent />}
            <CardHeading
              isFarming={!stakedBalance.isZero()}
              lpLabel={lpLabel}
              multiplier={farm.multiplier}
              depositFee={farm.depositFeeBP}
              tokenSymbol={farm.tokenSymbol}
              pid={pid}
              isTokenOnly={isTokenOnly}
            />
            <Flex width="20%" />
            {removed && <FarmFinishedSash />}
            {!removed && (
              <Flex width="100%" alignItems="center" flexDirection='column' justifyContent='flex-end'>
                <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                  {farm.apy ? (
                    <>
                      APR: {farmAPY}%
                      <ApyButton
                        lpLabel={lpLabel}
                        quoteTokenAdresses={quoteTokenAdresses}
                        quoteTokenSymbol={quoteTokenSymbol}
                        tokenAddresses={tokenAddresses}
                        cakePrice={cakePrice}
                        apy={farm.apy}
                      />
                    </>
                  ) : (
                    <Skeleton height={24} width={80} />
                  )}
                </Text>
                <Text bold style={{ display: 'flex', alignItems: 'center' }}>
                  {farm.apy ? (
                    <>
                      APY: {apyModalRoi({ amountEarned: cakeEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfCake })}%
                      <ApyExplanationButton
                        lpLabel={lpLabel}
                        quoteTokenAdresses={quoteTokenAdresses}
                        quoteTokenSymbol={quoteTokenSymbol}
                        tokenAddresses={tokenAddresses}
                        cakePrice={cakePrice}
                        apy={farm.apy}
                      />
                    </>
                  ) : (
                    <Skeleton height={24} width={80} />
                  )}
                </Text>
              </Flex>
            )}
            <Flex width="20%" />
            <Flex justifyContent="center" width="100%" flexDirection="column">
              <Flex justifyContent="space-between">
                <Flex justifyContent="space-between">
                  <Text fontSize="16px">{TranslateString(10001, 'Deposit Fee')}:</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontSize="16px">{farm.depositFeeBP / 100}%</Text>
                </Flex>
              </Flex>
              <Flex justifyContent="space-between">
                <Flex justifyContent="space-between">
                  <Text fontSize="16px">
                     Multiplier
                  </Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text fontSize="16px">{farm.multiplier}</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex width="20%" />
            <Flex justifyContent="flex-start" width="100%">
              <RowOnMobile justifyContent="center" alignItems="flex-start">
                <Text fontSize="12px">Liquidity</Text>
                <Text>{totalValueFormated}</Text>
              </RowOnMobile>
            </Flex>
            <Flex justifyContent="flex-start" width="100%">
              <RowOnMobile justifyContent="center" alignItems="flex-start">
                <Text fontSize="12px">Earned CCAKE</Text>
                <Text>{displayEarningBalance}</Text>
              </RowOnMobile>
            </Flex>
            <ExpandIconOnLarge justifyContent="center" alignItems="center">
              <Icon color="white" size="24" />
            </ExpandIconOnLarge>
            <ExpandIconOnMobile justifyContent="center" alignItems="center">
              <IconDown color="white" size="24" />
            </ExpandIconOnMobile>
          </InnerCardWrapper>
        </CardWrapper>
        {showExpandableSection && (
          <ExpandableWrapper>
            <CardActionsContainer farm={farm} ethereum={ethereum} account={account} earnTokenName={earnLabel} />
            <DetailsSection
              removed={removed}
              polygonScanAddress={
                farm.isTokenOnly
                  ? `https://polygonscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
                  : `https://polygonscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
              }
              totalValueFormated={totalValueFormated}
              lpLabel={lpLabel}
              quoteTokenAdresses={quoteTokenAdresses}
              quoteTokenSymbol={quoteTokenSymbol}
              tokenAddresses={tokenAddresses}
              isTokenOnly={isTokenOnly}
            />
          </ExpandableWrapper>
        )}
      </Flex>
    </FCard>
  )
}

const FarmFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

export default FarmCard
