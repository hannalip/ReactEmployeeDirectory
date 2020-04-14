import React, { Component } from "react";
import Table from "./table";
import API from "../utils/API";

class Search extends Component {
  state = {
    search: "",
    sort: "",
    results: [],
  };

  componentDidMount() {
    API.getUsers()
    .then((res) => this.setState({ results: res.data.results }))
    .catch((err) => console.log(err));
  }

 
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({ search: event.target.value });
  };



  handleSort = () => {
    if (this.state.sort === "descending" || this.state.sort !== "ascending") {
      this.setState({ sort: "ascending" });
      
    } else if (this.state.sort === "ascending" || this.state.sort !== "descending") {
      this.setState({ sort: "descending" });
    }
  };


  render() {
    let filteredNames = this.state.results.filter((employee) => {
      return (
        employee.name.first
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    const ascending = (begining, end) => {
      const employeeFirst = begining.name.last.toUpperCase();
      const employeeLast = end.name.last.toUpperCase();
      let compare = 0;
      if (employeeFirst > employeeLast) {
        compare = 1;
      } else if (employeeFirst < employeeLast) {
        compare = -1;
      }
      return compare * 1;
    };

    const descending = (begining, end) => {
      const employeeFirst = begining.name.last.toUpperCase();
      const employeeLast = end.name.last.toUpperCase();
      let compare = 0;
      if (employeeFirst > employeeLast) {
        compare = 1;
      } else if (employeeFirst < employeeLast) {
        compare = -1;
      }
      return compare * -1;
    };

    if (this.state.sort === "ascending") {
      filteredNames.sort(ascending);
    } else if (this.state.sort === "descending") {
      filteredNames.sort(descending);
    }

    return (
      <>
        <form className="form-inline searchbar">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="First Name"
            value={this.state.search}
            name="search"
            onChange={this.handleInputChange.bind(this)}
          />
        </form>
        <div className="table-content">
          <div className="row">
            <div className="col-md-1 headings">Photo ID</div>
            <div className="col-md-1 headings">Frist Name</div>
            <div className="col-md-2 headings">Last Name
              <button className="btn" onClick={this.handleSort}>
    
              </button>
            </div>
            <div className="col-md-2 headings">Phone Number</div>
            <div className="col-md-3 headings">Email</div>
            <div className="col-md-1 headings">Location</div>
            <div className="col-md-2 headings">Birthday</div>
          </div>
          <div>
            <Table filteredNames={filteredNames} />
          </div>
        </div>
      </>
    );
  };
};

export default Search;