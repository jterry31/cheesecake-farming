import { MenuEntry } from 'uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'FarmIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        icon: 'HomeIcon',
        href: 'https://polyexchange.cheesecakeswap.com/',
      },
      {
        label: 'Liquidity',
        icon: 'HomeIcon',
        href: 'https://polyexchange.cheesecakeswap.com/#/pool',
      },
    ],
  },
  {
    label: 'Farms & Pools',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Tools',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Price Chart',
        icon: 'GraphIcon',
        href: '/chart'
      },
      {
        label: 'Portfolio',
        icon: 'GraphIcon',
        href: '/portfolio'
      },
      {
        label: 'ApeSwap Analytics',
        icon: 'GraphIcon',
        href: 'https://polygon.info.apeswap.finance/token/0xbc2597d3f1f9565100582cde02e3712d03b8b0f6'
      },
    ] 
  },
  {
    label: 'NFT',
    icon: 'NFTIcon',
    items: [
      {
        label: 'NFT Collections',
        icon: 'NftIcon',
        href: '/nft-chef',
      },
      {
        label: 'My NFTs',
        icon: 'NftIcon',
        href: '/my-chef-collection',
      },
    
    ] 
  },
  {
    label: 'Network',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Polygon',
        icon: 'HomeIcon',
        href: 'https://polygon.cheesecakeswap.com',
      },
      {
        label: 'BSC',
        icon: 'HomeIcon',
        href: 'https://app.cheesecakeswap.com',
      },
      {
        label: 'Bridge',
        icon: 'HomeIcon',
        href: 'https://anyswap.exchange/bridge',
      },
    ],
  },
]

export default config
