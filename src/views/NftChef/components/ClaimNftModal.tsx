import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button, Modal, Text } from 'uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { NftFarm, AMOUNT_TO_CLAIM } from 'config/constants/nfts'
import { getCakeAddress, getWmaticAddress } from 'utils/addressHelpers'
import { Nft } from 'config/constants/types'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { useERC20, useRabbitMintingFarm, useChefContract} from 'hooks/useContract'
import { getChefContract } from '../utils/contracts'
import InfoRow from './InfoRow'
import { useNftAllowance } from '../../../hooks/useAllowance'
import { useNftApprove } from '../../../hooks/useApprove'

interface ClaimNftModalProps {
  nft: Nft
  chefAmount: number
  totalPrice: number
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 600;
`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  margin: auto;
`

const ClaimNftModal: React.FC<ClaimNftModalProps> = ({ nft, chefAmount, totalPrice, onSuccess, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const TranslateString = useI18n()
  const { account, balance }: { account: string; balance: string} = useWallet()
  const nftMintingContract = useRabbitMintingFarm(NftFarm)
  const contraToken = useERC20(getCakeAddress())
  const allowance = useNftAllowance(contraToken, NftFarm, pendingTx)
  const onApprove = useNftApprove(contraToken, NftFarm)
  const cakeBalance = useTokenBalance(getCakeAddress())
  const cakeInWallet = getBalanceNumber(cakeBalance)

  // const bnbBalance = useTokenBalance(getWbnbAddress())
  const maticInWallet = new BigNumber(balance).div(10**18)
  const chefContract = useChefContract()

  // console.log('getCakeAddress', getCakeAddress(), NftFarm, allowance)
  // console.log('allowance', allowance)

  const handleConfirm = async () => {
    try {
      await chefContract.methods
        .mint(chefAmount)
        .send({ from: account, value: totalPrice * 10**18 })
        .on('sending', () => {
          setIsLoading(true)
        })
        .on('receipt', () => {
          setSuccess("Transaction successful! Please check MyNFT tab for your minted new Chef(s) !!!")
          setTimeout(() => {
            onDismiss()
            onSuccess()
          }, 5000)
      
        })
        .on('error', () => {
          console.error(error)
          setError('Unable to mint NFT')
          setTimeout(() => {
            setError(null)
          }, 2000)
          setIsLoading(false)
        })
    } catch (err) {
      console.error('Unable to mint NFT:', err)
    }
  }

  useEffect(() => {
    if (maticInWallet.isLessThan(new BigNumber(totalPrice))) {
      setError(`Insufficient MATIC balance, Required: `.concat((totalPrice).toString(), " MATIC, Your Balance: ", maticInWallet.toFixed(3), " MATIC"))
    }
    else
      setError(null)
  }, [maticInWallet, setError])

  return (
    <Modal title={`Mint ${chefAmount} Chef for ${totalPrice} MATIC`} onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="failure" mb="8px">
            {error}
          </Text>
        )}
        {success && (
          <Text color="rgba(125, 67, 84, 1)" mb="8px">
            {success}
          </Text>
        )}
        <InfoRow>
          <Text>{TranslateString(999, 'You will receive')}:</Text>
          <Value>{`${chefAmount} x Chef NFT`}</Value>
        </InfoRow>
      </ModalContent>
      <Actions>
        {/*
        <Button
          fullWidth
          disabled={!account || pendingTx || isLoading || allowance > 0}
          onClick={async () => {
            try {
              setPendingTx(true)
              await onApprove()
              setPendingTx(false)
            } catch (e) {
              setPendingTx(false)
              console.error(e)
            }
          }}
        >
          Approve
        </Button>
        */}

        <Button
          fullWidth
          onClick={handleConfirm}
          disabled={!account || isLoading || maticInWallet.isLessThan(new BigNumber(totalPrice))}
        >
          MINT Chef
        </Button>
      </Actions>
    </Modal>
  )
}

export default ClaimNftModal
