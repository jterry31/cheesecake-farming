import { usePriceCakeUsdc } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  const cakePriceUsdc = usePriceCakeUsdc()

  return totalCake * cakePriceUsdc.toNumber()
}

export default useLotteryTotalPrizesUsd
