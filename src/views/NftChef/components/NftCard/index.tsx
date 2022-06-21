import React, { useState, useContext, useCallback, useEffect } from 'react'
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
  LinkExternal,
  Input
} from 'uikit'

import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useMatchBreakpoints } from "uikit/hooks";
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import { AMOUNT_TO_CLAIM } from 'config/constants/nfts'
import { useHistory } from 'react-router-dom'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import { getNftContract, getNftMintingContract, getChefContract } from '../../utils/contracts'
import ClaimNftModal from '../ClaimNftModal'
import BurnNftModal from '../BurnNftModal'
import TransferNftModal from '../TransferNftModal'

interface NftCardProps {
  nft: Nft
}

const Header = styled(InfoRow)`
  min-height: 44px;
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

const ViewNft = styled(Text)`
  @media (max-width: 1300px) {
    font-size: 11px;
  }
`
const SmallCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
  border-radius: 64px;
`

const StyledInput = styled(Input)`
  border-radius: 16px;
  margin-left: auto;
  &::placeholder {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
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

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: false,
    nftCount: 0,
    nftBurnCount: 0,
  })

  const TranslateString = useI18n()
  const {
    reInitialize,
    chefBalance,
    maxSupply,
    totalSupply,
    baseURI,
    chefName,
    chefPrice,
    saleIsActive,
    symbol
  } = useContext(NftProviderContext)
  const { account } = useWallet()
  const history = useHistory()


  // maxMintPerNft limit max amount that a nft can be minted
  // maxMintByNft array containing individual amount of mint per nft index
  // prices array containing individual prices of a mint per nft index
  // tokenPerBurn global price

  const [chefAmount, setChefAmount ] = useState(0)
  // const [totalPrice, setTotalPrice ] = useState(0.0)
  const chefContract = getChefContract()
  
  const { nftId, name, fileType, previewImage, viewImage, originalImage, description, tokenAmount, tokenSupply, artistName, artistUrl } = nft


  const firstCharOfAccount = account != null && account.slice(0, 4)
  const lastCharOfAccount = account != null && account.slice(-4)

  const accountName = account != null && `${firstCharOfAccount}...${lastCharOfAccount}`

  const loggedIn = account !== null

  // console.log('?hasClaimed', hasClaimed)
  // console.log('?ownerById', ownerById)


  

  // const walletCanClaim = maxMintPerNft === 0 || MINTED === undefined || MINTED < MAX_MINT


  // console.log('CONTRACT/GALLERY INFO:', totalSupplyDistributed, rarity, priceMultiplier, maxMintPerNft, tokenPerBurn)
  // console.log('LIMITS BY NFT:', tokenPerBurn, amounts, maxMintByNft, prices)
  // console.log(nftId, 'walletCanClaim', walletCanClaim, maxMintPerNft, MINTED, MAX_MINT)

  const tokenIds = [1,2,3] // DUNMT

 
  const priceChangesAt = 4
  let totalPrice = 0.0

  if(+totalSupply + +chefAmount > +priceChangesAt) {
    const expensiveCount = (+totalSupply + +chefAmount) - +priceChangesAt
    const cheapCount = +chefAmount - +expensiveCount

    const expensivePrice = expensiveCount * 2 * chefPrice
    const cheapPrice = cheapCount * chefPrice
   
    totalPrice = parseFloat((+cheapPrice + +expensivePrice).toFixed(3))
    
    console.log(cheapCount, cheapPrice, expensiveCount, expensivePrice, totalPrice)
  }

  else totalPrice = chefAmount * chefPrice
  
  let mintText = "Mint ".concat(chefAmount.toString(), " Chef(s) for ", totalPrice.toString() ," MATIC")

  if (+totalSupply + +chefAmount >= +maxSupply)
    mintText = "Exceeded Max Supply of ".concat(maxSupply.toString())
  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

  const fetchDetails = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {

      // const maxMint = await getNftMintingContract().methods.(nftId).call()
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

  const handleAmountChange = event => {
    event.preventDefault();
    if(event.target.value) {
      setChefAmount(parseInt(event.target.value))
    }
    else
      setChefAmount(0)
  };

  const [onPresentClaimModal] = useModal(<ClaimNftModal nft={nft} chefAmount={chefAmount} totalPrice ={totalPrice} onSuccess={handleSuccess} />)
  const [onPresentBurnModal] = useModal(<BurnNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />)
  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  )

  return (
    <SmallCard isActive={false}>
      {fileType === 'mp4' && (
        <video height="100%" width="100%" loop autoPlay muted>
          <source src="/images/mysterybox.png" type="video/mp4" />
          <track kind="captions" />
        </video>
      )}
      {fileType !== 'mp4' && (
        <Image src="/images/mysterybox2.png" alt={name} originalLink={null}  />
      )}
      <CardBody>
        <Header>
          <Heading>{chefName}</Heading>
          {saleIsActive === false && (
            <Tag outline variant="failure">
              NOT Active
            </Tag>
          )}
          {!loggedIn && (
            <Tag outline variant="failure">
              Connect Wallet!!
            </Tag>
          )}
          {(totalSupply === maxSupply) && (maxSupply !== 0) && (
            <Tag outline variant="failure">
              Sold Out
            </Tag>
          )}
          {saleIsActive && (totalSupply !== maxSupply) &&  (
            <Tag outline variant="success">
              Available
            </Tag>
          )}
        
        </Header>
        {(totalSupply === maxSupply) && (
          <Button fullWidth disabled onClick={onPresentClaimModal} mt="24px">
            {TranslateString(999, 'All Minted, Max Supply Reached')}
          </Button>
        )}
         {(!loggedIn) && (
          <Button fullWidth disabled onClick={onPresentClaimModal} mt="24px">
            {TranslateString(999, 'Please Connect Your Wallet')}
          </Button>
        )}
        {(+totalSupply < +maxSupply) && loggedIn && (
          <div>
          <Text>
            Please enter how many Chef(s) you want to mint: 
            <StyledInput type="text" scale="sm" color="text" placeholder="Enter amount" value={chefAmount} onChange={handleAmountChange}/>
          </Text>
          
          <Button disabled={chefAmount === 0 || +totalSupply + +chefAmount >= +maxSupply } fullWidth onClick={onPresentClaimModal} mt="24px">
            {mintText} 
          </Button>
          </div>
        )}
     
      </CardBody>
      <CardFooter p="0">
        <DetailsButton endIcon={<Icon width="24px" color="primary" />} onClick={handleClick}>
          {TranslateString(999, 'Details')}
        </DetailsButton>
        {state.isOpen && (
          <InfoBlock>
            <Text as="p" color="backgroundDisabled" mb="16px" style={{ textAlign: 'center' }}>
              {description}
            </Text>
            <InfoRow>
              <Text>{TranslateString(999, 'Number minted')}:</Text>
              <Value>
                {totalSupply}/{maxSupply}
              </Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Owned By Me')}:</Text>
              <Value>{chefBalance}</Value>
            </InfoRow>
            {artistName && artistUrl && (
            <InfoRow>
              <Text>{TranslateString(999, 'Creator')}:</Text>
              <StyledLinkExternal external href={artistUrl}>
                {artistName}
              </StyledLinkExternal>
            </InfoRow>
            )}
          </InfoBlock>
        )}
      </CardFooter>
    </SmallCard>
  )
}

export default NftCard
