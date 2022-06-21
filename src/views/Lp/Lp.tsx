import React from 'react'
import IFrame from 'views/Trade'
import FullPage from './components/FullPage'

const Lp: React.FC = () => {
  return (
    <FullPage>
      <IFrame
        title="lp"
        url="https://lp.cheesecakeswap.com/"
      />
    </FullPage>
  )
}

export default Lp