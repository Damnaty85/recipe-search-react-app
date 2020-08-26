import React from 'react';

import { Link } from "react-router-dom";

const APP_ID = '50be3f51';
const API_KEY = 'e341636cbe1224743aee228bd000055e';

const getRandomInt = (max = 30000) => {
    return Math.floor(Math.random() * Math.floor(max));
};


class Recipe extends React.Component{
    state = {
        activeRecipe: [],
    };

    componentDidMount = async () => {
        const title = this.props.location.state.recipe;
        const req = await fetch(`https://api.edamam.com/search?q=${title}&app_id=${APP_ID}&app_key=${API_KEY}`);

        const res = await req.json();
        this.setState({
            activeRecipe: res.hits[0].recipe,
        });
        console.log(res.hits[0].recipe)
    };

    render() {
        const recipe = this.state.activeRecipe;
        return (

            <div className="container">
                {
                    this.state.activeRecipe.length !== 0 &&
                    <div className="recipe-detail">
                        <h3 className="recipe-detail__title">{recipe.label}</h3>
                        <div className="recipe-detail__left">
                            <img src={recipe.image} alt="" className="recipe-detail__image"/>
                        </div>
                        <div className="recipe-detail__right">
                            <h4 className="recipe-detail__publisher">Publisher: <span>{recipe.source}</span></h4>
                            <ul style={{ paddingLeft:"0",listStyle:'inside',fontSize:'14px'}}>
                                {
                                    recipe.ingredients.map(ingredient => {
                                        return  (
                                            <li key={getRandomInt()}>{ingredient.text}</li>
                                        )
                                    })
                                }
                            </ul>
                            <p className="recipe-detail__website">Website: <span><a href={recipe.url}>{recipe.url}</a></span> </p>
                        </div>
                        <button className="recipe-detail__button">
                            <Link to="/">Go Back</Link>
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default Recipe;
