import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'
import useI18n from 'hooks/useI18n'

const Wrapper = styled.div`
  display: flex;
  margin: 36px 0 28px;
`

const LegendItem = styled.div`
  display: flex;
  margin-right: 18px;
  align-items: center;
`

const PoolCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(125, 67, 84, 1);
  margin-right: 6px;
`
const TicketCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-image: url('/images/ticket.svg');
  margin-right: 6px;
`

const BurnCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #fd8232;
  margin-right: 6px;
`

const Legend = () => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <LegendItem>
        <PoolCircle />
        <Text>{TranslateString(999, 'Pool Size')}</Text>
      </LegendItem>
    </Wrapper>
  )
}

export default Legend
