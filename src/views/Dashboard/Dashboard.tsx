import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { RowType, Card, CardBody } from 'uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import useRefresh from 'hooks/useRefresh'
import { BLOCKS_PER_YEAR } from 'config'
import Page from 'components/layout/Page'
import { useFarms, usePriceCakeUsdc, usePriceMaticUsdc, usePools } from 'state/hooks'
import { Farm } from 'state/types'
import useBlock from 'hooks/useBlock'
import { fetchFarmUserDataAsync } from 'state/actions'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApy } from 'utils/apy'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTable/FarmTabButtons'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema } from './components/types'
import TotalWorth from './components/TotalWorth'

const Container = styled.div`
  // padding: 10px 40px;
`

const Pool = styled.div`
  padding: 20px 0;
`

const Dashboard: React.FC = () => {
  const { account } = useWallet()
  const farmsLP = useFarms()
  const pools = usePools(account)
  const block = useBlock()
  const maticPrice = usePriceMaticUsdc()
  const cakePrice = usePriceCakeUsdc()
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  const [stakedOnly, setStakedOnly] = useState(true)

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const farmList = farmsLP.filter((farm) => !farm.isTokenOnly && farm.multiplier !== '0X')
  const poolList = farmsLP.filter((farm) => farm.isTokenOnly && farm.multiplier !== '0X')
  const allList = farmsLP.filter((farm) => farm.multiplier !== '0X')

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken) {
          return farm
        }

        let quoteTokenPriceUsd = new BigNumber(1)
         if (farm.quoteTokenSymbol === 'WMATIC') {
          quoteTokenPriceUsd = maticPrice
        }
        if (farm.quoteTokenSymbol === 'CAKE') {
          quoteTokenPriceUsd = cakePrice
        }

        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const apy = getFarmApy(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity)

        return { ...farm, apy, liquidity: totalLiquidity }
      })

      return farmsToDisplayWithAPY
    },
    [cakePrice, farmsLP],
  )

  const farmsStaked = farmsList(farmList)
  const poolsStaked = farmsList(poolList)
  const allStaked = farmsList(allList) 
  const stakedOnlyFarms = stakedOnly ? farmsStaked.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  ) : farmsStaked

  const stakedOnlyPools = stakedOnly ? poolsStaked.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  ) : poolsStaked

  const stakedAll = stakedOnly ? allStaked.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  ) : allStaked

  const userTvlFarms = stakedOnlyFarms.map((farm) => {
    let farmUserTvl = account ? new BigNumber(farm.quoteTokenAmount).times(new BigNumber(2)).div(new BigNumber(farm.lpSupply)).times(new BigNumber(farm.userData.stakedBalance)) : null
    if (farm.quoteTokenSymbol === 'WMATIC') {
      farmUserTvl = maticPrice.times(farmUserTvl)
    }
    if (farm.quoteTokenSymbol === 'CAKE') {
      farmUserTvl = cakePrice.times(farmUserTvl)
    }
    return farmUserTvl
  })

  const userTvlPools = stakedOnlyPools.map((farm) => {
    let divider;
    if (farm.tokenSymbol==='USDC' || farm.tokenSymbol==='USDT') {
      divider = new BigNumber(10**6)
    }
    else if (farm.tokenSymbol==='WBTC') {
      divider = new BigNumber(10**8)
    }
    else {
      divider = new BigNumber(10**18) 
    }
    let poolUserTvl = account ? new BigNumber(farm.tokenPriceVsQuote).div(divider).times(new BigNumber(farm.userData.stakedBalance)) : null
    if (farm.quoteTokenSymbol === 'WMATIC') {
      poolUserTvl = maticPrice.times(poolUserTvl)
    }
    if (farm.quoteTokenSymbol === 'CAKE') {
      poolUserTvl = cakePrice.times(poolUserTvl)
    }
    return poolUserTvl
  })



  const rowData = stakedAll.map((farm) => {
      const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase()
      const imageLink = farm.isTokenOnly ? farm.tokenSymbol.toLowerCase() : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`
      const row: RowProps = {
        farm: {
          image: imageLink,
          label: lpLabel,
          pid: farm.pid,
        },
        earned: {
          earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
          pid: farm.pid,
        },
        liquidity: new BigNumber(farm.totalValue),
        details: farm,
      }

      return row
    })

  /* const rowData2 = stakedOnlyPools.map((farm) => {
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase()

    const row: RowProps = {
      farm: {
        image: farm.tokenSymbol.toLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      liquidity: new BigNumber(farm.totalValue),
      details: farm,
    }

    return row
  })  */


  const renderFarmingPool = (data, header): JSX.Element => {
    const columnSchema = DesktopColumnSchema

    const columns = columnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
        switch (column.name) {
          case 'farm':
            return b.id - a.id
          case 'earned':
            return a.original.earned.earnings - b.original.earned.earnings
          default:
            return 1
        }
      },
      sortable: column.sortable,
    }))

    return <Table data={data} columns={columns} header={header} />
  }

  return (
    <Page>
      <Container>
        <Card>
          <CardBody>
            <TotalWorth totalWorthFarms={userTvlFarms} totalWorthPools={userTvlPools}/>
          </CardBody>
        </Card>
        <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/>
        <Pool>{renderFarmingPool(rowData, 'Farms & Pools')}</Pool>
      </Container>
    </Page>
  )
}

export default Dashboard
