import React, { useState, useContext, useCallback } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
  LogoIcon,
  LinkExternal,
} from 'uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useTokenJSON } from 'hooks/useBuyLottery'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import { AMOUNT_TO_CLAIM } from 'config/constants/nfts'
import Page from 'components/layout/Page'
import InfoRow from '../InfoRow'
import Attributes from '../Attributes'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import { getNftContract, getChefContract } from '../../utils/contracts'
import ClaimNftModal from '../ClaimNftModal'
import BurnNftModal from '../BurnNftModal'
import TransferNftModal from '../TransferNftModal'

interface NftCardProps {
  nft: Nft
  tokenID: number
}

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const Header = styled(InfoRow)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text', fullWidth: true })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled.div`
  padding: 0 24px 24px;
`

const Value = styled(Text)`
  font-weight: 600;
`

const SmallCard = styled(Card)`
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  // color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const NftCard: React.FC<NftCardProps> = ({ nft, tokenID }) => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: true,
    nftCount: 0,
    nftBurnCount: 0,
  })
  const TranslateString = useI18n()
  const {
    reInitialize,
    baseURI,
  } = useContext(NftProviderContext)
  const { account } = useWallet()

  // console.log('CONTRACT/GALLERY INFO:', totalSupplyDistributed, rarity, priceMultiplier, maxMintPerNft, tokenPerBurn)
  // console.log('LIMITS BY NFT:', tokenPerBurn, amounts, maxMintByNft, prices)

  // maxMintPerNft limit max amount that a nft can be minted
  // maxMintByNft array containing individual amount of mint per nft index
  // prices array containing individual prices of a mint per nft index
  // tokenPerBurn global price

  // console.log(ownerById)

  const { nftId, name, previewImage, viewImage, originalImage, fileType, description, metadata, tokenAmount, tokenSupply, artistName, artistUrl } = nft

  const firstCharOfAccount = account != null && account.slice(0, 4)
  const lastCharOfAccount = account != null && account.slice(-4)

  const accountName = account != null && `${firstCharOfAccount}...${lastCharOfAccount}`

  const loggedIn = account !== null

  // console.log('?hasClaimed', hasClaimed)
  // console.log('?ownerById', ownerById)

  const tokenIds = [1,2,3] // DUMMY
  const walletOwnsNft = tokenIds && tokenIds.length > 0
  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

  const base = "https://ipfs.io/ipfs/"
  const tokenURI = baseURI.concat(tokenID.toString())
  const tokenInfo = useTokenJSON(tokenURI)

  console.log("Token Info: ", tokenInfo, " Base URI: ", baseURI)
  let imageURI = ""

  if(tokenInfo) {
    imageURI = base.concat(tokenInfo.image.split("/")[2], "/", tokenID.toString(), ".png")
    console.log("Image URI: ", imageURI)
    const attributes = tokenInfo.attributes
    for(let i=0; i<attributes.length; i++)
      console.log(attributes[i].trait_type, attributes[i].value)
  }
    
  
  const fetchDetails = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      
      const nftsCount = 5 // DUMMY
      const nftsBurnCount = 5 // DUMMY

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        isDataFetched: true,
        nftCount: nftsCount,
        nftBurnCount: nftsBurnCount,
      }))
    } catch (error) {
      console.error(error)
    }
  }, [])
  

  const handleClick = async () => {
    if (state.isOpen) {
      setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
    } else {
      try {
        await fetchDetails()
      } catch (error) {
        console.error(error)
      } finally {
        setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
      }
    }
  }

  const handleSuccess = () => {
    fetchDetails()
    reInitialize()
  }

  const [onPresentClaimModal] = useModal(<ClaimNftModal nft={nft} onSuccess={handleSuccess} />)
  const [onPresentBurnModal] = useModal(<BurnNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />)
  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenIds={tokenIds} tokenID={tokenID} onSuccess={handleSuccess} />,
  )


  if (loggedIn && tokenInfo) {
    return (
      <SmallCard isActive>
        <Image src={imageURI} alt={name} originalLink={imageURI} />
        <CardBody>
          <Header>
            <Heading>{tokenInfo.name}</Heading>
            {loggedIn && (
              <Tag outline variant="secondary">
                {TranslateString(999, 'In Wallet')}
              </Tag>
            )}
          </Header>
          {loggedIn && (
            <Button fullWidth variant="primary" mt="24px" onClick={onPresentTransferModal}>
              {TranslateString(999, 'Transfer')}
            </Button>
          )}
        </CardBody>
        <CardFooter p="2">
          {state.isOpen && (
            <InfoBlock>
              <Text as="p" color="backgroundDisabled" mb="16px" style={{ textAlign: 'center', fontSize: "25px" }}>
                {tokenInfo.description}
              </Text>

              <Attributes attributes={tokenInfo.attributes} />
            
              <InfoRow>
                <Text mt="30px">{TranslateString(999, 'Creator')}:</Text>
                <StyledLinkExternal mt="30px" external href="https://twitter.com/CheesecakeSwap">
                  CheesecakeSwap Team
                </StyledLinkExternal>
              </InfoRow>
           
            </InfoBlock>
          )}
        </CardFooter>
      </SmallCard>
    )
  }

  return (
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Text mb="16px">{TranslateString(999, 'loading...')}</Text>
      </StyledNotFound>
    </Page>
  )
}

export default NftCard
