import React, { useState, useEffect } from "react";
import './../App.css';
import { useQuery, gql } from '@apollo/client';

import {
    BrowserRouter as Router,
    useParams,
    useLocation,
    Link
  } from "react-router-dom";

  const VIEWJOBS = gql`
    query ja($cslug: String!, $slug: String!){
      job( input : { companySlug : $cslug , jobSlug : $slug} ){
        id
        title
        description
        userEmail
        locationNames
        applyUrl
        postedAt
        company {
          id
          name
          slug
          websiteUrl
        }
      }
    }  
  `;
  
  
  function getParsedDate(date){
    let ndate = new Date(date);
    return ndate.getDate()+'/'+ndate.getMonth()+'/'+ndate.getFullYear();
  }

  
const JobDetails = (props) => {

  const loc = useLocation();
  var full = loc.pathname.split('/');
 
  useEffect(() => {
    Setnewslug(full[3]);
    Setnewjobslug(full[2]);
  });
  
  const [newslug , Setnewslug] = useState("");
  const [newjobslug , Setnewjobslug] = useState("");

  const { loading, error, data } = useQuery(VIEWJOBS ,
                                                    {
                                                      variables: { cslug : newslug , slug : newjobslug },
                                                    });
    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error}` ;

      console.log("data",data);
    
	return <div className="row">
              <h3 className="col-md-12 viewInfo">
                      View Job Information
                      <Link className="btn btn-info btn-sm pull-right" to="/"> Back to Home</Link>
              </h3>

              <table className="table table-bordered">
                <tr>
                  <th>Company </th>
                  <td>{data.job.company.name}</td>
                </tr>
                <tr>
                  <th>Website </th>
                  <td>{data.job.company.websiteUrl}</td>
                </tr>
                <tr>
                  <th>Apply URL</th>
                  <td>{data.job.applyUrl}</td>
                </tr>
                <tr>
                  <th>Job Title</th>
                  <td>{data.job.title}</td>
                </tr>
                <tr>
                  <th>Job Description</th>
                  <td>{data.job.description}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{data.job.userEmail}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>{data.job.locationNames}</td>
                </tr>
                <tr>
                  <th>Posted At</th>
                  <td>{getParsedDate(data.job.postedAt)}</td>
                </tr>
                
              </table>
			</div>;
}

export default JobDetails;