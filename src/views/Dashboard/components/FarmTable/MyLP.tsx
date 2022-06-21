import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

export interface MyLPProps {
  symbol: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
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

const SupplyWrapper = styled.div`
  min-width: 60px;
  text-align: left;
  font-size: 16px;
`

const formatNumber = (tokenAmount) => {
  if(new BigNumber(tokenAmount).isGreaterThan(1000000))
    return new BigNumber(tokenAmount).div(1000000).toFixed(2).toString().concat(" M")
  if(new BigNumber(tokenAmount).isGreaterThan(1000))
    return new BigNumber(tokenAmount).div(1000).toFixed(2).toString().concat(" K")
  
  return new BigNumber(tokenAmount).toFixed(2).toString()

}

const MyLP: React.FC<MyLPProps> = ({ symbol }) => {
  const TranslateString = useI18n()
  const { pid } = useFarmFromSymbol(symbol)
  const { stakedBalance } = useFarmUser(pid)
  let multiplier = 1
  if (symbol==='USDC' || symbol==='USDT')
  {
    multiplier *= 10**12
  }
  if (symbol==='WBTC')
  {
    multiplier *= 10**10
  }
  return (
    <Container>
      {symbol ? (
        <>
          {symbol==='CCAKE-USDC APE LP' && <SupplyWrapper>{(getBalanceNumber(stakedBalance)*multiplier).toFixed(6)}</SupplyWrapper>}
          {symbol!=='CCAKE-USDC APE LP' && <SupplyWrapper>{formatNumber((getBalanceNumber(stakedBalance)*multiplier).toFixed(2))}</SupplyWrapper>}
        </>
      ) : (
        <SupplyWrapper>{TranslateString(656, 'Loading...')}</SupplyWrapper>
      )}
    </Container>
  )
}

export default MyLP
