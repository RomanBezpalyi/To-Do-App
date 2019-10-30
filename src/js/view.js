// import debounce from "debounce";
import EventEmitter from "./services/event-emitter";
import { Notyf } from "notyf";

const notyf = new Notyf();

export default class View extends EventEmitter {
  constructor() {
    super();

    this.formState = {
      inputValue: "",
      progressValue: "",
      priorityValue: ""
    };

    // QUERY SELECTORS

    this.container = document.querySelector(".container");
    this.form = document.querySelector(".form");
    this.modal = document.querySelector(".modal");
    this.editModal = document.querySelector(".modal--edit");
    this.noteList = document.querySelector(".note-list");
    this.formInput = this.form.querySelector(".form__input");
    this.selectProgress = this.form.querySelector(".select--progress");
    this.selectPriority = this.form.querySelector(".select--priority");
    this.createModalForm = this.modal.querySelector(".modal-form");
    this.editModalForm = this.editModal.querySelector(".modal-form");
    this.addNoteBtn = document.querySelector('button[data-action="add-note"]');
    this.cancelEditBtn = document.querySelector(
      'button[data-action="edit-cancel"]'
    );
    this.cancelCreateBtn = document.querySelector(
      'button[data-action="create-cancel"]'
    );
    this.editSuccessBtn = document.querySelector(
      'button[data-action="edit-success"]'
    );

    // EVENT LISTENERS

    this.container.addEventListener("click", this.toggleDropdown);

    // form listeners

    this.formInput.addEventListener("input", this.onInput.bind(this));
    this.selectProgress.addEventListener(
      "change",
      this.onSelectProgressChange.bind(this)
    );
    this.selectPriority.addEventListener(
      "change",
      this.onSelectPriorityChange.bind(this)
    );

    // create listeners

    this.addNoteBtn.addEventListener("click", this.openCreateModal.bind(this));
    this.createModalForm.addEventListener("submit", this.handleAdd.bind(this));
    this.cancelCreateBtn.addEventListener(
      "click",
      this.closeCreateModal.bind(this)
    );

    // edit listeners

    this.editModalForm.addEventListener(
      "submit",
      this.handleEditSuccess.bind(this)
    );
    this.cancelEditBtn.addEventListener(
      "click",
      this.closeEditModal.bind(this)
    );
    // this.editSuccessBtn.addEventListener(
    //   "click",
    //   this.handleEditSuccess.bind(this)
    // );
  }

  onInput(e) {
    this.formState.inputValue = e.target.value;
    this.emit("filter", this.formState);
  }

  onSelectProgressChange(e) {
    this.formState.progressValue = e.target.value;
    this.emit("filter", this.formState);
  }

  onSelectPriorityChange(e) {
    this.formState.priorityValue = e.target.value;
    this.emit("filter", this.formState);
  }

  handleAdd(e) {
    e.preventDefault();

    const title = this.modal.querySelector(".modal-form__input");
    const text = this.modal.querySelector(".modal-form__textarea");
    const priority = this.modal.querySelector(".modal-form__select");

    if (!text.value || !title.value) {
      notyf.error("Please, fill all the fields!");
    } else {
      const note = {
        title: title.value,
        text: text.value,
        priority: priority.value,
        progress: "open"
      };

      this.emit("add", note);
      this.createModalForm.reset();
      this.closeCreateModal();
    }
  }

  handleEditSuccess(e) {
    e.preventDefault();

    const title = this.editModal.querySelector(".modal-form__input");
    const text = this.editModal.querySelector(".modal-form__textarea");
    const priority = this.editModal.querySelector(".modal-form__select");

    const note = {
      title: title.value,
      text: text.value,
      priority: priority.value
    };

    this.emit("edit-success", note);
    this.editModalForm.reset();
    this.closeEditModal();
  }

  createDOMElement(tag, dataAttribute, text, ...classes) {
    const element = document.createElement(tag);
    dataAttribute
      ? (element.dataset[dataAttribute[0]] = dataAttribute[1])
      : null;
    text ? (element.textContent = text) : null;
    classes.forEach(className => element.classList.add(className));
    return element;
  }

