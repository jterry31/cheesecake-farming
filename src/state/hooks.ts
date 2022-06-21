import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useRefresh from 'hooks/useRefresh'
import multicall from 'utils/multicall'
import erc20 from 'config/abi/erc20.json'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync } from './actions'
import { State, Farm, Pool } from './types'
import { QuoteToken } from '../config/constants/types'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    // dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}


// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Prices

export const usePriceMaticUsdc = (): BigNumber => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827' // WMATIC-USDC LP
      const [wmaticTokenBalanceLP, usdcTokenBalanceLP] = await multicall(erc20, [
        {
          address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!usdcTokenBalanceLP || !wmaticTokenBalanceLP) return

      setPrice(new BigNumber(usdcTokenBalanceLP).multipliedBy(1000000000000).div(new BigNumber(wmaticTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceCakeUsdc = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  // const maticPriceUSD = usePriceMaticUsdc()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? maticPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  const pid = 0; // CCAKE-USDC LP
  const farm = useFarmFromPid(pid);
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO;
}

export const usePriceEthUsdc = (): BigNumber => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d' // WETH-USDC LP
      const [wethTokenBalanceLP, usdcTokenBalanceLP] = await multicall(erc20, [
        {
          address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!usdcTokenBalanceLP || !wethTokenBalanceLP) return

      setPrice(new BigNumber(usdcTokenBalanceLP).multipliedBy(1000000000000).div(new BigNumber(wethTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms();
  const { account } = useWallet()
  const pools = usePools(account);
  const maticPrice = usePriceMaticUsdc();
  const cakePrice = usePriceCakeUsdc();
  const ethPrice = usePriceEthUsdc();
  let value = new BigNumber(0);
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (farm.lpTotalInQuoteToken) {
      let val;
      if (farm.quoteTokenSymbol === QuoteToken.WMATIC) {
        val = (maticPrice.times(farm.lpTotalInQuoteToken));
      }else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
        val = (cakePrice.times(farm.lpTotalInQuoteToken));
      }else if (farm.quoteTokenSymbol === QuoteToken.WETH) {
        val = (ethPrice.times(farm.lpTotalInQuoteToken));
      }else{
        val = (farm.lpTotalInQuoteToken);
      }
      value = value.plus(val);
    }
  }
  let poolsTotalValue = new BigNumber(0)
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i]
      let poolValue: BigNumber
      if (pool.stakingTokenName === QuoteToken.CCAKE) {
        const totalCcakeStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = cakePrice.times(totalCcakeStaked)
      }
      poolsTotalValue = poolsTotalValue.plus(poolValue ?? ZERO)
    }
  value = value.plus(poolsTotalValue);
  return value;
}