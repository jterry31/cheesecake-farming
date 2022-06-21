import React, { useContext } from 'react'
import { useMatchBreakpoints } from "uikit/hooks";
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/chef'
import NftCard from './NftCard'
import NftGrid from './NftGrid'
import NftGridMobile from './NftGridMobile'
import { NftProviderContext } from '../contexts/NftProvider'

const NftList = () => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;

  const nftListSorted = nfts.map((nft) => (
    <div key={nft.name}>
      <NftCard nft={nft} />
    </div>
  ))

  return (
    
      isMobile ? 
        <NftGridMobile>
        {nftListSorted}
        </NftGridMobile>
      :
        <NftGrid>
        {nftListSorted}
        </NftGrid>
    
  )
}

export default NftList
