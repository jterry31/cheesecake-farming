import styled from 'styled-components'
import { BaseLayout } from 'uikit'

const NftGridMobile = styled(BaseLayout)`
  padding-bottom: 24px;
  padding-top: 24px;

  & > div {
    grid-column: 1 / span 6;

    ${({ theme }) => theme.mediaQueries.sm} {
      grid-column: span 6;
    }
  }
`

export default NftGridMobile
