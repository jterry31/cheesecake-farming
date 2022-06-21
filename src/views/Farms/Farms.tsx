import React, { useEffect, useCallback, useContext, useMemo, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading, useModal, Text } from 'uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { orderBy } from 'lodash'
import { useFarms, usePriceMaticUsdc, usePriceCakeUsdc, usePriceEthUsdc } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import RoutingWarningModal from 'views/Lottery/components/TicketCard/RoutingWarningModal'
import { Context } from "uikit/widgets/Modal/ModalContext";
import Select, { OptionProps } from 'components/Select/Select'
import { useMatchBreakpoints } from "uikit/hooks";
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'
import SearchInput from './components/SearchInput'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  // align-items: center;
  position: relative;

  // justify-content: center;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const LabelWrapper = styled.div`
  align-items: left;
  margin-right: 20px;
  justify-content: left;
  > ${Text} {
    font-size: 12px;
  }
`

export interface FarmsProps{
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeUsdc()
  const maticPrice = usePriceMaticUsdc()
  const ethPrice = usePriceEthUsdc()
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const {tokenMode} = farmsProps;
  const [onPresentApprove] = useModal(<RoutingWarningModal />);
  const { onPresent, onDismiss, setCloseOnOverlayClick } = useContext(Context);
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()

  const isInactive = pathname.includes('history')
  const isActive = !isInactive

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  /*
  useEffect(() => {
    if (!tokenMode) {
      onPresent(<RoutingWarningModal />); 
    }
  }, [])
  */

  const [stakedOnly, setStakedOnly] = useState(false)
  // const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  // const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const inactiveStakedFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  
  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.ccakePerBlock || 1).times(new BigNumber(farm.poolWeight)) .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear);

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

        if (farm.quoteTokenSymbol === QuoteToken.WMATIC) {
          totalValue = totalValue.times(maticPrice);
        }

        // For CCAKE - X pairs
        if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          totalValue = totalValue.times(cakePrice);
        }

        if (farm.quoteTokenSymbol === QuoteToken.WETH) {
          totalValue = totalValue.times(ethPrice);
        }

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue);
        }

        return { ...farm, apy, totalValue }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((farm) => {
          return farm.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }

      const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
        switch (sortOption) {
          case 'apr':
            return orderBy(farms, (farm: FarmWithStakedValue) => farm.apy, 'desc')
          case 'multiplier':
            return orderBy(
              farms,
              (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
              'desc',
            )
          case 'earned':
            return orderBy(
              farms,
              (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
              'desc',
            )
          case 'liquidity':
            return orderBy(farms, (farm: FarmWithStakedValue) => farm.totalValue.toNumber(), 'desc')
          default:
            return farms
        }
      }
      return sortFarms(farmsToDisplayWithAPY).map((farm) => (
        <FarmCard
          farm={farm}
          removed={removed}
          maticPrice={maticPrice}
          cakePrice={cakePrice}
          ethPrice={ethPrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [maticPrice, account, cakePrice, ethereum],
  )

  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;

  // Adding GIFs and Pictures to Farms & Pools
  const Hero = styled.div`
  // align-items: stretch;
  // justify-content: stretch;
  background-image: url('/images/ccake/banner.png');
  background-repeat: no-repeat;

  background-size: cover; 
  background-position: center; 
  height: 200px;

  // flex-direction: column;
  // margin: auto;
  // padding-top: 116px;
  // text-align: center;

  `
  const MobileHero = styled.div`
    // align-items: stretch;
    // justify-content: stretch;
    background-image: url('/images/ccake/banner400-150.png');
    background-repeat: no-repeat;
    background-size: cover; 
    background-position: center; 
    height: 150px;
  `
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  //
  return (
    <>
      {isMobile ? <MobileHero /> : <Hero />}
      <Page>
      
          {/*
          <Heading as="h2" size="xs" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
            {TranslateString(10000, 'Deposit Fee will be used to buyback CCAKE')}
          </Heading>
          */}
        <ControlContainer>
          <LabelWrapper style={{marginBottom: 48 }}>
            <Text ml="8px" color="backgroundDisabled" fontSize="16px"> SEARCH POOL </Text>
            <SearchInput onChange={handleChangeQuery} />
          </LabelWrapper>
          <LabelWrapper style={{ marginBottom: 48 }}>
              <Text ml="8px" color="backgroundDisabled" fontSize="16px"> SORT BY </Text>
              <Select
                options={[
                  {
                    label: 'Default',
                    value: 'default',
                  },
                  {
                    label: 'APR/APY',
                    value: 'apr',
                  },
                  {
                    label: 'Multiplier',
                    value: 'multiplier',
                  },
                  {
                    label: 'Earned',
                    value: 'earned',
                  },
                  {
                    label: 'Liquidity',
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/>
        </ControlContainer>
        <div>
          <Divider />
          <FlexLayout>
            <Route exact path={`${path}`}>
              {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
            </Route>
            <Route exact path={`${path}/history`}>
              {stakedOnly ? farmsList(inactiveStakedFarms, true) : farmsList(inactiveFarms, true)}
            </Route>
          </FlexLayout>
        </div>
      </Page>
    </>
  )
}

export default Farms
