import React from "react"
import Category from "./Component/category"
import Sidebar from "./Component/sidebar"
import { Switch, Route } from "react-router-dom";
import "./App.css"
import Items from "./Component/item";

export default class App extends React.Component{
   render(){
     return(
       <div>
<Sidebar/>
         <Switch>
           <Route exact path="/" component={Category}/>
           <Route  path={`/category/:id`} component={Items}  />
         </Switch>
       </div>
     )
   }
}