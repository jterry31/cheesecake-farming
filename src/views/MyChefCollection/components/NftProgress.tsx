import React, { useContext } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, OpenNewIcon, Text, Link as UIKitLink, Progress } from 'uikit'
import { MATIC_BLOCK_TIME } from 'config'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import getTimePeriods from 'utils/getTimePeriods'
import formatTimePeriod from 'utils/formatTimePeriod'
import { NftProviderContext } from '../contexts/NftProvider'
import InfoRow from './InfoRow'

const TimeLeft = styled(Heading)`
  margin-bottom: 16px;
  text-align: center;
`

const Link = styled(UIKitLink)`
  text-decoration: underline;
`

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  padding-top: 16px;
  text-align: center;
`

const ProgressWrap = styled.div`
  margin-bottom: 16px;
`

const NftProgress = () => {
  const {
    isInitialized,
    totalSupply,
    maxSupply
  } = useContext(NftProviderContext)
  const TranslateString = useI18n()
  const currentBlock = useBlock()

  return (
    <Card>
      <CardBody>
        <InfoRow>
          <Text>{TranslateString(999, "Total NFT's claimed")}:</Text>
          <Text>
            <strong>{!isInitialized ? '...' : `${totalSupply}/${maxSupply}`}</strong>
          </Text>
        </InfoRow>
      </CardBody>
    </Card>
  )
}

export default NftProgress
