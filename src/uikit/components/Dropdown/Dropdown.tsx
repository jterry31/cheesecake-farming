import React from "react";
import styled from "styled-components";
import { DropdownProps, PositionProps, Position } from "./types";

const getLeft = ({ position }: PositionProps) => {
  if (position === "top-right") {
    return "100%";
  }
  return "50%";
};

const getBottom = ({ position }: PositionProps) => {
  if (position === "top" || position === "top-right") {
    return "100%";
  }
  return "auto";
};

const DropdownContent = styled.div<{ position: Position }>`
  width: max-content;
  display: none;
  flex-direction: column;
  position: absolute;
  transform: translate(-50%, 0);
  left: ${getLeft};
  bottom: ${getBottom};
  background-color: rgba(161, 85, 107, 0.8); // dark bordeaux color
  box-shadow: ${({ theme }) => theme.shadows.level1};
  padding: 16px;
  max-height: 500px;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  border-radius: ${({ theme }) => theme.radii.small};
  &:hover {
    background-color: #343135;
  }
`;

const Container = styled.div`
  position: relative;
  &:hover ${DropdownContent}, &:focus-within ${DropdownContent} {
    display: flex;
    background-color: rgba(161, 85, 107, 0.9); // dark bordeaux color
  }

`;

const Dropdown: React.FC<DropdownProps> = ({ target, position = "bottom", children }) => {
  return (
    <Container>
      {target}
      <DropdownContent position={position}>{children}</DropdownContent>
    </Container>
  );
};
Dropdown.defaultProps = {
  position: "bottom",
};

export default Dropdown;
