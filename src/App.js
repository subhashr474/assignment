import {Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Jobs from'./jobslisting/Jobs';
import Addjob from'./jobslisting/Addjob';
import JobDetails from'./jobslisting/Jobdeatils';

class App extends Component{
  render(){
    return ( 
	    	<div className="container">
	    	 <Router>
		          <Route exact path="/">
		            <Jobs />
		          </Route>
		          <Route path="/addjob">
		          	<Addjob />
		          </Route>
				  <Route path="/view/:slug/:companyslug">
		          	<JobDetails />
		          </Route>
	          </Router>
	        </div>
        );
  };
}

export default App;
