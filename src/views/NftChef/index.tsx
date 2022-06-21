import React from 'react'
import styled from 'styled-components'
import { Heading, Button } from 'uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import { useHistory } from 'react-router-dom'
import HowItWorks from './components/HowItWorks'
import NftList from './components/NftList'
import NftProvider from './contexts/NftProvider'
import NftInfo from './components/NftInfo'

/* import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/nfts'
import { Nft } from 'config/constants/types'
import { Heading, Button, Text } from 'uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import { useHistory } from 'react-router-dom'
import Select, { OptionProps } from 'components/Select/Select'
import HowItWorks from './components/HowItWorks'
import NftProvider, {  NftProviderContext } from './contexts/NftProvider'
import NftInfo from './components/NftInfo'
import NftCard from './components/NftCard'
import NftGrid from './components/NftGrid'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const CustomButton = styled(Button)`
  margin-right: 20px;
`

const GoldenButton = styled(Button)`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(110, 80, 20, 0.4), inset 0 -2px 5px 1px rgba(139, 66, 8, 1),
    inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
  background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
  border: 1px solid #a55d07;
  color: rgb(120, 50, 5);
  text-shadow: 0 2px 2px rgba(250, 227, 133, 1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-size: 100% 100%;
  background-position: center;

  &:focus,
  &:hover {
    background-size: 150% 150%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23), inset 0 -2px 5px 1px #b17d10,
      inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
    border: 1px solid rgba(165, 93, 7, 0.6);
    color: rgba(120, 50, 5, 0.8);
  }
  &:active {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(110, 80, 20, 0.4), inset 0 -2px 5px 1px #b17d10,
      inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
  }
`

const Nfts = () => {


  const TranslateString = useI18n()
  const history = useHistory()
  const [sortOption, setSortOption] = useState('Price Descending')

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const NftList = () => {
    const {
      nftMaxMints,
      nftSoldCount,
      nftPrices,
    } = useContext(NftProviderContext)

    let i = 0
    for(i=0; i <nftMaxMints.length; i++) {
      
      if (nftMaxMints[i]===nftSoldCount[i]){
        nfts[i].sortOrder=1
      }
      else {
        nfts[i].sortOrder=0
      }
    }

    const sortedNfts = (nftListInput: Nft[]) => {
      switch (sortOption) {
        case 'desc':
          return orderBy(orderBy(nfts, 'tokenAmount', 'desc'),'sortOrder')
        case 'asc':
          return orderBy(orderBy(nfts, 'tokenAmount', 'asc'),'sortOrder')
        case 'nftid':
          return orderBy(nfts, 'nftId')
        default:
          return orderBy(orderBy(nfts, 'tokenAmount', 'desc'),'sortOrder')
      }
    }
    return (
      <NftGrid>
        {sortedNfts(nfts).map((nft) => (
          <div key={nft.name}>
            <NftCard nft={nft} />
          </div>
        ))}
      </NftGrid>
    )
  }

  return (
    <NftProvider>
      <Page>
        <StyledHero>
          <Heading as="h1" size="xxl" color="#5ca269" mb="24px">
           Available Collections
          </Heading>
          <Heading as="h2" size="lg" color="#5ca269">
            {TranslateString(999, 'Trade in for CCAKE, or keep for your collection!')}
          </Heading>
          <CustomButton onClick={() => history.push(`nft`)} mt="24px" mb="16px">
           CCAKE Collection
          </CustomButton>
          <Text ml="8px" color="backgroundDisabled" fontSize="16px"> SORT BY </Text>
          <Select
            options={[
              {
                label: 'Price Descending',
                value: 'desc',
              },
              {
                label: 'Price Ascending',
                value: 'asc',
              },
              {
                label: 'Nft Id',
                value: 'nftid',
              },
            ]}
            onChange={handleSortOptionChange}
          />
          // <CustomButton variant="subtle" onClick={() => history.push(`epic`)} mt="24px">
          //  Base Collections
          // </CustomButton>
          // <GoldenButton onClick={() => history.push(`legendary`)} mt="24px">
          //  Epic Collections
          // </GoldenButton>  
          </StyledHero>

          <NftInfo />
          <NftList />
        </Page>
      </NftProvider>
    )
  }
  
  export default Nfts
*/
  
const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const CustomButton = styled(Button)`
  margin-right: 20px;
`

const GoldenButton = styled(Button)`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(110, 80, 20, 0.4), inset 0 -2px 5px 1px rgba(139, 66, 8, 1),
    inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
  background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
  border: 1px solid #a55d07;
  color: rgb(120, 50, 5);
  text-shadow: 0 2px 2px rgba(250, 227, 133, 1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-size: 100% 100%;
  background-position: center;

  &:focus,
  &:hover {
    background-size: 150% 150%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23), inset 0 -2px 5px 1px #b17d10,
      inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
    border: 1px solid rgba(165, 93, 7, 0.6);
    color: rgba(120, 50, 5, 0.8);
  }
  &:active {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(110, 80, 20, 0.4), inset 0 -2px 5px 1px #b17d10,
      inset 0 -1px 1px 3px rgba(250, 227, 133, 1);
  }
`

const Nft = () => {
  const TranslateString = useI18n()
  const history = useHistory()

  return (
    <NftProvider>
      <Page>
        <StyledHero>
          <Heading as="h1" size="xxl" color="#5ca269" mb="24px">
           Special Chef Collection
          </Heading>
          <Heading as="h2" size="lg" color="#5ca269">
            {TranslateString(999, 'Trade/Sell in any Polygon Marketplace!')}
          </Heading>


        {/* 
         <CustomButton variant="subtle" onClick={() => history.push(`epic`)} mt="24px">
           Base Collections
          </CustomButton>
         
          <GoldenButton onClick={() => history.push(`legendary`)} mt="24px">
           Epic Collections
          </GoldenButton>  */}
        </StyledHero>

        <NftInfo />
        <NftList />
      </Page>
    </NftProvider>
  )
}

export default Nft
