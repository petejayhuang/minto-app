import React, { Component } from "react";
import styled from "styled-components";

import { colors } from "../styles/styleVariables";

const Container = styled.div`
  position: fixed;
  background-color: white;
  height: 50px;
  border-bottom: 1px solid ${colors.border};
  top: 0;
  width: 100vw;
  .inner-container {
    min-width: 360px;
  }
`;

class MobileTopNav extends Component {
  render() {
    return (
      <Container className="d-flex-row justify-content-center">
        <div className="inner-container d-flex-row justify-content-between align-content-center">
          <div>Settings 1</div>
          <div>Settings 2</div>
        </div>
      </Container>
    );
  }
}

export default MobileTopNav;
