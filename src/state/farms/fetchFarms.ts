import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import farmsConfig from 'config/constants/farms'
import { QuoteToken } from '../../config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchFarms = async () => {
  const data = await Promise.all(
    farmsConfig.map(async (farmConfig) => {
      const lpAdress = farmConfig.lpAddresses[CHAIN_ID]
      const calls = [
        // Balance of token in the LP contract
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of quote token on LP contract
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[CHAIN_ID] : lpAdress,
          name: 'balanceOf',
          params: [getMasterChefAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAdress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals
      ] = await multicall(erc20, calls)

      let tokenAmount;
      let quoteTokenAmount;
      let lpTotalInQuoteToken;
      let tokenPriceVsQuote;
      let lpSupply;
      if (farmConfig.isTokenOnly) {
        //     console.log('here2',
        //   tokenDecimals,farmConfig
        // )
          tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals));
          quoteTokenAmount = new BigNumber(1)
          if (farmConfig.tokenSymbol === QuoteToken.CCAKE && farmConfig.quoteTokenSymbol === QuoteToken.USDC){
            tokenAmount=tokenAmount.minus(new BigNumber(7*43200*0.05)) // needed to be edited day by day and about to ccakePerBlock
          }
          lpSupply = new BigNumber(lpTokenBalanceMC)
          if (farmConfig.tokenSymbol === QuoteToken.USDC && farmConfig.quoteTokenSymbol === QuoteToken.USDC){
            tokenPriceVsQuote = new BigNumber(1);
          } 
          else if (farmConfig.tokenSymbol === QuoteToken.USDT && farmConfig.quoteTokenSymbol === QuoteToken.USDC){
            tokenPriceVsQuote = new BigNumber(1);
          }
          else{
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(tokenBalanceLP))
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(new BigNumber(10).pow(tokenDecimals));
          }
  
          lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote);
          // console.log("tokenPriceVsQuote", `${farmConfig.tokenSymbol} || ${farmConfig.quoteTokenSymbol}`, `${tokenAmount} * ${tokenPriceVsQuote} = ${lpTotalInQuoteToken}`, quoteTokenBlanceLP.toString(), tokenBalanceLP.toString())
        } else {
          // Ratio in % a LP tokens that are in staking, vs the total number in circulation   
          const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
          lpSupply = new BigNumber(lpTokenBalanceMC)
          // Total value in staking in quote token value

  
          // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
          tokenAmount = new BigNumber(tokenBalanceLP)
            .div(new BigNumber(10).pow(tokenDecimals))
            .times(lpTokenRatio)
          quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(lpTokenRatio)
  
          if(tokenAmount.comparedTo(0) > 0){
            tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount);
          }else{
            tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP));
          }

          lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(10).pow(quoteTokenDecimals))
            .times(new BigNumber(2))
            .times(lpTokenRatio)
        }

      const [info, totalAllocPoint, poolInfo, ccakePerBlock] = await multicall(masterchefABI, [
        {
          address: getMasterChefAddress(),
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: getMasterChefAddress(),
          name: 'totalAllocPoint',
        },
        {
          address: getMasterChefAddress(),
          name: 'poolInfo',
          params: [farmConfig.pid],
        },
        {
          address: getMasterChefAddress(),
          name: 'ccakePerBlock',
        },
      ])

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...farmConfig,
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpSupply: lpSupply.toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
        poolWeight: poolWeight.toNumber(),
        multiplier: `${allocPoint.div(25).toString()}X`,
        depositFeeBP: poolInfo.depositFeeBP,
        ccakePerBlock: new BigNumber(ccakePerBlock).toNumber(),
      }
    }),
  )
  return data
}

export default fetchFarms
