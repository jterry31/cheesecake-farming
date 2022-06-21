import React from 'react'
import { Text } from 'uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const CakeWalletBalance = () => {
  const TranslateString = useI18n()
  const cakeBalance = useTokenBalance(getCakeAddress())
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="text" style={{ lineHeight: '36px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue value={getBalanceNumber(cakeBalance)} fontSize="24px" />
}

export default CakeWalletBalance
