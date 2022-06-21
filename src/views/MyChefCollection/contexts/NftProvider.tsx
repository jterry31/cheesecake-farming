import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useBlock from 'hooks/useBlock'
import nftFarm from 'config/abi/NftFarm.json'
import { NftFarm } from 'config/constants/nfts'
import multicall from 'utils/multicall'
import { getNftContract, getNftMintingContract, getFromWei, getToFloat, getToInt, getFromWayArray, getChefContract } from '../utils/contracts'

interface NftProviderProps {
  children: ReactNode
}

type State = {
  isInitialized: boolean
  balanceOf: number

  chefBalance: number
  tokenIDs: number[]
  maxSupply: number
  totalSupply: number
  baseURI: string
  chefName: string
  chefPrice: number
  saleIsActive: boolean
  symbol: string
}

type Context = {
  reInitialize: () => void
} & State

export const NftProviderContext = createContext<Context | null>(null)

const NftProvider: React.FC<NftProviderProps> = ({ children }) => {
  const isMounted = useRef(true)
  const [state, setState] = useState<State>({
    chefBalance: 0,
    tokenIDs: [],
    maxSupply: 0,
    totalSupply: 0,
    baseURI: "",
    chefName: "",
    chefPrice: 0,
    saleIsActive: false,
    symbol: "",

    isInitialized: false,
    balanceOf: 0,
  })
  const { account } = useWallet()
  const currentBlock = useBlock()

  const { isInitialized } = state

  // Static data
  useEffect(() => {
    const fetchContractData = async () => {
      try {

        // adding Chef read contract data here
        let chefBalance2 = 0
        let tokenIDs2 = []
        
        if(account) {
          chefBalance2 = await getChefContract().methods.balanceOf(account).call()
          tokenIDs2 = await getChefContract().methods.ownedNFTs(account).call()
        }

        const maxSupply2 = await getChefContract().methods.MAX_SUPPLY().call()
        const totalSupply2 = await getChefContract().methods.totalSupply().call()
        const baseURI2 = await getChefContract().methods.baseURI().call()

        const chefName2 = await getChefContract().methods.name().call()
        const chefPrice2 = await getChefContract().methods.nftPrice().call()
        const saleIsActive2 = await getChefContract().methods.saleIsActive().call()
        const symbol2 = await getChefContract().methods.symbol().call()

        //
        
        
        setState((prevState) => ({
          ...prevState,
          chefBalance: chefBalance2,
          maxSupply: maxSupply2,
          totalSupply: totalSupply2,
          baseURI: baseURI2,
          chefName: chefName2,
          chefPrice: chefPrice2 / 10**18,
          saleIsActive: saleIsActive2,
          symbol: symbol2,
          tokenIDs: tokenIDs2,

          isInitialized: true,
        }))
      } catch (error) {
        console.error('an error occured', error)
      }
    }

    fetchContractData()
  }, [isInitialized, setState])


  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  

  /**
   * Allows consumers to re-fetch all data from the contract. Triggers the effects.
   * For example when a transaction has been completed
   */
  const reInitialize = () => {
    // Only attempt to re-initialize if the component is still mounted
    // Transactions can take awhile so it is likely some users will navigate to another page
    // before the transaction is finished
    if (isMounted.current) {
      setState((prevState) => ({ ...prevState, isInitialized: false }))
    }
  }

  return (
    <NftProviderContext.Provider value={{ ...state, reInitialize }}>
      {children}
    </NftProviderContext.Provider>
  )
}

export default NftProvider
