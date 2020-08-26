import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const APP_ID = '50be3f51';
const API_KEY = 'e341636cbe1224743aee228bd000055e';

class App extends Component {
    state = {
      recipes : [],
    };
    componentDidMount() {
        const json = localStorage.getItem("recipes");
        const recipes = JSON.parse(json);
        this.setState({recipes})
    }
    componentDidUpdate() {
        const recipes = JSON.stringify(this.state.recipes);
        localStorage.setItem("recipes", recipes);
    }

    getRecipe = async (evt) => {
        const recipeName = evt.target.elements.recipeName.value;
        evt.preventDefault();
        const apiCall = await fetch(`https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${API_KEY}&from=0&to=28`);

        const data = await apiCall.json();
        this.setState({ recipes: data.hits });
        console.log(this.state.recipes)
    };
  render() {
    return (
      <div className="App">
          <header className="App-header">
              <h1 className="App-title">Recipe Search React App</h1>
          </header>
          <Form getRecipe={this.getRecipe}/>
          <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
