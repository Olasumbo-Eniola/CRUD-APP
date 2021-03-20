import React from "react"
//import logo from './logo.svg';
//import './App.css';
import axios from "axios";
import swal from '@sweetalert/with-react'
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal.component"

export default class Sidebar extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
          showModal: false,
            name: '',
            categories : [],
            isLoading: false
        }
    }
    openModal = (e) => {
      // prevent scroll on body when modal is open
      const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
      document.body.style.position = 'fixed';
      document.body.style.width = '100vw';
      document.body.style.top = `-${scrollY}`; 
  
      e.preventDefault();
  
      this.setState({showModal: true})
    }
    closeModal = () => {
      //make body scrollable again
     // const scrollY =document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = 'auto';
      document.body.style.top = '';
  
   
      this.setState({showModal: false})
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
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name": this.state.name })
    };
        return(
            <div className="sidenav">
            <div className="title">Categories</div>
            { this.state.categories.map(category => (
              <div className="row ml-0 mr-0 category" key={category.id} >
                <div><Link to={`/category/${category.id}`} className="cat hvr-grow">{category.name} </Link></div>
                <button className="icon-1 btn hvr-grow" onClick={this.openModal  }><i className="fas fa-pencil-alt"></i> </button>
                <Modal show={this.state.showModal} close={this.closeModal} >
                <form className="row ml-0 mr-0 p-3 " onSubmit={this.Update = (e) => {
  e.preventDefault()
  fetch(`http://test.anchoratechs.com/categories/${category.id}`, requestOptions)
  .then(response => response.json())
.then(data =>{
  swal("Category name updated" ,"", "success")
  window.location.reload()
}) 
.catch(err => console.log(err)) 
}}  >
              <input type="text" onChange={this.handleNameChange} value={this.state.name} className="form-control " name="" id="" aria-describedby="helpId" placeholder="Edit Category"/>
              <button className="btn" type="submit">Update</button>
            </form>
            
                </Modal>
                
                <button className="icon btn hvr-grow"
                onClick={
                  this.Delete= (e) => {
                    fetch(`http://test.anchoratechs.com/categories/${category.id}`, { method: 'DELETE' })
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                      console.log(res)
                      swal("Category Deleted successfully", "", "success")
                      window.location.reload()
                    }
                      )
                   
                  }
                }
                ><i className="fas fa-trash-alt"></i> </button>
              </div>
             ) )}
          
            <form className="row ml-0 mr-0 new" onSubmit={this.createHandler}  >
              <input type="text" onChange={this.handleNameChange} value={this.state.name} className="form-control cate" name="" id="" aria-describedby="helpId" placeholder="New"/>
              <button className="btn" type="submit">+</button>
            </form>
            
          
          </div>
        )
    }
}