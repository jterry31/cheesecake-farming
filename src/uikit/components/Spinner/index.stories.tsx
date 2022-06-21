import React from "react";
import Spinner from "./Spinner";

export default {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {},
};

export const Default: React.FC = () => {
  const size= 128;
  return <Spinner size={size} />;
};
