import React from 'react'
import axios from "axios";

export default class Items extends React.Component{
    state = { 
        files: null, 
        name: ""
      }; 
      handleFile = (e) => {
        this.setState({
          files: e.target.files[0]

        })
      };
    handleName=(e)=>{
        this.setState({name: e.target.value})
    }
      
      handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('file', this.state.files, this.state.files.name);
        form_data.append('name', this.state.name);
        let url = 'http://test.anchoratechs.com/categories';
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
                  <div className="row ml-0">
                  <div className="card-deck">
                    <form className="card"onSubmit={this.handleSubmit} >
                     
                     <div className="upload-img">
                      <label className="custom-file" style={{cursor: "pointer"}}><img src="./upload.svg" alt="" /><p>Upload Image</p>
                         <input type="file"   accept="image/png, image/jpeg, image/jpg"  name="" id="" placeholder="" className="" aria-describedby="fileHelpId" onChange={this.handleFile} required />
                          <span className="custom-file-control"></span>
                       </label>
                    
                     </div>
                <div className="card-body">
                       {/*   
                          <label htmlFor=""></label>
                          <input type="text" className="form-control" name="" id="" aria-describedby="helpId" placeholder="Title"/>
                          <label htmlFor=""></label>
                          <input type="number" className="form-control" name="" id="" aria-describedby="helpId" placeholder="Price"/>
              
                            <label htmlFor=""></label>
                            <textarea className="form-control" name="" id="" rows="3" placeholder="Enter Description" maxLength="100"></textarea>
                   */}
                    <label htmlFor=""></label>
                    <input type="text" className="form-control" name="" id="" aria-describedby="helpId" placeholder="Title" onChange={this.handleName} value={this.state.name}  />
                     <button className="btn mt-2 " type="submit">Upload</button>
        </div>
      
                    </form>
                   
                  </div>
                 </div>
                 </div>
                </div>
        )
    }
}