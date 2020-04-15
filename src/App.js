import React, { Component } from 'react';
import './App.css';
import PieChart from './PieChart';
import BarChart from './BarChart';
import Pyramid from './Pyramid';
import Semicircle from './Semi-circle';



export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      items: [
        {name: "Food", value: "200", key: "1"},
        {name: "Cloth", value: "300", key: "2"},
        {name: "Supply", value: "100", key: "3"},
        {name: "Water", value: "250", key: "4"},
        {name: "Fuel", value: "150", key: "5"},
      ],
      template: [],
      charts: "",
    
    }
    this.addItem = this.addItem.bind(this);

  }

  // click the dropdown list to change the value and create different tamplate based on differet values
  select(e){
    this.setState({
      charts: e.target.value
    })
  }

  // Add new data to the table
  addItem(e){
    if(this.inputElement.value && this.inputValue.value !== ""){
      var newItem = {
          name: this.inputElement.value,
          value: this.inputValue.value,
          key: Date.now(),
      };

      this.setState((prevState) => {
          return {
              items: prevState.items.concat(newItem),
              newData: this.state.items.concat(newItem)
          };
      });

      this.inputElement.value = "";
      this.inputValue.value = "";
  }
  e.preventDefault();
  }

  // Delete data
  deleteItem(key){
    var filteredItems = this.state.items.filter(item => {
        return (item.key !== key);
    });

    this.setState({
        items: filteredItems
    });
  }

  // Show Chart on the right side
  showChart(e){
    let chart = this.state.charts;
    let data = this.state.items;

    // when the value eqauls "pie", generate piechart
    if(chart === "pie"){
      this.setState({
        template: [
          ...this.state.template,
          <PieChart data={data} />,
          
        ]
      })
    }

    // when the value eqauls "semi-circle", generate Semi-circle chart
    if(chart === "semi-circle"){
      this.setState({
        template: [
          ...this.state.template,
          <Semicircle data={data}/>
        ]
      })
      
    }

    // when the value eqauls "bar", generate barchart
    if(chart === "bar"){
      this.setState({
        template: [
          ...this.state.template,
          <BarChart data={data}/>
        ]
      })
    }

    // when the value eqauls "pyr", generate pyramid
    if(chart === "pyr"){
      this.setState({
        template: [
          ...this.state.template,
          <Pyramid data={data}/>
        ]
      })
    }
  }

  render() {

    let entry = this.state.items;
    

    return (
      <div className="main">
        <div className="leftContent">
          {/* Dropdown Button */}
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton"
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                    style={{marginTop: 60, padding: 10}}
            >
            Template Select Dropdown
            </button>

            {/* Click dropdown list to change the templates */}
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{width: "100%"}} >
              <button className="dropdown-item" type="button" value="pie" onClick={(e) => this.select(e)}>Pie Chart</button>
              <button className="dropdown-item" type="button" value="semi-circle" onClick={(e) => this.select(e)}>Semi Circle</button>
              <button className="dropdown-item" type="button" value="bar" onClick={(e) => this.select(e)}>Bar Chart</button>
              <button className="dropdown-item" type="button" value="pyr" onClick={(e) => this.select(e)}>Pyramid</button>
            </div>
          </div>

          {/* Datatable */}
          {/* datatable to show data */}
          <div className="datatable">
            <table className="data-table">
            <tbody>
            <tr>
                <th>Name</th>
                <th>Value</th>
                <th style={{width: 80}}>Option</th>
            </tr>
            {entry.map(item => {
                return (
                    <tr key={item.key}>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                        <td>
                          <button type="button" className="btn btn-secondary" onClick={() => this.deleteItem(item.key)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="twoButtons">
            {/* Add Data Button */}
            <button type="button" className="addData btn btn-primary" data-toggle="modal" data-target="#modalForm">Add Data</button>

              {/* Modal */}
              {/* when click "add data" button, a modal will show up and allow user to insert new data */}
              <div className="modal fade" tabIndex="-1" id="modalForm" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    
                    <div className="modal-header">
                      <h5 className="modal-title" id="modalFormLabel">Add Data</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={this.addItem}>
                        <div className="form-group">
                          <label className="col-form-label">Name:</label>
                          {/* allow user to insert new name */}
                          <input type="text" className="form-control" ref={(a) => this.inputElement = a}/>
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">Value:</label>
                          {/* allow user to insert new value */}
                          <input type="number" className="form-control" ref={(a) => this.inputValue = a}/>
                        </div>
                        <div>
                          <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>Add</button>
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                      </form>
                    </div>
                    
                  </div>
                </div>
              </div>
            
            {/* Submit Button */}
            <button className="submitData btn btn-primary" type="button" onClick={() => this.showChart()} 
            >Submit</button>
          </div>
        </div>
        
        <div className="rightContent">
          <div className="chart-container">
            {this.state.template.map((temp, i) => {
              return (
                <div className="chart" key={i}>
                  {temp}
                  {console.log(i)}
                </div>
                )
            })}
          </div>  
      </div>
      </div>

    )
  }
}

export default App

