import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'

export interface TokenProps {
  isTokenOnly?: boolean
  tokenAmount: BigNumber
  quoteTokenAmount: BigNumber
  tokenPriceVsQuote: BigNumber
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

const Tokens: React.FC<TokenProps> = ({
  isTokenOnly,
  tokenAmount,
  tokenSymbol,
  quoteTokenAmount,
  quoteTokenSymbol,
  tokenPriceVsQuote,
  lpSupply
}) => {
  const TranslateString = useI18n()

  return (
    <Container>
      {tokenAmount ? (
        <TokenWrapper>
          <SymbolWrapper>Total {tokenSymbol} Balance:</SymbolWrapper>
            <span>{formatNumber(tokenAmount)}</span>  
        </TokenWrapper>
      ) : (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      )}
      {!isTokenOnly && quoteTokenAmount && (
        <TokenWrapper>
          <SymbolWrapper>Total {quoteTokenSymbol} Balance:</SymbolWrapper>
          <span>{formatNumber(quoteTokenAmount)}</span>  
        </TokenWrapper>
      )} 
      {!isTokenOnly && !quoteTokenAmount && (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      )}
      {!isTokenOnly && lpSupply && (
        <TokenWrapper>
          <SymbolWrapper>Total LP Balance:</SymbolWrapper>
          <span>{formatNumber(new BigNumber(lpSupply).div(10**18))}</span>  
        </TokenWrapper>
      )} 
      {!isTokenOnly && !lpSupply && (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      )}
      { /* quoteTokenSymbol==='CAKE' && ( tokenPriceVsQuote ? (
        <TokenWrapper>
          <SymbolWrapper>
            CCAKE vs {tokenSymbol}
          </SymbolWrapper>
          <span>{new BigNumber(1).div(tokenPriceVsQuote).toFixed(6)}</span>
        </TokenWrapper>
      ) : (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      )) */ }
      { /* quoteTokenSymbol !=='CAKE' && ( tokenPriceVsQuote ? (
        <TokenWrapper>
          <SymbolWrapper>
            {tokenSymbol} vs {quoteTokenSymbol}
          </SymbolWrapper>
          <span>{new BigNumber(tokenPriceVsQuote).toFixed(6)}</span>
        </TokenWrapper>
      ) : (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      ))  */ }
    </Container>
  )
}

export default Tokens
