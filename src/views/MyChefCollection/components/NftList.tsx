import React, { useState, useContext, useCallback } from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/nfts'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
import { NftProviderContext } from '../contexts/NftProvider'

const NftList = () => {
  const { tokenIDs } = useContext(NftProviderContext)

  return (
    <NftGrid>
      {tokenIDs.map((tokenID) => (
        <div key={tokenID}>
          <NftCard nft={nfts[0]} tokenID={tokenID} />
        </div>
      ))}
    </NftGrid>
  )
}

export default NftList
