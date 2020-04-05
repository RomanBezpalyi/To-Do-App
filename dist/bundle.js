!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([function(e,t,n){"use strict";var r,i,o,a=n(4),s="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function l(){o=!1}function u(e){if(e){if(e!==r){if(e.length!==s.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. You submitted "+e.length+" characters: "+e);var t=e.split("").filter(function(e,t,n){return t!==n.lastIndexOf(e)});if(t.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. These characters were not unique: "+t.join(", "));r=e,l()}}else r!==s&&(r=s,l())}function c(){return o||(o=function(){r||u(s);for(var e,t=r.split(""),n=[],i=a.nextValue();t.length>0;)i=a.nextValue(),e=Math.floor(i*t.length),n.push(t.splice(e,1)[0]);return n.join("")}())}e.exports={get:function(){return r||s},characters:function(e){return u(e),r},seed:function(e){a.seed(e),i!==e&&(l(),i=e)},lookup:function(e){return c()[e]},shuffled:c}},function(e,t,n){"use strict";e.exports=n(3)},function(e,t,n){},function(e,t,n){"use strict";var r=n(0),i=n(5),o=n(9),a=n(10)||0;function s(){return i(a)}e.exports=s,e.exports.generate=s,e.exports.seed=function(t){return r.seed(t),e.exports},e.exports.worker=function(t){return a=t,e.exports},e.exports.characters=function(e){return void 0!==e&&r.characters(e),r.shuffled()},e.exports.isValid=o},function(e,t,n){"use strict";var r=1;e.exports={nextValue:function(){return(r=(9301*r+49297)%233280)/233280},seed:function(e){r=e}}},function(e,t,n){"use strict";var r,i,o=n(6),a=(n(0),1567752802062),s=7;e.exports=function(e){var t="",n=Math.floor(.001*(Date.now()-a));return n===i?r++:(r=0,i=n),t+=o(s),t+=o(e),r>0&&(t+=o(r)),t+=o(n)}},function(e,t,n){"use strict";var r=n(0),i=n(7),o=n(8);e.exports=function(e){for(var t,n=0,a="";!t;)a+=o(i,r.get(),1),t=e<Math.pow(16,n+1),n++;return a}},function(e,t,n){"use strict";var r,i="object"==typeof window&&(window.crypto||window.msCrypto);r=i&&i.getRandomValues?function(e){return i.getRandomValues(new Uint8Array(e))}:function(e){for(var t=[],n=0;n<e;n++)t.push(Math.floor(256*Math.random()));return t},e.exports=r},function(e,t){e.exports=function(e,t,n){for(var r=(2<<Math.log(t.length-1)/Math.LN2)-1,i=Math.ceil(1.6*r*n/t.length),o="";;)for(var a=i,s=e(a);a--;)if((o+=t[s[a]&r]||"").length===+n)return o}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e){return!(!e||"string"!=typeof e||e.length<6||new RegExp("[^"+r.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(e))}},function(e,t,n){"use strict";e.exports=0},function(e,t,n){"use strict";n.r(t);n(2);var r=n(1),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.items=t,this.selectedItemId=null,this.filteredItems=[]}var t,n,r;return t=e,(n=[{key:"filterItems",value:function(e){Object.values(e).every(function(e){return""===e})&&(this.filteredItems=this.items),""!==e.inputValue&&(this.filteredItems=this.filteredItems.filter(function(t){return t.title.toLowerCase().includes(e.inputValue.toLowerCase())})),""!==e.progressValue&&"All"!==e.progressValue&&(this.filteredItems=this.filteredItems.filter(function(t){return t.progress===e.progressValue})),""!==e.priorityValue&&"All"!==e.priorityValue&&(this.filteredItems=this.filteredItems.filter(function(t){return t.priority===e.priorityValue}))}},{key:"getItemsFromLS",value:function(){if(localStorage.items)try{this.items=JSON.parse(localStorage.getItem("items")),this.filteredItems=this.items}catch(e){console.error("Error while parsing.")}}},{key:"findItem",value:function(e){return this.items.find(function(t){return t.id===e})}},{key:"setSelectedItemId",value:function(e){this.selectedItemId=e}},{key:"getSelectedItemId",value:function(){return this.selectedItemId}},{key:"addItem",value:function(e){var t=e.title,n=e.text,r=e.priority,o=e.progress,a={id:i()(),text:n,title:t,priority:r,progress:o};return this.items.push(a),a}},{key:"updateItem",value:function(e,t){var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){o(e,t,n[t])})}return e}({},this.findItem(e),t);this.items=this.items.map(function(t){return t.id===e?n:t})}},{key:"deleteItem",value:function(e){this.items=this.items.filter(function(t){return t.id!==e})}},{key:"updateProgressStatus",value:function(e){var t=this.findItem(e),n="Open"===t.progress?t.progress="Done":t.progress="Open";this.items.forEach(function(t){return t.id===e?n:t})}}])&&a(t.prototype,n),r&&a(t,r),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.events={}}var t,n,r;return t=e,(n=[{key:"on",value:function(e,t){this.events[e]=this.events[e]||[],this.events[e].push(t)}},{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];this.events[e]&&this.events[e].forEach(function(e){return e.apply(void 0,n)})}}])&&l(t.prototype,n),r&&l(t,r),e}();function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var v=function(e){function t(){var e,n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,(e=!(r=h(t).call(this))||"object"!==c(r)&&"function"!=typeof r?m(n):r).formState={inputValue:"",progressValue:"",priorityValue:""},e.container=document.querySelector(".container"),e.form=document.querySelector(".form"),e.main=document.querySelector(".main-content"),e.modal=document.querySelector(".modal"),e.editModal=document.querySelector(".modal--edit"),e.noteList=document.querySelector(".note-list"),e.formInput=e.form.querySelector(".form__input"),e.selectProgress=e.form.querySelector(".select--progress"),e.selectPriority=e.form.querySelector(".select--priority"),e.createModalForm=e.modal.querySelector(".modal-form"),e.editModalForm=e.editModal.querySelector(".modal-form"),e.addNoteBtn=document.querySelector('button[data-action="add-note"]'),e.cancelEditBtn=document.querySelector('button[data-action="edit-cancel"]'),e.cancelCreateBtn=document.querySelector('button[data-action="create-cancel"]'),e.editSuccessBtn=document.querySelector('button[data-action="edit-success"]'),e.container.addEventListener("click",e.toggleDropdown),e.formInput.addEventListener("input",e.onInput.bind(m(e))),e.selectProgress.addEventListener("change",e.onSelectProgressChange.bind(m(e))),e.selectPriority.addEventListener("change",e.onSelectPriorityChange.bind(m(e))),e.addNoteBtn.addEventListener("click",e.openCreateModal.bind(m(e))),e.createModalForm.addEventListener("submit",e.handleAdd.bind(m(e))),e.cancelCreateBtn.addEventListener("click",e.closeCreateModal.bind(m(e))),e.editModalForm.addEventListener("submit",e.handleEditSuccess.bind(m(e))),e.cancelEditBtn.addEventListener("click",e.closeEditModal.bind(m(e))),e}var n,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,u),n=t,(r=[{key:"onInput",value:function(e){this.formState.inputValue=e.target.value,this.emit("filter",this.formState)}},{key:"onSelectProgressChange",value:function(e){this.formState.progressValue=e.target.value,this.emit("filter",this.formState)}},{key:"onSelectPriorityChange",value:function(e){this.formState.priorityValue=e.target.value,this.emit("filter",this.formState)}},{key:"handleAdd",value:function(e){e.preventDefault();var t=this.modal.querySelector(".modal-form__input"),n=this.modal.querySelector(".modal-form__textarea"),r=this.modal.querySelector(".modal-form__select");if(n.value&&t.value){var i={title:t.value.length>15?t.value.slice(0,16)+"...":t.value,text:n.value.length>15?n.value.slice(0,16)+"...":n.value,priority:r.value,progress:"Open"};this.emit("add",i),this.createModalForm.reset(),this.closeCreateModal()}else alert("Please, fill all the fields!")}},{key:"handleEditSuccess",value:function(e){e.preventDefault();var t=this.editModal.querySelector(".modal-form__input"),n=this.editModal.querySelector(".modal-form__textarea"),r=this.editModal.querySelector(".modal-form__select"),i={title:t.value.length>15?t.value.slice(0,16)+"...":t.value,text:n.value.length>15?n.value.slice(16)+"...":n.value,priority:r.value};this.emit("edit-success",i),this.editModalForm.reset(),this.closeEditModal()}},{key:"createDOMElement",value:function(e,t,n){var r=document.createElement(e);t&&(r.dataset[t[0]]=t[1]),n&&(r.textContent=n);for(var i=arguments.length,o=new Array(i>3?i-3:0),a=3;a<i;a++)o[a-3]=arguments[a];return o.forEach(function(e){return r.classList.add(e)}),r}},{key:"createNote",value:function(e){var t=this.createDOMElement("li",null,null,"note-list__li"),n=this.createDOMElement("div",["id",e.id],null,"item");"Done"===e.progress&&n.classList.add("done");var r=this.createDOMElement("h2",null,e.title,"item__title"),i=this.createDOMElement("p",null,e.text,"item__text"),o=this.createDOMElement("div",null,null,"buttons-container"),a=this.createDOMElement("span",null,e.priority,"item__priority"),s=this.createDOMElement("div",["action","toggle-dropdown"],"...","dropdown"),l=this.createDOMElement("div",null,null,"dropdown-btn-wrap"),u=this.createDOMElement("button",["action","done"],"Done","button","drop-btn"),c=this.createDOMElement("button",["action","edit"],"Edit","button","drop-btn"),d=this.createDOMElement("button",["action","delete"],"Delete","button","drop-btn");return o.append(a,s),s.append(l),l.append(u,c,d),n.append(r,i,o),t.append(n),this.appendEventListners(t),t}},{key:"appendEventListners",value:function(e){var t=e.querySelector('button[data-action="delete"]'),n=e.querySelector('button[data-action="edit"]'),r=e.querySelector('button[data-action="done"]');t.addEventListener("click",this.handleDelete.bind(this)),n.addEventListener("click",this.handleEditStart.bind(this)),r.addEventListener("click",this.handleProgressStatus.bind(this))}},{key:"handleProgressStatus",value:function(e){e.stopPropagation();var t=e.target.closest(".item");this.emit("done",t)}},{key:"toggleProgressStatus",value:function(e){var t=e.querySelector(".dropdown-btn-wrap");e.classList.toggle("done"),t.classList.remove("show-dropdown")}},{key:"toggleDropdown",value:function(e){var t=document.querySelectorAll(".dropdown-btn-wrap");"dropdown"===e.target.className?Array.from(t).forEach(function(t){t.closest(".item").dataset.id===e.target.closest(".item").dataset.id?e.target.firstElementChild.classList.toggle("show-dropdown"):t.classList.remove("show-dropdown")}):Array.from(t).forEach(function(e){return e.classList.contains("show-dropdown")?e.classList.remove("show-dropdown"):e})}},{key:"handleEditStart",value:function(e){e.stopPropagation();var t=e.target.closest(".item");e.target.closest(".dropdown-btn-wrap").classList.remove("show-dropdown"),this.emit("edit-start",t.dataset.id)}},{key:"handleDelete",value:function(e){var t=e.target.closest(".item");e.target.closest(".dropdown-btn-wrap").classList.remove("show-dropdown"),e.stopPropagation(),this.emit("delete",t.dataset.id)}},{key:"deleteNote",value:function(e){var t=this.noteList.querySelector('[data-id="'.concat(e,'"]'));this.noteList.removeChild(t.closest("li"))}},{key:"openEditModal",value:function(e){this.container.classList.add("modal--edit-show");var t=this.editModal.querySelector(".modal-form__input"),n=this.editModal.querySelector(".modal-form__textarea"),r=this.editModal.querySelector(".modal-form__select");n.value=e.text,t.value=e.title,r.value=e.priority}},{key:"openCreateModal",value:function(){this.formInput.value="",this.container.classList.add("modal--show")}},{key:"closeCreateModal",value:function(){this.container.classList.remove("modal--show")}},{key:"closeEditModal",value:function(){this.container.classList.remove("modal--edit-show")}},{key:"updateNote",value:function(e,t){var n=t.title,r=t.text,i=t.priority,o=this.noteList.querySelector('.item[data-id="'.concat(e,'"] .item__text')),a=this.noteList.querySelector('.item[data-id="'.concat(e,'"] .item__title')),s=this.noteList.querySelector('.item[data-id="'.concat(e,'"] .item__priority'));o.textContent=r,a.textContent=n,s.textContent=i}},{key:"init",value:function(e){var t,n=this;"Nothing's found"===this.main.firstElementChild.innerHTML&&this.main.firstElementChild.remove(),this.noteList.innerHTML="";var r=e.map(function(e){return n.createNote(e)});(t=this.noteList).append.apply(t,d(r))}},{key:"nothingsFound",value:function(){"Nothing's found"===this.main.firstElementChild.innerHTML&&this.main.firstElementChild.remove(),this.noteList.innerHTML="";var e=this.createDOMElement("h2",null,"Nothing's found","nothings-found");this.main.prepend(e)}}])&&f(n.prototype,r),i&&f(n,i),t}();function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var g=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.model=t,this.view=n,this.model.getItemsFromLS(),this.view.init(this.model.items),this.view.on("add",this.addNote.bind(this)),this.view.on("done",this.handleDone.bind(this)),this.view.on("delete",this.deleteNote.bind(this)),this.view.on("filter",this.handleFilter.bind(this)),this.view.on("search-empty",this.showAllNotes.bind(this)),this.view.on("create-cancel",this.handleCreateCancel.bind(this)),this.view.on("edit-start",this.handleEditStart.bind(this)),this.view.on("edit-cancel",this.handleEditCancel.bind(this)),this.view.on("edit-success",this.handleEditSuccess.bind(this))}var t,n,r;return t=e,(n=[{key:"handleFilter",value:function(e){this.model.filterItems(e),this.model.filteredItems.length?this.view.init(this.model.filteredItems):this.view.nothingsFound(),this.model.filteredItems=this.model.items}},{key:"showAllNotes",value:function(){this.view.init(this.model.items)}},{key:"handleDone",value:function(e){this.model.updateProgressStatus(e.dataset.id);try{localStorage.setItem("items",JSON.stringify(this.model.items))}catch(e){console.error("Error while parsing.")}this.view.toggleProgressStatus(e)}},{key:"handleEditSuccess",value:function(e){var t=this.model.getSelectedItemId();this.model.updateItem(t,e);try{localStorage.setItem("items",JSON.stringify(this.model.items))}catch(e){console.error("Error while parsing.")}this.view.updateNote(t,e)}},{key:"handleEditStart",value:function(e){var t=this.model.findItem(e);this.model.setSelectedItemId(e),this.view.openEditModal(t)}},{key:"handleEditCancel",value:function(){this.view.closeEditModal()}},{key:"handleCreateCancel",value:function(){this.view.closeCreateModal()}},{key:"addNote",value:function(e){this.model.addItem(e);try{localStorage.setItem("items",JSON.stringify(this.model.items))}catch(e){console.error("Error while parsing.")}this.showAllNotes()}},{key:"deleteNote",value:function(e){this.model.deleteItem(e);try{localStorage.setItem("items",JSON.stringify(this.model.items))}catch(e){console.error("Error while parsing.")}this.view.deleteNote(e)}}])&&y(t.prototype,n),r&&y(t,r),e}(),b=new v;new g(new s,b)}]);
//# sourceMappingURL=bundle.js.map