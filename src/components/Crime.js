import React, { Component } from "react";
import { fetchCrime, fetchForce, fetchApi } from "../config/api";
class List extends Component {
  constructor() {
    super();
    this.state = {
      // list: ["pakistan", "india", "New Zealand", "Austrlia", "japan", "kenya"],
      result: [],
      crime: [],
      loading: false,
      crimeapi: [],
      limit: 10,
      selectedCrime: "",
      selectedForce: ""
    };
    this.onCrimeChangeHanlder = this.onCrimeChangeHanlder.bind(this);
    this.onForceChangeHanlder = this.onForceChangeHanlder.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  onCrimeChangeHanlder(event) {
    this.setState({
      selectedCrime: event.target.value
    });
  }

  onForceChangeHanlder(event) {
    this.setState({
      selectedForce: event.target.value
    });
  }

  handleSubmit = async event => {
    const { selectedCrime, selectedForce } = this.state;
    // event.preventDefault();
    const forceAp = await fetchApi(selectedCrime, selectedForce);
    this.setState({
      crimeapi: forceAp
    });

    // alert(this.state.selectedCrime);
    // console.log("Your favorite flavor is: " + this.state.value);
  };
  async getData() {
    // this.setState({ loading: true });
    try {
      const crimeData = await fetchCrime();
      const forceData = await fetchForce();
      //const forceAp = await fetchApi();
      console.log(forceData, crimeData);
      this.setState({
        result: crimeData,
        crime: forceData
        //crimeapi: forceAp
      });
    } catch (e) {
      console.log(e.target.value);
    }
  }
  more() {
    this.setState({
      limit: this.state.limit + 15
    });
  }

  render() {
    const { result, crime, crimeapi, limit } = this.state;
    const temp = [...crimeapi];
    console.log("temp", temp);
    console.log("crimeapi", crimeapi);
    console.log("result", result);
    console.log("crime", crime);
    // console.log("crimeapi", crimeapi);
    temp.length = limit;
    // const arr = text.length ? result : list;
    // console.log(result);
    // console.log(crimeapi);
    return (
      <div>
        <div className="container">
          <h1 className="display-4 " style={{ paddingTop: 40, textAlign: 'center' }}>
            Crime Search
          </h1>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <span>
                Crime
                <select
                  className="custom-select"
                  onChange={this.onCrimeChangeHanlder}
                 
                >
                  <option  value="0">
                    select
                  </option>
                  {result.map((n, index) => {
                    return (
                      <option key={index} value={n.url}>
                        {n.name }
                      </option>
                    );
                  })}
                </select>
              </span>
            </div>
            <div className="col">
              <span>
                Force
                <select
                  className="custom-select"
                  onChange={this.onForceChangeHanlder}
                  defaultValue={"DEFAULT"}
                 
                >
                  <option  value="0">
                    select
                  </option>

                  {crime.map((n, index) => {
                    return (
                      <option key={index} value={n.id}>
                        {n.name}
                      </option>
                    );
                  })}
                </select>
              </span>
            </div>
          </div>

          <input
            className="btn btn-success btn-block"
            style={{ marginTop: 10, marginBottom: 20 }}
            disabled={
              this.state.selectedCrime === "" || this.state.selectedForce === ""
                ? true
                : false
            }
            type="submit"
            value="Submit"
            onClick={() => this.handleSubmit()}
          />
        </div>
        <div className="container">
          <div className="table-responsive">
            <table className="table table-fixed" >
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Categories</th>
                  <th scope="col">Categories (Outcome Status)</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {temp.map((e, index) => {
                  return (
                    // console.log(e)
                    <tr key={index}>
                      <td>{e.id}</td>
                      <td>{e.category}</td>
                      <td>{e.outcome_status.category}</td>
                      <td>{e.outcome_status.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              disabled={crimeapi.length === 0 ? true : false}
              className="btn btn-success btn-block"
              onClick={this.more.bind(this)}
            >
              More
            </button>
            <div style={{ paddingBottom: 80 }} />
          </div>
        </div>
      </div>
    );
  }
}

export default List;
