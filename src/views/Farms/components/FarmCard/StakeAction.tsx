import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useStake from 'hooks/useStake'
import { useModal } from 'uikit'
import useUnstake from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import StakeBox from './StakeBox'
import UnstakeBox from './UnstakeBox'
import HarvestBox from './HarvestBox'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  earnings?: BigNumber
  tokenName?: string
  pid?: number
  depositFeeBP?: number
  earnTokenName: string
}

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-direction: row;
    justify-content: space-between;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  earnings,
  tokenName,
  pid,
  earnTokenName,
  depositFeeBP,
}) => {
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)
  const [onPresentDeposit] = useModal(<DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} depositFeeBP={depositFeeBP} />)
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />,
  )

  return (
    <BoxWrapper>
      <StakeBox tokenBalance={tokenBalance} tokenName={tokenName} onConfirm={onPresentDeposit} />

      <UnstakeBox stakedBalance={stakedBalance} tokenName={tokenName} onConfirm={onPresentWithdraw} />

      <HarvestBox earnings={earnings} pid={pid} earnTokenName={earnTokenName} />
    </BoxWrapper>
  )
}

export default StakeAction
