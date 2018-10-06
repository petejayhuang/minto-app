import React, { Component } from "react";
import ChevronDownIcon from "../assets/icons/feather-react/ChevronDownIcon";
import XIcon from "../assets/icons/feather-react/XIcon";
import styled from "styled-components";
import { colors } from "../styles/styleVariables";

const Container = styled.div`
  position: relative;
  .input {
    position: relative;
    width: 320px;
    height: 40px;
    border: 2px solid ${colors.primaryLight};
    .icon {
      position: absolute;
      top: 7px;
      right: 5px;
    }
    &:hover {
      cursor: pointer;
    }
  }

  .list {
    border: 2px solid ${colors.primaryLight};
    background-color: white;
    width: 320px;
    position: absolute;
    top: 80px;
    z-index: 1000;
  }

  .item {
    height: 40px;
    border: grey;
    &:hover {
      cursor: pointer;
      background-color: ${colors.background};
    }
  }
`;

class Dropdown extends Component {
  state = {
    dropdownListOpen: false,
    currentValue: "Please select an option"
  };

  toggleDropdown = () => {
    this.setState({
      dropdownListOpen: !this.state.dropdownListOpen
    });
  };

  handleItemSelect = dropdownItem => {
    this.setState({
      dropdownListOpen: false,
      currentValue: dropdownItem.label
    });
    this.props.handleSelect(dropdownItem.value);
  };

  render() {
    const { dropdownListOpen, currentValue } = this.state;
    const { dropdownItems, label } = this.props;

    return (
      <Container>
        <label>{label}</label>
        <div
          className="input pl-2 d-flex align-items-center"
          onClick={this.toggleDropdown}
        >
          <div>{currentValue}</div>
          <div className="icon">
            {dropdownListOpen ? <XIcon /> : <ChevronDownIcon />}
          </div>
        </div>

        {dropdownListOpen && (
          <div className="list">
            {dropdownItems.map(dropdownItem => {
              const { label, value } = dropdownItem;
              return (
                <div
                  key={value}
                  onClick={() => this.handleItemSelect(dropdownItem)}
                  className="pl-2 item d-flex align-items-center"
                >
                  {label}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    );
  }
}

export default Dropdown;
