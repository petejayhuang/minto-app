import React from "react";
import styled from "styled-components";
import { colors } from "../styles/styleVariables";

const Container = styled.div`
  background-color: ${colors.background};
  margin-bottom: 50px;
`;

const RouteContainer = ({ children }) => {
  return <Container className="">{children}</Container>;
};

export default RouteContainer;
