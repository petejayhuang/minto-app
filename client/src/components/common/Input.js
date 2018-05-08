import React from "react";
import styled from "styled-components";

const StyledInput = styled.div`
  height: 30px;
`;

const Input = () => {
  return <StyledInput className="p-3" type="text" />;
};

export default Input;
