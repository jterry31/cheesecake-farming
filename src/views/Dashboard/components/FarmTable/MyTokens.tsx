import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'

export interface TokenProps {
  isTokenOnly?: boolean
  tokenAmount: BigNumber
  quoteTokenAmount: BigNumber
  lpSymbol: string
  quoteTokenSymbol: string
  tokenSymbol: string
  lpSupply: BigNumber
}

const Container = styled.div`
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const TokenWrapper = styled.div`
  display: flex;
  min-width: 60px;
  text-align: left;
  span {
    margin: 10px;
  }
`

const SymbolWrapper = styled.span`
  min-width: 120px;
  color: ${({ theme }) => theme.colors.backgroundDisabled};
  font-weight: bold;
`

const formatNumber = (tokenAmount) => {
  if(new BigNumber(tokenAmount).isGreaterThan(1000000))
    return new BigNumber(tokenAmount).div(1000000).toFixed(2).toString().concat(" M")
  if(new BigNumber(tokenAmount).isGreaterThan(1000))
    return new BigNumber(tokenAmount).div(1000).toFixed(2).toString().concat(" K")
  
  return new BigNumber(tokenAmount).toFixed(2).toString()

}


const MyTokens: React.FC<TokenProps> = ({
  isTokenOnly,
  tokenAmount,
  tokenSymbol,
  quoteTokenAmount,
  quoteTokenSymbol,
  lpSymbol,
  lpSupply,
}) => {
  const TranslateString = useI18n()
  const { pid } = useFarmFromSymbol(lpSymbol)
  const { stakedBalance } = useFarmUser(pid)
  const userBalance = new BigNumber(getBalanceNumber(stakedBalance))
  
  const mytokenAmount = new BigNumber(tokenAmount).times(userBalance).div(lpSupply).times(10**18)
  const myquoteTokenAmount = isTokenOnly ? userBalance 
                                         : new BigNumber(quoteTokenAmount).times(userBalance).div(lpSupply).times(10**18)

  return (
    <Container>
      {tokenAmount ? (
        <TokenWrapper>
          <SymbolWrapper>My {tokenSymbol} Balance:</SymbolWrapper>
          <span>{formatNumber(mytokenAmount)}</span>
        </TokenWrapper>
      ) : (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      )}
      {!isTokenOnly && quoteTokenAmount && (
        <TokenWrapper>
          <SymbolWrapper>My {quoteTokenSymbol} Balance:</SymbolWrapper>
          <span>{formatNumber(myquoteTokenAmount)}</span>
        </TokenWrapper>
      )} 
      {!isTokenOnly && !quoteTokenAmount && (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      )}
    </Container>
  )
}

export default MyTokens
