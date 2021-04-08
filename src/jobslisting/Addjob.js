import {Component} from "react";
import './../App.css';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';


const ALLJOBS = gql`
query comapn{
	companies{
		id
		name
	}
	commitments{
		id
		title
	}
}  
`;

const ADD_TODO = gql`
  mutation postJob($title: String!, $commitmentId: ID!, $companyName: String!, $locationNames: String!, $userEmail: String!, $description: String!, $applyUrl: String!) {
    postJob( input : { title: $title, commitmentId: $commitmentId, companyName: $companyName, locationNames: $locationNames, userEmail: $userEmail, description: $description, applyUrl: $applyUrl}) {
      title
	  commitment {
		id
	  }
		company {
		name
	  }
	  locationNames
	  userEmail
	  description
	  applyUrl
    }
  }
`;

const Addjob = (props) => {

	  const history = useHistory();

	  const handleSubmit = (event) => {
		event.preventDefault();
		var title = event.target.title.value;
		var commitmentId = event.target.commitmentId.value;
		var companyName = event.target.companyName.value;
		var locationNames = event.target.locationNames.value;
		var userEmail = event.target.userEmail.value;
		var description = event.target.description.value;
		var applyUrl = event.target.applyUrl.value;
		addTodo({ variables: { title : title, commitmentId : commitmentId, companyName : companyName, locationNames : locationNames , userEmail : userEmail, description : description, applyUrl : applyUrl  } });
	  }


	const { loading, error, data } = useQuery(ALLJOBS);
	const [addTodo , { loading2: mutationLoading, error2: mutationError }] = useMutation(ADD_TODO,
		{
			onCompleted(data) {
			  alert("Job Information has been successfully inserted..!!");
			  history.push('/');
			}
		  });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error..:(</p>;
	
	return <div className="row">
		      <h3 className="col-md-12 viewInfo">
		      		Add Job
		      		<a className="btn btn-info pull-right" href="/">Back</a>
		      </h3>
		      <form className="col-md-8" onSubmit={handleSubmit}>
				<div className="form-group">
						<label for="title">Title:</label>
						<input type="text" className="form-control" id="title" name="title" />
				</div>

				<div className="form-group">
						<label for="location">Commitment:</label>
						<select className="form-control" name="commitmentId">
							<option value="0">Please Select commitment</option>
							{ data.commitments.map(info => (
								<option key={info.id} value={info.id}>{info.title}</option>
							))}
						</select>
				</div>


				<div className="form-group">
						<label for="location">Company:</label>
						<select className="form-control" name="companyName">
							<option value="">Please Select Company</option>
							{ data.companies.map(info => (
								<option key={info.id} value={info.name}>{info.name}</option>
							))}
						</select>
				</div>

				<div className="form-group">
						<label for="location">Location:</label>
						<input type="text" className="form-control" id="location" name="locationNames" />
				</div>

				<div className="form-group">
						<label for="email">Email:</label>
						<input type="text" className="form-control" id="email" name="userEmail" />
				</div>

				<div className="form-group">
						<label for="description">Description:</label>
						<textarea className="form-control" id="description" name="description"></textarea>
				</div>

				<div className="form-group">
						<label for="url">Apply URL:</label>
						<input type="text" className="form-control" id="url" name="applyUrl" />
				</div>

		        <button className="btn btn-info">Send data!</button>
		      </form>
			</div>
}

export default Addjob;