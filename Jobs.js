import React, { useState, useEffect } from "react";
import './../App.css';
import { useQuery, gql } from '@apollo/client';
import ReactPaginate from 'react-paginate';
import Jobview from './Jobview';

const ALLJOBS = gql`
  query JobsListing {
  jobs{
    id
    title
    slug
    locationNames
    createdAt
    company {
      id
      name
      slug
    }
    countries {
      id
      name
    }
    cities{
      id
      name
    }
    description
  }
}
`;

const Jobs = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);
    const { loading, error, data } = useQuery(ALLJOBS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error..:(</p>;
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.jobs.slice(indexOfFirstPost,indexOfLastPost);
    const totalPages = Math.ceil(data.jobs.length / postsPerPage)

    const handlePageClick = (e) => {
      const selectedPage = e.selected + 1;
      setCurrentPage(selectedPage);
    };

    
	return <div className="row">
		      <h3 className="col-md-12 viewInfo">
		      		Jobs
		      		<a className="btn btn-info btn-sm pull-right" href="/addjob">Add New Job</a>
          </h3>

              <Jobview posts={currentPosts} loading={loading} />
              <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
			</div>
}

export default Jobs;  