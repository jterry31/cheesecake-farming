import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { isNumber } from 'lodash'
import { useWallet } from '@binance-chain/bsc-use-wallet'

export interface TotalWorthProps {
  totalWorthFarms: BigNumber[]
  totalWorthPools: BigNumber[]
}

function numberWithCommas(x: string|number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`

const SupplyWrapper = styled.div`
  min-width: 60px;
  text-align: left;
  font-weight: bold;
  font-size: 20px;
`

const ButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0%, -50%);
  width: auto;
`

const TotalWorth: React.FC<TotalWorthProps> = ({ totalWorthFarms, totalWorthPools }) => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  let tvl = new BigNumber(0)
  let tvl2 = new BigNumber(0)
  for (let i = 0; i < totalWorthFarms.length; i++)
  {
    if (totalWorthFarms[i]) {
      tvl=tvl.plus(totalWorthFarms[i])
    }
  }
  for (let j = 0; j < totalWorthPools.length; j++)
  {
    if (totalWorthPools[j]) {
      tvl2=tvl2.plus(totalWorthPools[j])
    }
  }
  const total=new BigNumber(tvl).plus(tvl2)

  return (
    <Container>
      {account ? (
        <>
          <SupplyWrapper>Total Worth: ${numberWithCommas(parseFloat(total.toFixed(2)))}</SupplyWrapper>
        </>
      ) : (
        <SupplyWrapper>Total Worth: $0.00</SupplyWrapper>
      )}
    </Container>
  )

}

export default TotalWorth