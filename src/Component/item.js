import React from 'react'
import axios from "axios";
import swal from "sweetalert"
import ItemUpload from "./itemupload"
import Modal from "./Modal/Modal.component"

export default class Items extends React.Component{
  
 
      constructor(props) {
        super(props);
        this.state = { 
          files: null, 
          name: "",
          title: "",
          price: 0,
          description: "",
          showModal: false,
          Items: [],
          path: window.location.pathname
        }; 

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
        const scrollY =document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = 'auto';
        document.body.style.top = '';
    
     
        this.setState({showModal: false})
      }

      componentDidMount(){
     
var id = this.state.path;
id = id.replace("/category/", "")
        axios.get(`http://test.anchoratechs.com/items?categories=${id}`)
        .then(response => response.data).then(
            (result) => {
                this.setState({
                    Items: result.data
                });
                console.log(result.data)
            },
            (error) => {
                this.setState({ error });
                console.log(error)
            }
        )
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
          let url = 'http://test.anchoratechs.com/upload';
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
    render(){

        return(
            <div className="App pl-2 pr-2 pt-2 pb-2">
            <div className="main">
              <h2>Items</h2>
                  <div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
              
                   <ItemUpload/>
                   {/*GET ITEMS*/}
                   {this.state.Items.map((Item => (
                   <div className="card item-card" key={Item.id} >
                     
                     <div className="skelenton" style={{backgroundImage: `url${Item.image_link}`}}  >
                      
                     </div>
                <div className="card-body mt-2">
                         <p className="item-name">Name: {Item.title}</p>
                          <p className='price' >Price:  {Item.price} </p>
                          <p className="description" > Description: {Item.description} </p>
                        <div className="row ml-0 mr-0 buttons">
                          <button className="btn btns mr-1"  onClick={this.openModal  }><i className="fas fa-pencil-alt"></i>  </button>
                          <Modal show={this.state.showModal} close={this.closeModal} >
                <form className="card diff ml-0 mr-0  "
                onSubmit={
                  this.handleItemUpload = (e) => {
                    e.preventDefault();
                    
                    console.log(this.state);
                    let category = this.state.path
                    category = category.replace("/category/", "")
                    let form_data = new FormData();
                    form_data.append('title', this.state.title);
                    form_data.append('price', this.state.price);
                    form_data.append('description', this.state.description)
                    form_data.append('image', this.state.files)
                    form_data.append('category', category )
                    let url = `http://test.anchoratechs.com/items/${Item.id}`;
                    axios.put(url, form_data, {
                      headers: {
                        'content-type': 'multipart/form-data'
                      }
                    })
                        .then(res => {
                          console.log(res.data);
                          swal("Item Updated Successfully", "", "success")
                          window.location.reload()
                        })
                        .catch(err => console.log(err))
                  }
                }
                >

                    <h4>Edit Item</h4>
            <div className="upload-img" onKeyDown={this.handleSubmit} >
                    <label className="actual-file" style={{cursor: "pointer"}}><img src="/upload.svg" alt="" /><p>Select Image</p>
                       <input type="file"   accept="image/png, image/jpeg, image/jpg"  name="" id="" hidden  />
                     </label>
                  
                   </div>
              <div className="card-body">
                      
                        
                        <input type="text" className="form-control mb-1 mt-2" name="" id="" aria-describedby="helpId" placeholder="Title"onChange={this.handleTitle}  />
                       
                 
                          <textarea className="form-control mb-2" name="" id="" rows="3" placeholder="Enter Description" maxLength="100" onChange={this.handleDescription} value={this.state.description}   ></textarea>
    
                        <input type="number" className="form-control mb-2" name="" id="" aria-describedby="helpId" placeholder="Price" onChange={this.handlePrice} value={this.state.price}  />
            
                     <button className="btn bg-white" type="submit">Press Enter to Submit</button>
                     </div>
            </form>
            
                </Modal>
                          <button className="btn btns"
                                onClick={
                                  this.Delete= (e) => {
                                    fetch(`http://test.anchoratechs.com/items/${Item.id}`, { method: 'DELETE' })
                                    .then(res => res.text()) // or res.json()
                                    .then(res => {
                                      //console.log(res)
                                      swal("Item Deleted")
                                      window.location.reload()
                                    }
                                      )
                                   
                                  }
                                }
                          ><i className="fas fa-trash-alt"></i> </button>
                        </div>
                 
        </div>
      
                    </div>
)))}

                  </div>
               
                 </div>
                </div>
        )
    }
}