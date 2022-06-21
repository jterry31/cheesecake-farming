import { useEffect } from 'react'
import { usePriceCakeUsdc } from 'state/hooks'

const useGetDocumentTitlePrice = () => {

  const cakePriceUsd = usePriceCakeUsdc().toNumber()

  const cakePriceUsdString =
    Number.isNaN(cakePriceUsd) || cakePriceUsd === 0
      ? ''
      : ` - $${cakePriceUsd.toLocaleString()}`

  useEffect(() => {
    document.title = `Cheesecake Swap${cakePriceUsdString}`
  }, [cakePriceUsdString])
}

export default useGetDocumentTitlePrice