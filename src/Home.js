import React, { Component } from 'react';
import IngredientList from './ingredientList'

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipies: JSON.parse(localStorage.getItem('recipies')) || []
		};
	}

	displayRecipies() {
		let resultsArray = [];
		let recipies = this.state.recipies;
		this.state.recipies.map((recipe,i) => {
			resultsArray.push(
				<div className="col-sm-6 col-md-4" key={i}>
				<div className="thumbnail">
				 <img src={recipe.image} alt={recipe.name} />
				 	<div className="caption">
			        <h3>{recipe.name}</h3>
			        <p>{recipe.description}</p>
					<IngredientList recipe = {recipe} />
		        	</div>
				 </div>
				</div>
			);
		});
		return resultsArray;
	}
	render() {
		return(
			<div className="row">
				<h1>Home</h1>
				{this.displayRecipies()}
			</div>
	);
	}
}

export default Home;