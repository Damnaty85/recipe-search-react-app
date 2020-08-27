import React from 'react';
import {Link} from "react-router-dom";

const getRandomInt = (max = 30000) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const Recipes = props => {
    return (
        <div className="container">
            <section className="recipe__wrapper">
                {
                    props.recipes.map(recipe => {
                        const recipeId = getRandomInt();
                        return (
                            <div key={recipeId} className="recipe___item">
                                <img className="recipe__image" src={recipe.recipe.image} alt={recipe.recipe.label}/>
                                <div className="recipe__info">
                                    <h5 className="recipe__name" title={recipe.recipe.label}>
                                        {recipe.recipe.label.length < 20 ? `${recipe.recipe.label}` : `${recipe.recipe.label.substring(0, 25)}...`}
                                    </h5>
                                    <p><b>Calories: </b>{Math.round(recipe.recipe.calories)} cal.</p>
                                    <p><b>Source:</b> <span>{recipe.recipe.source}</span></p>
                                </div>
                                <button className="recipe__button">
                                    <Link to={{
                                        pathname: `/recipe/${recipe.recipe.label.toLowerCase().replace(/ /g, '_')}`,
                                        state: {
                                            recipe: recipe.recipe.label
                                        }
                                    }}>
                                        View recipe
                                    </Link>
                                </button>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
};

export default Recipes;
