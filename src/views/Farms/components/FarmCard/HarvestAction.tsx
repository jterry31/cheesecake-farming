import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, Text } from 'uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import useStake from '../../../../hooks/useStake'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  > button {
    width: 100%;
    border-width: 0;
  }
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid)

  const canCompound = pid === 1

  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()

  return (
    <Flex flexDirection="column">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
      <Text
          fontSize="14px"
          mb="14px"
          color="primary"
          style={{ display: 'flex'}}
        >
          {displayBalance}
        </Text>
      </Heading>
      <BalanceAndCompound>
        {canCompound ? (
          <Button
            disabled={rawEarningsBalance === 0 || pendingTx}
            size="sm"
            marginBottom="8px"
            variant="primary"
            style={{
              borderRadius: 2, backgroundColor: "primaryDark",
            }}
            onClick={async () => {
              try {
                setPendingTx(true)
                await onStake(rawEarningsBalance.toString())
              } finally {
                setPendingTx(false)
              }
            }}
          >
            Compound
          </Button>
        ) : null}
        <Button
          disabled={rawEarningsBalance === 0 || pendingTx}
          size={canCompound ? 'sm' : 'md'}
          variant="primary"
          style={{
            backgroundColor: "primary",
            borderRadius: !canCompound ? 2 : 2,
            marginTop: !canCompound ? 8 : 0,
            marginBottom: !canCompound ? 8 : 0,
            paddingTop: canCompound ? 5 : 20
            // alignItems:pendingTx ?'center':'flex-end',
          }}
          onClick={async () => {
            try {
              setPendingTx(true)
              await onReward()
            } finally {
              setPendingTx(false)
            }
          }}
        >
          { !canCompound ? <Text bold color= {(rawEarningsBalance === 0 || pendingTx) ? "textDisabled" : "tertiary" } mb="20px"> {pendingTx ? 'Pending' :  'Harvest'} </Text> 
                         : <Text bold color= {(rawEarningsBalance === 0 || pendingTx) ? "textDisabled" : "tertiary" } mb="6px"> {pendingTx ? 'Pending' :  'Harvest'} </Text>
          }
        </Button>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
