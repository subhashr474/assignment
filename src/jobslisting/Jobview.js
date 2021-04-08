import React, { useState, useEffect } from "react";
import './../App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
function getParsedDate(date){
    let ndate = new Date(date);
    return ndate.getDate()+'/'+ndate.getMonth()+'/'+ndate.getFullYear();
  }

const JobView = ({posts , loading}) => {
    if(loading){
        return <h2>Loading...</h2>;
    }
	return <div className="row">
		      { posts.map(info => (
                  <div className="col-12 col-md-4 col-lg-4 space" key={info.id}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title"><a href="#" title="View Job">{info.title.substring(0,23)}{ (info.title.length > 23) ? "...": "" } </a> <br></br> <span> {info.company.name}</span> </h4>
                            <p className="card-text">{info.locationNames}</p>
                            <p className="card-text">{info.description.substring(0,115)}{ (info.description.length > 115) ? "...": "" }</p>
                            <div className="row">
                                <div className="col">
                                    <Link to={`/view/${info.slug}/${info.company.slug}`} className="btn btn-success btn-block" >View Job</Link>
                                </div>
                            </div>
                            <p className="datef">Created At : { getParsedDate(info.createdAt)}</p>
                        </div>
                    </div>
                </div>
              ))}
			</div>;
}

export default JobView;