import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BigNumber from 'bignumber.js'
import { useTotalValue } from 'state/hooks'
import { LogoIcon } from "../../components/Svg";
import Flex from "../../components/Box/Flex";
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from "./icons";
import MenuButton from "./MenuButton";
import Text from "../../components/Text/Text";

interface Props {
  isPushed: boolean;
  isDark: boolean;
  togglePush: () => void;
  href: string;
  isMobile: boolean;
}

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 250px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`;

const formatNumber = (tokenAmount) => {
  if(new BigNumber(tokenAmount).isGreaterThan(1000000))
    return new BigNumber(tokenAmount).div(1000000).toFixed(2).toString().concat(" M")
  if(new BigNumber(tokenAmount).isGreaterThan(1000))
    return new BigNumber(tokenAmount).div(1000).toFixed(2).toString().concat(" K")
  
  return new BigNumber(tokenAmount).toFixed(2).toString()

}


const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href, isMobile }) => {
  const isAbsoluteUrl = href.startsWith("http");
  const tvl = useTotalValue().toNumber().toFixed(0).toString();
  const tvlFormatted = formatNumber(useTotalValue().toNumber())
  const innerLogo = (
    <>
      <LogoIcon className="mobile-icon" />
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  );

  return (
    <Flex>
      {isMobile && <MenuButton aria-label="Toggle menu" onClick={togglePush} mr="24px">
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color="textSubtle" />
        ) : (
          <HamburgerIcon width="24px" color="textSubtle" />
        )}
      </MenuButton>}
      {isAbsoluteUrl ? (
        <StyledLink as="a" href={href} aria-label="Pancake home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink to={href} aria-label="Pancake home page">
          {innerLogo}
        </StyledLink>
      )}

    {!isMobile && <Text color="textSubtle" mt="2px" mr="8px" fontSize="18px" > TVL: ${tvlFormatted} </Text>}
    {/*
    {!isMobile && tvl.length >7 && <Text color="textSubtle" mt="2px" mr="8px" fontSize="18px" > TVL: ${tvl[0]}{tvl[1]}.{tvl[2]}{tvl[3]} M </Text>}
    {!isMobile && tvl.length === 7 && <Text color="textSubtle" mt="2px" mr="8px" fontSize="18px" > TVL: ${tvl[0]}.{tvl[1]}{tvl[2]} M </Text>}
    {!isMobile && tvl.length === 6 && <Text color="textSubtle" mt="2px" mr="8px" fontSize="18px" > TVL: ${tvl[0]}{tvl[1]}{tvl[2]} K </Text>}
    {!isMobile && tvl.length === 5 && <Text color="textSubtle" mt="2px" mr="8px" fontSize="18px" > TVL: ${tvl[0]}{tvl[1]}.{tvl[2]} K </Text>}
    {!isMobile && tvl.length <= 4 && <Text color="textSubtle" mt="2px" mr="8px" fontSize="18px" > TVL: ${tvl[0]}.{tvl[1]}{tvl[2]} K </Text>}
    */}
    </Flex>
  );
};

export default Logo;
