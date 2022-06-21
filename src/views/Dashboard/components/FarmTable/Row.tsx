import React, { useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useMatchBreakpoints, Text } from 'uikit'
import useI18n from 'hooks/useI18n'
import { usePriceMaticUsdc, usePriceCakeUsdc } from 'state/hooks'
import Farm, { FarmProps } from './Farm'
import Earned, { EarnedProps } from './Earned'
import Details from './Details'
import LPSupply from './LPSupply'
import Tokens from './Tokens'
import MyTokens from './MyTokens'
import MyLP from './MyLP'
import LPPrice from './LPPrice'
import MyDollarValue from './MyDollarValue'
import CellLayout from './CellLayout'

export interface RowProps {
  farm: FarmProps
  earned: EarnedProps
  liquidity: BigNumber
  details: FarmWithStakedValue
}

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.backgroundDisabled};
`

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

const FarmMobileCell = styled.td`
  padding-top: 24px;
`
const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  justify-content: space-between;
  margin-left: 16px;
`

const formatNumber = (tokenAmount) => {
  if(new BigNumber(tokenAmount).isGreaterThan(1000000))
    return new BigNumber(tokenAmount).div(1000000).toFixed(2).toString().concat(" M")
  if(new BigNumber(tokenAmount).isGreaterThan(1000))
    return new BigNumber(tokenAmount).div(1000).toFixed(2).toString().concat(" K")
  
  return new BigNumber(tokenAmount).toFixed(2).toString()

}

const Row: React.FunctionComponent<RowProps> = (props) => {
  const { details } = props
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const TranslateString = useI18n()
  const maticPrice = usePriceMaticUsdc()
  const cakePrice = usePriceCakeUsdc()
  let tokenPrice = details.isTokenOnly ? new BigNumber(details.tokenPriceVsQuote) : new BigNumber(details.quoteTokenAmount).times(2).div(details.lpSupply).times(10**18)
  if (details.quoteTokenSymbol === 'CAKE'){
    tokenPrice = tokenPrice.times(cakePrice)
  }
  else if (details.quoteTokenSymbol === 'WMATIC'){
    tokenPrice = tokenPrice.times(maticPrice)
  }
  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }

  const { isXl } = useMatchBreakpoints()

  const handleRenderRow = () => {
    if (isXl) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          <td key="farm">
            <CellLayout>
              <Farm {...props.farm} />
            </CellLayout>
          </td>
          <td key="earned">
            <CellLayout label={TranslateString(1072, 'Earned')}>
              <Earned {...props.earned} />
            </CellLayout>
          </td>
          <td key="lpSymbol">
            <CellInner>
              {details.isTokenOnly && <CellLayout label={TranslateString(1072, 'My Token Balance')}>
                <MyLP symbol={details.lpSymbol} />
              </CellLayout>}
              {!details.isTokenOnly && <CellLayout label={TranslateString(1072, 'My LP Balance')}>
                <MyLP symbol={details.lpSymbol} />
              </CellLayout>}
            </CellInner>
          </td>
          <td key="myDollarValue">
            <CellInner>
              <CellLayout label={TranslateString(1072, 'My Dollar Value')}>
                <MyDollarValue price={tokenPrice} symbol={details.lpSymbol} />
              </CellLayout>
            </CellInner>
          </td>
          <td key="details">
            <CellInner>
              <CellLayout>
                <Details actionPanelToggled={actionPanelToggled} />
              </CellLayout>
            </CellInner>
          </td>
        </StyledTr>
      )
    }

    return (
      <StyledTr onClick={toggleActionPanel}>
        <td>
          <tr>
            <FarmMobileCell>
              <CellLayout>
                <Farm {...props.farm} />
              </CellLayout>
            </FarmMobileCell>
          </tr>
          <tr>
            <EarnedMobileCell>
              <CellLayout label={TranslateString(1072, 'Earned')}>
                <Earned {...props.earned} />
              </CellLayout>
            </EarnedMobileCell>
          </tr>
        </td>
        <td>
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelToggled} />
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    )
  }

  const handleSecondRenderRow = () => {
    if (isXl) {
      return (
        <StyledTr>
          <td key="tokenAmount">
            <Tokens
              isTokenOnly={details.isTokenOnly}
              tokenAmount={details.tokenAmount}
              quoteTokenAmount={details.quoteTokenAmount}
              tokenSymbol={details.tokenSymbol}
              quoteTokenSymbol={details.quoteTokenSymbol}
              tokenPriceVsQuote={details.tokenPriceVsQuote}
              lpSupply={details.lpSupply}
            />
          </td>
          <td key="mytokenAmount">
            <MyTokens
              isTokenOnly={details.isTokenOnly}
              tokenAmount={details.tokenAmount}
              quoteTokenAmount={details.quoteTokenAmount}
              tokenSymbol={details.tokenSymbol}
              quoteTokenSymbol={details.quoteTokenSymbol}
              lpSymbol={details.lpSymbol}
              lpSupply={details.lpSupply}
            />
          </td>
          <td key="lpPrice">
            <CellInner>
              {!details.isTokenOnly && <CellLayout label={TranslateString(1072, 'LP Price')}>
                <LPPrice value={tokenPrice.toFixed(2)} />
              </CellLayout>}
              {details.isTokenOnly && <CellLayout label={`${details.tokenSymbol} Price`}>
                <LPPrice value={tokenPrice.toFixed(2)} />
              </CellLayout>}
            </CellInner>
          </td>
          <td />
          <td />
        </StyledTr>
      )
    }

    return (
      <ValueContainer>
        <ValueWrapper>
          {!details.isTokenOnly && <Text>{TranslateString(1072, 'My LP Balance')}</Text>}
          {details.isTokenOnly && <Text>{TranslateString(1072, 'My Token Balance')}</Text>}
          <MyLP symbol={details.lpSymbol} />
        </ValueWrapper>
        <ValueWrapper>
        {!details.isTokenOnly && <Text>{TranslateString(1072, 'LP Price')}</Text>}
          {details.isTokenOnly && <Text>{`${details.tokenSymbol} Price`}</Text>}
          <LPPrice value={tokenPrice.toFixed(3)} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(1072, 'My Dollar Value')}</Text>
          <MyDollarValue price={tokenPrice} symbol={details.lpSymbol} />
        </ValueWrapper>
      </ValueContainer>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {actionPanelToggled && details && handleSecondRenderRow()}
    </>
  )
}

export default Row
