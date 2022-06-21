import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const CcakeTicket: React.FC<Record<string, never>> = () => {
  return (
    <Svg viewBox="0 0 90 90">
      <image width="90" height="90" href='/images/ticket.png'/>
    </Svg>
  )
};

export default CcakeTicket;
