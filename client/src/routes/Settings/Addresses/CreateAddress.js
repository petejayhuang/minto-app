import React, { Component } from "react";
import { connect } from "react-redux";

import { redirect } from "../../../actions/ui";
import { createAddress } from "../../../actions/addresses";

import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import Dropdown from "../../../components/Dropdown";
import TextInput from "../../../components/TextInput";
import TouchableMenu from "../../../components/TouchableMenu";

class CreateAddresses extends Component {
  state = {
    address_type: "",
    address_name: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    country: "",
    country_code: "",
    primary_YN: null
  };

  handleInputChange = ({ name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();

    const {
      address_type,
      address_name,
      address1,
      address2,
      city,
      postcode,
      country,
      primary_YN
    } = this.state;

    const body = {
      address1,
      address2,
      address_name,
      address_type,
      city,
      country,
      country_code: "UK",
      postcode,
      primary_YN
    };

    const { createAddress, redirect } = this.props;

    console.log("body in <CreateAddress />");

    createAddress(body, () => redirect("/settings/addresses"));
  };

  handleCheckbox = () => {
    console.log("check check!");
    this.setState({ primary_YN: !this.state.primary_YN });
  };

  handleSelect = value => {
    this.setState({ address_type: value });
  };

  render() {
    const {
      address_name,
      address1,
      address2,
      city,
      postcode,
      country
    } = this.state;

    const {
      ui: { loadingLine }
    } = this.props;

    const addressTypeOptions = [
      { label: "Billing Address", value: "billing" },
      { label: "Delivery Address", value: "delivery" }
    ];

    console.log("primary_YN", this.state.primary_YN);
    return (
      <div className="route-container d-flex justify-content-center">
        <form onSubmit={this.handleSubmit} className="d-flex flex-column pt-3">
          <Dropdown
            label="Address Type"
            dropdownItems={addressTypeOptions}
            handleSelect={this.handleSelect}
          />
          <TextInput
            handleChange={this.handleInputChange}
            label="Address Name"
            name="address_name"
            required
            placeholder="e.g. London Home"
            value={address_name}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="Address Line 1"
            name="address1"
            required
            placeholder="e.g. Flat 2"
            value={address1}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="Address Line 2"
            name="address2"
            required
            placeholder="e.g. 222 Shoreditch High St"
            value={address2}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="City"
            name="city"
            required
            placeholder="e.g. London"
            value={city}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="Postcode"
            name="postcode"
            required
            placeholder="e.g. E1 6AX"
            value={postcode}
          />

          <TextInput
            handleChange={this.handleInputChange}
            label="Country"
            name="country"
            required
            placeholder="e.g. United Kingdom"
            value={country}
          />

          <Checkbox
            label="Set as default address"
            handleCheckbox={this.handleCheckbox}
            checked={this.state.primary_YN}
          />

          <Button
            handleSubmit={this.handleSubmit}
            className="mt-2"
            text="Create account"
            submit
            loading={loadingLine}
          />
        </form>
      </div>
    );
  }
}

export default connect(
  ({ ui }) => ({ ui }),
  { createAddress, redirect }
)(CreateAddresses);
