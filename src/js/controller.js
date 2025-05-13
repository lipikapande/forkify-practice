import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////

// https://forkify-api.jonas.io

const controlRecipes = async function () {
  try {
    console.log('start');
    const id = window.location.hash.slice(1);
    if (!id) return;
    console.log('Recipe ID:', id);
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    console.log('Recipe Data:', model.state.recipe);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    alert(err);
  }
};

controlRecipes();

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
