import { Nft } from './types'

// export const NftFarm = '0x08d2cBc5EFd1B56034F4628bB32e947C0d86BbB1'
export const NftFarm = '0x1d8d7326ee2199b5a01617fc295306d31afcfd1c'
export const chefNFT = "0x45ded84f2aCEb9675275758f5F08EE3C5D777736"
// export const NFT = '0x3F7C7C24fFA2ceFfaACE11B39D5b8a575A4B0674'
export const NFT = '0xb107949A297555D713bb403b7f96223c6EF97Be7' // CCAKE NFT Contract
export const AMOUNT_TO_CLAIM = '10'

const Nfts: Nft[] = [
  {
    name: 'Chef Series',
    metadata: 'unassigned.json',
    artistName: '@CheesecakeSwap Team',
    artistUrl: 'https://twitter.com/CheesecakeSwap',
    description: 'Another lovely and infatuating collection; this time featuring our special pastry chef!!! Just mint and see for yourself!',
    previewImage: 'public/images/mysterybox.png',
    viewImage: 'public/images/mysterybox.png',
    originalImage: 'public/images/mysterybox.png',
    fileType: 'png',
    blurImage: '',
    sortOrder: 0,
    nftId: 0,
    tokenAmount: 10,
    tokenSupply: 10000,
    nftFarmContract: '0x1d8d7326ee2199b5a01617fc295306d31afcfd1c',
    nftContract: '0xb107949A297555D713bb403b7f96223c6EF97Be7',
  }
]

export default Nfts

