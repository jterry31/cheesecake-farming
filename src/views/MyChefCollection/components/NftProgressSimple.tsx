import React, { useContext } from 'react'
import { Card, CardBody, Text } from 'uikit'
import useI18n from 'hooks/useI18n'
import nfts from 'config/constants/nfts'
import { NftProviderContext } from '../contexts/NftProvider'
import InfoRow from './InfoRow'

const NftProgressSimple = () => {
  const TranslateString = useI18n()
  const { isInitialized, chefBalance,
    maxSupply,
    totalSupply,
    baseURI,
    chefName,
    chefPrice,
    saleIsActive,
    symbol, tokenIDs } = useContext(NftProviderContext)

  /*
  let myNFTs = 0
  
  nfts.forEach(function (nft, key) {
    const { nftId } = nft
    const tokenIds = getTokenIds(nftId)
   
    const MINTS = myMints[nftId] || 0
    if (tokenIds)
      myNFTs += tokenIds.length
  })
  */

  console.log("In NFT Progress, chefBalance: ", tokenIDs.length)

  return (
    <Card>
      <CardBody>
        <InfoRow>
          <Text>{TranslateString(999, 'My Chef NFTs')}:</Text>
          <Text>
            <strong>{chefBalance}</strong>
          </Text>
        </InfoRow>
      </CardBody>
    </Card>
  )
}

export default NftProgressSimple
