import React from 'react'
import styled from 'styled-components'
import { Text, Tag, Flex } from 'uikit'
import { NoFeeTag, CoreTag, VersionTag } from 'components/Tags'
import useI18n from 'hooks/useI18n'

export interface ExpandableSectionProps {
  isFarming?: boolean
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  tokenSymbol?: string
  pid?: number
  isTokenOnly?: boolean
}

const NoFeeTagWrapper = styled.div`
  font-size: 12px;
  color: #25ff94;
  svg {
    width: 16px;
    height: 16px;
  }
  div {
    border: #25ff94 solid 1px;
    height: 20px;
  }
`



const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  font-size: 16px;
  padding: 0px 12px;
  line-height: 0px;
  color: #000066;
  border: #000066 solid 2.5px;
  background-color: transparent;
  height: 28px;
`

const FarmingTextWrapper = styled.div`
  div {
    height: 22px;
  }
`

const CardHeading: React.FC<ExpandableSectionProps> = ({ isFarming, lpLabel, multiplier, depositFee, pid, isTokenOnly }) => {
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column" alignItems="flex-start" justifyContent="center">
      <FarmingTextWrapper>
        <Text color="#DF4B4C" bold fontSize='16px'>
          {isFarming === true ? TranslateString(10008, 'Farming') : ''}
        </Text>
      </FarmingTextWrapper>
      <Text bold style={{ marginBottom: 4, marginLeft: 10}}>{lpLabel}</Text>
      <Flex justifyContent="left">
        {depositFee === 0 ? (
            <NoFeeTag />
        ) : <CoreTag />}
        {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
        {/* <RiskTag risk={risk} /> */}
        <MultiplierTag>{multiplier}</MultiplierTag>
      </Flex>
    </Flex>
  )
}

export default CardHeading
