import React from 'react'
import axios from "axios";
import swal from "sweetalert"

export default class ItemUpload extends React.Component{
  
 
    constructor(props) {
      super(props);
      

  //   )
      this.state = { 
      
        files: null, 
        name: "",
        title: "",
        price: 0,
        description: "",
        isLoading: false,
        category: window.location.pathname
      }; 

    }
handleTitle = (e) => {
  this.setState({title: e.target.value})
}
handlePrice = (e) => {
  this.setState({price: e.target.value})
}
handleDescription = (e) => {
  this.setState({description: e.target.value})
}
handleCategory = (e) => {
  this.setState({category: e.target.value})
}
 
    handleFile = (e) => {
      this.setState({
        files: e.target.files[0]

      })
    };
  handleName=(e)=>{
      this.setState({name: e.target.value})
  }
    
    handleSubmit = (e) => {
     
      console.log(this.state);
      let form_data = new FormData();
      form_data.append('file', this.state.files, this.state.files.name);
      form_data.append('name', this.state.name);
      let url = 'https://test.anchoratechs.com/upload';
      axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log(err))
    };
    handleItemUpload = (e) => {
      e.preventDefault();
      
      console.log(this.state);
      let category = this.state.category
      category = category.replace("/category/", "")
      let form_data = new FormData();
      form_data.append('title', this.state.title);
      form_data.append('price', this.state.price);
      form_data.append('description', this.state.description)
      form_data.append('image', this.state.files)
      form_data.append('category', category )
      let url = 'https://test.anchoratechs.com/items';
      axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
          .then(res => {
            console.log(res.data);
            swal("Item Created Successfully", "", "success")
            window.location.reload()
          })
          .catch(err => console.log(err))
    }
  
  render(){
  
      return(

                  <form className="card" onSubmit={this.handleItemUpload}  >
                   <h4>Create new item</h4>
                   <div className="upload-img" onKeyDown={this.handleSubmit} >
                    <label className="actual-file" style={{cursor: "pointer"}}><img src="/upload.svg" alt="" /><p>Select Image</p>
                       <input type="file"   accept="image/png, image/jpeg, image/jpg"  name="" id="" placeholder="" className="" aria-describedby="fileHelpId" onChange={this.handleFile} required hidden />
                     </label>
                  
                   </div>
              <div className="card-body">
                      
                        <label htmlFor=""></label>
                        <input type="text" className="form-control" name="" id="" aria-describedby="helpId" placeholder="Title"onChange={this.handleTitle}value={this.state.title}  />
                       
                        <label htmlFor=""></label>
                          <textarea className="form-control" name="" id="" rows="3" placeholder="Enter Description" maxLength="100" onChange={this.handleDescription} value={this.state.description}  ></textarea>
                        <label htmlFor=""></label>
                        <input type="number" className="form-control" name="" id="" aria-describedby="helpId" placeholder="Price" onChange={this.handlePrice} value={this.state.price}  />
            

                <small style={{fontSize: "10px"}}>All fields are required</small>
                     <button className="btn bg-white" type="submit">Press Enter to Submit</button>
      </div>
    
                  </form>
                 
      )
  }
}