import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from 'uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import useGetDocumentTitlePrice from 'hooks/useGetDocumentTitlePrice'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'


// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Chart = lazy(() => import('./views/Chart'))
const Lp = lazy(() => import('./views/Lp'))
const Techrate = lazy(() => import('./views/Techrate'))
const Tvl = lazy(() => import('./views/Tvl'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Dashboard = lazy(() => import('./views/Dashboard'))
const NftChef = lazy(() => import('./views/NftChef'))
const MyChefCollection = lazy(() => import('./views/MyChefCollection'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  useGetDocumentTitlePrice()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/chart">
              <Chart />
            </Route>
            <Route path="/lpcalc">
              <Lp />
            </Route>
            <Route path="/techrate">
              <Techrate />
            </Route>
            <Route path="/tvl">
              <Tvl />
            </Route>
            <Route path="/portfolio">
              <Dashboard />
            </Route>
            <Route path="/nft-chef">
              <NftChef />
            </Route>
            <Route path="/my-chef-collection">
              <MyChefCollection />
            </Route>

            {/* <Route path="/pools"> */}
            {/*  <Pools /> */}
            {/* </Route> */}
            {/* <Route path="/ifo"> */}
            {/*  <Ifos /> */}
            {/* </Route> */}
            {/*
            <Route path="/nft">
              <Nft />
            </Route>
            <Route path="/legendary">
              <Legendary />
            </Route>
            <Route path="/epic">
              <Epic />
            </Route>
            <Route path="/my-nfts">
              <MyCollection />
            </Route>
            <Route path="/my-epic-collection">
              <MyEpicCollection />
            </Route>
            <Route path="/my-legendary-collection">
              <MyLegendaryCollection />
            </Route>
            <Route path="/detail/:id" component={Detail} />
            <Route path="/legendary-detail/:id" component={LegendaryDetail} />
            <Route path="/epic-detail/:id" component={EpicDetail} />
            */}
            {/* Redirect */}
            {/* <Route path="/staking"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
    </Router>
  )
}

export default React.memo(App)
