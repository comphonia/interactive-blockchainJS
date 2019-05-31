import React, { Component } from "react";
import Moment from "react-moment";

export default class Time extends Component {
  render() {
    return <Moment interval={1000} format="h:mm:ss a" />;
  }
}
