import React from 'react'
import IFrame from 'views/Trade'
import FullPage from './components/FullPage'

const Chart: React.FC = () => {
  return (
    <FullPage>
      <IFrame
        title="chart"
        url="https://goswappcharts.web.app/?isbsc=true&tokenId=0xc7091aa18598b87588e37501b6ce865263cd67ce"
      />
    </FullPage>
  )
}

export default Chart