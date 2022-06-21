import React, { useContext } from 'react'
import { Card, CardBody, Text } from 'uikit'
import useI18n from 'hooks/useI18n'
import { NftProviderContext } from '../contexts/NftProvider'
import InfoRow from './InfoRow'

const NftProgressSimple = () => {
  const TranslateString = useI18n()
  const { isInitialized, totalSupply, maxSupply } = useContext(NftProviderContext)

  return (
    <Card>
      <CardBody>
        <InfoRow>
          <Text>{TranslateString(999, 'Total Special Chef NFTs Claimed')}:</Text>
          <Text>
            <strong>{!isInitialized ? '...' : `${totalSupply}/${maxSupply}`}</strong>
          </Text>
        </InfoRow>
      </CardBody>
    </Card>
  )
}

export default NftProgressSimple
