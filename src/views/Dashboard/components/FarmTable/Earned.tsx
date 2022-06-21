import React from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'

export interface EarnedProps {
  earnings: number
  pid: number
}

const formatNumber = (tokenAmount) => {
  if(new BigNumber(tokenAmount).isGreaterThan(1000000))
    return new BigNumber(tokenAmount).div(1000000).toFixed(2).toString().concat(" M")
  if(new BigNumber(tokenAmount).isGreaterThan(1000))
    return new BigNumber(tokenAmount).div(1000).toFixed(2).toString().concat(" K")
  
  return new BigNumber(tokenAmount).toFixed(2).toString()

}

const Amount = styled.span<{ earned: number }>`
  color: ${({ theme }) => (theme.colors.text)};
  display: flex;
  align-items: center;
  font-size: 16px;
  
`

const Earned: React.FunctionComponent<EarnedProps> = ({ earnings }) => {
  const { account } = useWallet()
  const amountEarned = account ? earnings : null

  const displayBalance = amountEarned || amountEarned === 0 ? amountEarned.toFixed(2) : '0'
  return <Amount earned={amountEarned}>{formatNumber(displayBalance)}</Amount>
}

export default Earned
