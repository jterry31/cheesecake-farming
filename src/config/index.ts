import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const CAKE_PER_BLOCK = new BigNumber(0.05)
export const BLOCKS_PER_YEAR = new BigNumber(15768000)
export const MATIC_BLOCK_TIME = 2

export const CAKE_POOL_PID = 0