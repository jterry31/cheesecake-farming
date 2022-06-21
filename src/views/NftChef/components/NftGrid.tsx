import styled from 'styled-components'
import { BaseLayout } from 'uikit'

const NftGrid = styled(BaseLayout)`
  padding-bottom: 24px;
  padding-top: 24px;

  & > div {
    grid-column: 1 / span 1;

    ${({ theme }) => theme.mediaQueries.sm} {
      grid-column: span 12;
    }
  }
`

export default NftGrid
