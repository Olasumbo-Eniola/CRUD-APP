import React from "react"
//import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends React.Component{

  render(){
  return (
    <div className="App pl-2 pr-2 pt-2 pb-2">
      <div className="row ml-0 mr-0">
      <div class="card-deck">
        <form className="card">
         <div className="upload-img">
          <label className="custom-file" style={{cursor: "pointer"}}><img src="./upload.svg" alt="" /><p>Upload Image</p>
             <input type="file" name="" id="" placeholder="" className="custom-file-input" aria-describedby="fileHelpId" />
              <span className="custom-file-control"></span>
           </label>
         </div>
          <div className="card-body">
              <label for=""></label>
              <input type="text" className="form-control" name="" id="" aria-describedby="helpId" placeholder="Title"/>
              <label for=""></label>
              <input type="number" className="form-control" name="" id="" aria-describedby="helpId" placeholder="Price"/>
  
                <label for=""></label>
                <textarea className="form-control" name="" id="" rows="3" placeholder="Enter Description" maxLength="100"></textarea>
       
          </div>
        </form>
       
      </div>
     </div>
    </div>
  );
}
}

export default App;
