import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import request from 'superagent';

import Ingredients from './ingredients';
import IngredientList from './ingredientList';
import createBrowserHistory from 'history/createBrowserHistory';

const CLOUDINARY_UPLOAD_PRESET = 'ye3aabaz';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dstijyyfd/upload';

const history = createBrowserHistory();
class Submit extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	recipies: JSON.parse(localStorage.getItem('recipies')) || [],
    	newRecipe: {
    	name: 'Name',
    	description: 'Description',
    	ingredients: []
		},
		uploadedFileCloudinaryUrl: ''
    }
    this.submitRecipe = this.submitRecipe.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
}

  onImageDrop(files) {
  	this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  submitRecipe() {
    let newRecipe = this.state.newRecipe;
    newRecipe.name = this.name.value;
    newRecipe.description = this.description.value;
    newRecipe.image = this.state.uploadedFileCloudinaryUrl;
    this.setState({newRecipe});

    let recipies = this.state.recipies;
    recipies.push(newRecipe);
    this.setState({recipies});
    localStorage.setItem('recipies', JSON.stringify(recipies));
    history.push('/');
  }

  addIngredient(quantity, ingredient) {
  	let newRecipe = this.state.newRecipe;
  	newRecipe.ingredients.push({quantity: quantity, ingredients: ingredient});
  	this.setState({newRecipe});
  }

	render() {
		return(
			<div className="row">
				<div className="col-xs-12 col-sm-12">
					<h1>Submit</h1>	
					<form>
					<Dropzone
				      multiple={false}
				      accept="image/*"
				      onDrop={this.onImageDrop}>
				      <p>Drop an image or click to select a file to upload.</p>
				    </Dropzone>
				    <div>
				        {this.state.uploadedFileCloudinaryUrl === '' ? null :
				        <div>
				          <p>{this.state.uploadedFile.name}</p>
				          <img alt={this.state.uploadedFile.name} src={this.state.uploadedFileCloudinaryUrl} />
				        </div>}
				    </div>
					  <div className="form-group">
					    <label htmlFor="name">Name</label>
					    <input type="text" ref={(input) => {this.name = input}} className="form-control" id="name" placeholder="name" />
					  </div>
					  <div className="form-group">
					    <label htmlFor="description">Description</label>
					    <textarea className="form-control" ref={(input) => {this.description = input}} id="description" placeholder="enter a breif description" />
					  </div>
					  <IngredientList recipe={this.state.newRecipe} />
					  <Ingredients addIngredient = {(quantity, ingredient) => {this.addIngredient(quantity, ingredient)}}/>
					  <button type="submit" onClick={this.submitRecipe} className="btn btn-default submit-button">Submit a Recipe</button>
					</form>
				</div>
			</div>
	);
	}
}

export default Submit;