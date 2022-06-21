import React from 'react'
import { Button, Modal, Link, Text } from 'uikit'
import ModalActions from 'components/ModalActions'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 16px;
`

const RoutingWarningModal: React.FC<{ onDismiss?: () => void }> = ({ onDismiss }) => {
  const TranslateString = useI18n()
  const text = "In our previous announcement, we stated that \"when the right time comes\" we will " + 
              " switch to Pancake's new exchange router v2. According to our reviews, the right time " +
              " has come and we are starting the migration process."

  const text2 = " The process starts on May 2 at 09:00 GMT and from this date forward, CCAKE awards " + 
                 " will be distributed for V2 LPs. You have to manually switch between 09:00 - 21:00 " + 
                 " to switch to the new version without paying a deposit fee. Our AMM will also be " + 
                 " supporting both v2 (current) Pancake Router and v1 (old) Pancake Router versions, during and after the migration process. " + 
                 " You can get help from the Telegram group for technical support. "


        

  const text4 = "For anyone who wants to deposit a new LP token to any farm, it's important to remind that we do not currently offer " +
   "any rewards for the LP tokens created from the New Pancake Router since we aren't switching to the new router for the moment. " +
   "If you wish to continue getting rewards, we recommend you use our Exchange to create LP tokens from now on. If not, please "  +
   "make sure the platform you choose for LP token creation uses the Old Pancake Router. If you have any LP tokens in your " +
   "accounts/wallets that is already created from the Old Pancake Router, you can still stake them here."

  return (
    <Modal title='Announcement Regarding Pancake Router Migration' onDismiss={onDismiss}>
       <Text as="p" color="text" mb="16px" mr="4px" style={{ textAlign: 'left' }}>
              {text}
        </Text>
        <br />
        <Text as="p" color="text" mb="16px" style={{ textAlign: 'left' }}>
              {text2}
        </Text>
        <br />
      <StyledLink href="https://cheesecakeswap.gitbook.io/cheesecakeswap/about-new-pancakeswap-exchange-router/pancakeswap-new-exchange-router-migration" target="_blank">
        For more details and FAQ, visit GitBook
      </StyledLink>
      <ModalActions>
        <Button fullWidth onClick={onDismiss}>
          {TranslateString(476, 'I understand')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

const TicketsList = styled.div`
  text-align: left;
  overflow-y: auto;
  max-height: 400px;
  color: ${(props) => props.theme.colors.primary};
`

export default RoutingWarningModal
