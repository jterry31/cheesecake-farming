import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading, Text } from 'uikit'
import { usePriceCakeUsdc } from 'state/hooks'

export interface PrizeGridProps {
  lotteryPrizeAmount?: number
  pastDraw?: boolean
  jackpotMatches?: number
  twoTicketMatches?: number
  threeTicketMatches?: number
}

const Grid = styled.div<{ pastDraw?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.pastDraw ? 4 : 3)}, 1fr);
  grid-template-rows: repeat(4, auto);
`

const RightAlignedText = styled(Text)`
  text-align: right;
`

const RightAlignedHeading = styled(Heading)`
  text-align: right;
`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '10px')};
`

const PastDrawGridItem = styled(GridItem)`
  transform: translate(-40%, 0%);
`

const PrizeGrid: React.FC<PrizeGridProps> = ({
  lotteryPrizeAmount = 0,
  pastDraw = false,
  jackpotMatches,
  twoTicketMatches,
  threeTicketMatches,
}) => {
  const fourMatchesAmount = +((lotteryPrizeAmount / 100) * 50).toFixed(2)
  const threeMatchesAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(2)
  const twoMatchesAmount = +((lotteryPrizeAmount / 100) * 10).toFixed(2)
  const burnAmount = +((lotteryPrizeAmount / 100) * 20).toFixed(2)
  const TranslateString = useI18n()
  const ccakePriceFour = (usePriceCakeUsdc().toNumber() * fourMatchesAmount).toFixed(2);
  const ccakePriceThree = (usePriceCakeUsdc().toNumber() * threeMatchesAmount).toFixed(2);
  const ccakePriceTwo = (usePriceCakeUsdc().toNumber() * twoMatchesAmount).toFixed(2);
  const ccakePriceBurn = (usePriceCakeUsdc().toNumber() * burnAmount).toFixed(2);

  return (
    <Grid pastDraw={pastDraw}>
      <GridItem>
        <Text fontSize="14px" color="text">
          {TranslateString(999, 'No. Matched')}
        </Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText fontSize="14px" color="text">
            {TranslateString(999, 'Winners')}
          </RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText fontSize="14px" color="text">
          {TranslateString(999, 'Prize Pot')}
        </RightAlignedText>
      </GridItem>
      <GridItem>
        <RightAlignedText fontSize="14px" color="text">
          {TranslateString(999, 'USD')}
        </RightAlignedText>
      </GridItem>
      {/* 4 matches row */}
      <GridItem>
        <Heading size="md">4</Heading>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedHeading size="md">{jackpotMatches}</RightAlignedHeading>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedHeading size="md">{fourMatchesAmount.toLocaleString()} CCAKE </RightAlignedHeading>
      </GridItem>
      <GridItem>
        <RightAlignedHeading size="md">{ccakePriceFour.toLocaleString()}$ </RightAlignedHeading>
      </GridItem>
      {/* 3 matches row */}
      <GridItem>
        <Text bold>3</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText bold>{threeTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText>{threeMatchesAmount.toLocaleString()} CCAKE</RightAlignedText>
      </GridItem>
      <GridItem>
        <RightAlignedHeading size="md">{ccakePriceThree.toLocaleString()}$ </RightAlignedHeading>
      </GridItem>
      {/* 2 matches row */}
      <GridItem marginBottom="20px">
        <Text>2</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem marginBottom="20px">
          <RightAlignedText>{twoTicketMatches}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem marginBottom="20px">
        <RightAlignedText>{twoMatchesAmount.toLocaleString()} CCAKE </RightAlignedText>
      </GridItem>
      <GridItem>
        <RightAlignedHeading size="md">{ccakePriceTwo.toLocaleString()}$ </RightAlignedHeading>
      </GridItem>
      {/* Burn row */}
      <GridItem marginBottom="0">
        <Text>{TranslateString(999, `${pastDraw ? 'Burned' : 'To burn'}`)}:</Text>
      </GridItem>
      {pastDraw ? (
        <>
          <GridItem marginBottom="0" />
          <GridItem marginBottom="0">
            <RightAlignedText>{burnAmount.toLocaleString()} CCAKE </RightAlignedText>
          </GridItem>
        </>
      ) : (
        <GridItem marginBottom="0">
          <RightAlignedText>{burnAmount.toLocaleString()} CCAKE </RightAlignedText>
        </GridItem>
      )}
      <GridItem>
        <RightAlignedHeading size="md">{ccakePriceBurn.toLocaleString()}$ </RightAlignedHeading>
      </GridItem>
    </Grid>
  )
}

export default PrizeGrid
