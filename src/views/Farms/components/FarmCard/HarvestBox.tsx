import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, Flex } from 'uikit'
import HarvestAction from './HarvestAction'

interface HarvestBoxProps {
  earnings?: BigNumber
  pid?: number
  earnTokenName: string
}

const Wrapper = styled(Flex)`
  border: ${({ theme }) => theme.colors.borderColor} solid 1px;
  border-radius: 4px;
  padding: 15px 17px;
  margin: 10px;
`

const HarvestBox: React.FC<HarvestBoxProps> = ({ earnings, pid, earnTokenName }) => {
  return (
    <Wrapper>
      <Flex flexDirection="column" justifyContent="space-between">
        <Text fontSize="14px" bold style={{ display: 'flex', justifyItems: 'flex-start', textAlign: 'left' }}>
          Total {earnTokenName} Earned
        </Text>

        <HarvestAction earnings={earnings} pid={pid} />
      </Flex>
    </Wrapper>
  )
}

export default HarvestBox
