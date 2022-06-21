import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

export interface MyDollarValueProps {
  symbol: string
  price: BigNumber
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

const MyDollarValue: React.FC<MyDollarValueProps> = ({ symbol, price }) => {
  const TranslateString = useI18n()
  const { pid } = useFarmFromSymbol(symbol)
  const { stakedBalance } = useFarmUser(pid)
  let divider;
  if (symbol === 'USDT' || symbol === 'USDC'){
    divider = new BigNumber(10**6)
  }
  else if (symbol === 'WBTC') {
    divider = new BigNumber(10**8)
  }
  else {
    divider = new BigNumber(10**18)
  }
  const value = stakedBalance === new BigNumber(0)
  ? new BigNumber(0)
  : new BigNumber(stakedBalance).div(divider).times(price).toFixed(2)

  return (
    <Container>
      {symbol ? (
        <>
          <SupplyWrapper>{`$${formatNumber(value)}`}</SupplyWrapper>
        </>
      ) : (
        <SupplyWrapper>{TranslateString(656, 'Loading...')}</SupplyWrapper>
      )}
    </Container>
  )
}

export default MyDollarValue
