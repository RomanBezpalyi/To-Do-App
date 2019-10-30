import "./sass/main.scss";

// import {refs} from './js/utils/constants.js';
// import {submitForm, removeListItem, handleChange} from './js/utils/app.js';

// // LISTENERS

// refs.formNoteEditor.addEventListener('submit', submitForm);
// refs.noteList.addEventListener('click', removeListItem);
// refs.searchForm.addEventListener('change', handleChange);

import Model from "./js/model";
import View from "./js/view";
import Controller from "./js/controller";

const view = new View();
const model = new Model();

new Controller(model, view);
