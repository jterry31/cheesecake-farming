import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <path d="M0 10H6V16H0z M0 19.917H6V25.917H0z M0 30.084H6V36.084H0z M10 10H48V16H10z M10 19.917H48V25.917H10z M10 30.084H48V36.084H10z" />
    </Svg>
  );
};

export default Icon;