  createNote(note) {
    const item = this.createDOMElement("li", ["id", note.id], null, "item");
    note.progress === "done" && item.classList.add("done");

    const itemTitle = this.createDOMElement(
      "h2",
      null,
      note.title,
      "item__title"
    );

    const text = this.createDOMElement("p", null, note.text, "item__text");

    const buttonsContainer = this.createDOMElement(
      "div",
      null,
      null,
      "buttons-container"
    );

    const priority = this.createDOMElement(
      "span",
      null,
      note.priority,
      "item__priority"
    );

    const dropdown = this.createDOMElement(
      "div",
      ["action", "toggle-dropdown"],
      "...",
      "dropdown"
    );

    const dropdownBtnWrap = this.createDOMElement(
      "div",
      null,
      null,
      "dropdown-btn-wrap"
    );

    const buttonDone = this.createDOMElement(
      "button",
      ["action", "done"],
      "Done",
      "button",
      "drop-btn"
    );

    const buttonEdit = this.createDOMElement(
      "button",
      ["action", "edit"],
      "Edit",
      "button",
      "drop-btn"
    );

    const buttonDelete = this.createDOMElement(
      "button",
      ["action", "delete"],
      "Delete",
      "button",
      "drop-btn"
    );

    buttonsContainer.append(priority, dropdown);

    dropdown.append(dropdownBtnWrap);
    dropdownBtnWrap.append(buttonDone, buttonEdit, buttonDelete);
    item.append(itemTitle, text, buttonsContainer);
    this.appendEventListners(item);

    return item;
  }

  appendEventListners(item) {
    const deleteBtn = item.querySelector('button[data-action="delete"]');
    const editStartBtn = item.querySelector('button[data-action="edit"]');
    const doneBtn = item.querySelector('button[data-action="done"]');

    deleteBtn.addEventListener("click", this.handleDelete.bind(this));
    editStartBtn.addEventListener("click", this.handleEditStart.bind(this));
    doneBtn.addEventListener("click", this.handleProgressStatus.bind(this));
  }

  handleProgressStatus(e) {
    e.stopPropagation();
    const item = e.target.closest(".item");
    this.emit("done", item);
  }

  toggleDoneStatus(item) {
    const dropdown = item.querySelector(".dropdown-btn-wrap");

    item.classList.toggle("done");
    dropdown.classList.remove("show-dropdown");
  }

  toggleDropdown(e) {
    const items = document.querySelectorAll(".dropdown-btn-wrap");

    if (e.target.className === "dropdown") {
      Array.from(items).forEach(el => {
        if (
          el.closest(".item").dataset.id ===
          e.target.closest(".item").dataset.id
        ) {
          e.target.firstElementChild.classList.toggle("show-dropdown");
        } else {
          el.classList.remove("show-dropdown");
        }
      });
    } else {
      Array.from(items).forEach(el =>
        el.classList.contains("show-dropdown")
          ? el.classList.remove("show-dropdown")
          : el
      );
    }
  }

  handleEditStart(e) {
    e.stopPropagation();

    const parent = e.target.closest(".item");
    const dropdown = e.target.closest(".dropdown-btn-wrap");

    dropdown.classList.remove("show-dropdown");
    this.emit("edit-start", parent.dataset.id);
  }

  handleDelete(e) {
    const parent = e.target.closest(".item");
    const dropdown = e.target.closest(".dropdown-btn-wrap");

    dropdown.classList.remove("show-dropdown");
    e.stopPropagation();
    this.emit("delete", parent.dataset.id);
  }

  deleteNote(id) {
    const item = this.noteList.querySelector(`[data-id="${id}"]`);
    this.noteList.removeChild(item);
  }

  openEditModal(note) {
    this.container.classList.add("show-edit-modal");

    const title = this.editModal.querySelector(".modal-form__input");
    const text = this.editModal.querySelector(".modal-form__textarea");
    const priority = this.editModal.querySelector(".modal-form__select");

    text.value = note.text;
    title.value = note.title;
    priority.value = note.priority;
  }

  openCreateModal() {
    this.formInput.value = "";
    this.container.classList.add("show-modal");
  }

  closeCreateModal() {
    this.container.classList.remove("show-modal");
  }

  closeEditModal() {
    this.container.classList.remove("show-edit-modal");
  }

  updateNote(id, { title, text, priority }) {
    const elText = this.noteList.querySelector(
      `.item[data-id="${id}"] .item__text`
    );
    const elTitle = this.noteList.querySelector(
      `.item[data-id="${id}"] .item__title`
    );
    const elPriority = this.noteList.querySelector(
      `.item[data-id="${id}"] .item__priority`
    );

    elText.textContent = text;
    elTitle.textContent = title;
    elPriority.textContent = priority;
  }

  init(notes) {
    // this.noteList.innerHTML = "";
    const elements = notes.map(note => this.createNote(note));
    this.noteList.append(...elements);
  }

  nothingsFound() {
    this.noteList.innerHTML = "";
    const h2 = this.createDOMElement(
      "h2",
      null,
      "Nothing's found",
      "nothings-found"
    );
    this.container.prepend(h2);
  }
}
