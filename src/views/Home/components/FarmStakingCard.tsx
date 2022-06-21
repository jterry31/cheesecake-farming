import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from 'uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import { useMatchBreakpoints } from "uikit/hooks";
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'


const StyledFarmStakingCard = styled(Card)`
  background-image: url('/logo.gif');
  background-repeat: no-repeat;

  background-size: ${({isMobile}) => 
   isMobile ? "150px 150px;" : "200px 200px;"
  };
  
  background-position: ${({isMobile}) => 
   isMobile ? "82% 45%;" : "82% 25%;"
  };

  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const RowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const addCcakeToken = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const provider = window.ethereum
    if (provider) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await provider.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: '0xbc2597d3f1f9565100582cde02e3712d03b8b0f6', 
              symbol: 'CCAKE',
              decimals: '18',
              image:
                'https://app.cheesecakeswap.com/logo.png',
            },
          },
        })

        if (wasAdded) {
          console.log('Token was added')
        }
      } catch (error) {
        // TODO: find a way to handle when the user rejects transaction or it fails
      }
    }
  }, [])

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard isMobile={isMobile}>
      <CardBody>
     
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
      
        <RowBetween>
          <Wrapper>
           
            <Button onClick={addCcakeToken}>
            +{' '}
            <img
              style={{ marginLeft: 8 }}
              width={32}
              src="metamask.png"
              alt="metamask logo"
            />
          </Button>
          </Wrapper>
          
        </RowBetween>
        <Block>
          <CakeHarvestBalance />
          <Label>{TranslateString(544, 'CCAKE to Harvest')}</Label>
        </Block>
        <Block>
          <CakeWalletBalance />
          <Label>{TranslateString(546, 'CCAKE in Wallet')}</Label>
        </Block>
        <Actions>
          {account ? (
            <Button
              mt= "48px"
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting CCAKE')
                : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton mt="48px" fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
