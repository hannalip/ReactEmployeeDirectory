import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4">Employee Directory</h1>
          <p>
            Use the search box to narrow your results, or click the arrow to
            filter.
          </p>
        </div>
      </div>
    );
  }
}

export default Header;