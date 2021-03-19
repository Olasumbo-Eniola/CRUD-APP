import React from "react"
//import logo from './logo.svg';
//import './App.css';
import axios from "axios";
import swal from 'sweetalert'
import { Link } from "react-router-dom";

export default class Sidebar extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
            name: '',
            categories : [],
            isLoading: false
        }
    }
    handleNameChange = e => {
      this.setState({
          name: e.target.value
      });
    }
    componentDidMount(){
      axios.get(`http://test.anchoratechs.com/categories`)
      .then(response => response.data).then(
          (result) => {
              this.setState({
                  categories: result.data
              });
              console.log(result.data)
          },
          (error) => {
              this.setState({ error });
          }
      )
      this.createHandler = async e => {
        e.preventDefault();
        console.log(this.state)
        try{
          this.setState({
            isLoading: true
        });
          const response = await fetch (`http://test.anchoratechs.com/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.state.name,
          })
          });
          const responseData = await response.json();
          if (!response.ok) {
              throw new Error(responseData.message)
          } else {
          console.log("great")
          this.setState({
            isLoading: true
        });
        swal("Category created successfuly", "", "success")
        window.location.reload()
        }
      }catch (err) {
        this.setState({
          isLoading: false
      });
    console.log(err)
    }
    }
    }
    render(){
        return(
            <div className="sidenav">
            <div className="title">Categories</div>
            { this.state.categories.map(category => 
            <Link className="cat" to={`/category/${category.id}`} key={category.id} >{category.name}</Link>
            )}
          
            <form className="row ml-0 mr-0 new" onSubmit={this.createHandler}  >
              <input type="text" onChange={this.handleNameChange} value={this.state.name} className="form-control cate" name="" id="" aria-describedby="helpId" placeholder="New"/>
              <button className="btn" type="submit">+</button>
            </form>
            
          
          </div>
        )
    }
}