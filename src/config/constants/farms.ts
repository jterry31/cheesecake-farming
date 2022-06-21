import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    isTokenOnly: false,
    lpSymbol: 'CCAKE-USDC APE LP',
    lpAddresses: {
      137: '0x0baf0f4561ceab10540ba067ef30e6642074095d', // CCAKE - USDC
    },
    tokenSymbol: 'CCAKE',
    tokenAddresses: {
      137: '0xbc2597d3f1f9565100582cde02e3712d03b8b0f6', // CCAKE
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 1,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'CCAKE',
    lpAddresses: {
      137: '0x0baf0f4561ceab10540ba067ef30e6642074095d', // CCAKE - USDC
    },
    tokenSymbol: 'CCAKE',
    tokenAddresses: {
      137: '0xbc2597d3f1f9565100582cde02e3712d03b8b0f6', // CCAKE
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 2,
    isTokenOnly: true,
    risk: 5,
    lpSymbol: 'WMATIC',
    lpAddresses: {
      137: '0x6e7a5fafcec6bb1e78bae2a1f0b612012bf14827', // WMATIC - USDC
    },
    tokenSymbol: 'WMATIC',
    tokenAddresses: {
      137: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // WMATIC
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 3,
    isTokenOnly: true,
    risk: 5,
    lpSymbol: 'WBTC',
    lpAddresses: {
      137: '0xf6a637525402643b0654a54bead2cb9a83c8b498', // WBTC - USDC
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      137: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', // WBTC
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 4,
    isTokenOnly: true,
    risk: 5,
    lpSymbol: 'WETH',
    lpAddresses: {
      137: '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d', // WETH - USDC
    },
    tokenSymbol: 'WETH',
    tokenAddresses: {
      137: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619', // WETH
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 5,
    isTokenOnly: true,
    risk: 5,
    lpSymbol: 'USDC',
    lpAddresses: {
      137: '0x2cf7252e74036d1da831d11089d326296e64a728', // USDC - USDC
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', // USDC
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 6,
    isTokenOnly: true,
    risk: 5,
    lpSymbol: 'USDT',
    lpAddresses: {
      137: '0x2cf7252e74036d1da831d11089d326296e64a728', // USDT - USDC
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      137: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', // USDT
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
]

export default farms