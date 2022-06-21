import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, Button, Flex } from 'uikit'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import Input from 'components/Input'

interface StakeBoxProps {
  tokenBalance: BigNumber
  tokenName: string
  onConfirm: (amount: string) => void
}

const Wrapper = styled(Flex)`
  border: ${({ theme }) => theme.colors.borderColor} solid 1px;
  border-radius: 4px;
  padding: 15px 17px;
  margin: 10px;
  margin-top: 24px;
`

const StakeBox: React.FC<StakeBoxProps> = ({ tokenBalance, tokenName, onConfirm }) => {
  const TranslateString = useI18n()
  let rawTokenBalance = getBalanceNumber(tokenBalance)

  if (tokenName === 'USDT' || tokenName === 'USDC') {
    rawTokenBalance*=(1000000000000)
  } 
  if (tokenName === 'WBTC') {
    rawTokenBalance*=(10000000000)
  }

  const displayBalance = rawTokenBalance.toLocaleString()
  const displaySmallBalance=rawTokenBalance.toFixed(9)
  const [pendingTx, setPendingTx] = useState(false)

  const [val, setVal] = useState('')

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const onMaxLPClick = useCallback(() => {
    setVal(displayBalance)
  }, [setVal, displayBalance])

  const clearVal = useCallback(() => {
    setVal('')
  }, [setVal])

  return (
    <Wrapper>
      <Flex flexDirection="column">
        <Text fontSize="18px" mb="5px" bold style={{ display: 'flex', justifyItems: 'flex-start' }}>
          Stake
        </Text>
        <Text
          fontSize="14px"
          mb="14px"
          color="text"
          style={{ display: 'flex', justifyItems: 'flex-start' }}
        >
          {tokenName!=='CCAKE-USDC APE LP' && <Text fontSize="14px" color="primary" style={{ paddingRight: 5 }}>
            {displayBalance}
          </Text>}
          {tokenName==='CCAKE-USDC APE LP' && <Text fontSize="14px" color="primary" style={{ paddingRight: 5 }}>
            {displaySmallBalance}
          </Text>}{' '}
          {tokenName} Available
        </Text>
        <Flex alignItems="center" justifyContent="space-between">
          <Button
            fullWidth
            style={{
              backgroundColor: 'primary',
            }}
            disabled={pendingTx}
            onClick={async () => {
              try {
                setPendingTx(true)
                await onConfirm(val)
              } finally {
                setPendingTx(false)
                clearVal()
              }
            }}
          >
            <Text ml="100px" mr="100px" color="invertedContrast" bold> {pendingTx ? 'Pending' : 'Deposit'} </Text>
          </Button>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default StakeBox
