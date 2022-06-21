import React from 'react'
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
  LogoIcon,
  LinkExternal,
} from 'uikit'

const Image = styled.img`
  margin-right: 16px;
  width: 56px;
`

const Content = styled.div`
  flex: 1;
`

const StyledCardContent = styled.div`
  align-items: start;
  display: flex;
`

const Attributes = ({ attributes }) => {
  const attributeList = []
  for(let i=0; i<attributes.length; i++) 
    attributeList.push(
      <Text as="p" color="backgroundDisabled" style={{ display: "flex"}}>
          {attributes[i].trait_type} : <h3 style={{ color: "black", marginLeft: "5px"}}> {attributes[i].value} </h3>
      </Text>
    )
  
  return (
    <>
      <Text as="p" color="backgroundDisabled" mb="15px" style={{ fontSize: "20px"}}> Chef Attributes </Text>
      {attributeList}
    </>
  ) 
   
}

export default Attributes
