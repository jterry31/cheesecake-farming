import React from 'react'
import styled from 'styled-components'
import { Text, Toggle } from 'uikit'

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 20px;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  ${Text} {
    margin-left: 8px;
  }
  `

const FarmTabButtons = ({ stakedOnly, setStakedOnly }) => {

  return (
    <Wrapper>
      <ToggleWrapper>
        <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
        <Text ml="8px">Staked only</Text>
      </ToggleWrapper>
    </Wrapper>
  )
}

export default FarmTabButtons