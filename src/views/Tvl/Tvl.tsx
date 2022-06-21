import { Flex, Text} from 'uikit'
import React from 'react'
import FullPage from './components/FullPage'
import { useTotalValue } from '../../state/hooks'


const Tvlcard = () => {
  const tvl = useTotalValue().toNumber();
  return(
    <Text> Total Value Locked is: ${tvl} </Text>
  )
}

const Tvl: React.FC = () => {
  
  return (
    <FullPage>
      <Tvlcard />
    </FullPage>
  )
}

export default Tvl