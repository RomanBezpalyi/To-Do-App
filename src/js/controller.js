export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // this.model.getItemsFromLS();
    // this.view.init(this.model.items);

    this.view.on("add", this.addNote.bind(this));
    this.view.on("done", this.handleDone.bind(this));
    this.view.on("delete", this.deleteNote.bind(this));
    this.view.on("filter", this.handleFilter.bind(this));
    this.view.on("search-empty", this.showAllNotes.bind(this));
    this.view.on("edit-start", this.handleEditStart.bind(this));
    this.view.on("edit-cancel", this.handleEditCancel.bind(this));
    this.view.on("create-cancel", this.handleCreateCancel.bind(this));
    this.view.on("edit-success", this.handleEditSuccess.bind(this));
  }

  handleFilter(formState) {
    this.model.filterItems(formState);

    this.model.filteredItems.length
      ? this.view.init(this.model.filteredItems)
      : this.view.nothingsFound();
    this.model.filteredItems = this.model.items;
  }

  showAllNotes() {
    this.view.init(this.model.items);
  }

  handleDone(item) {
    this.model.updateDoneStatus(item.dataset.id);
    LOCALSTORAGE.set("items", this.model.items);
    this.view.toggleDoneStatus(item);
  }

  handleEditSuccess(note) {
    const id = this.model.getSelectedItemId();

    this.model.updateItem(id, note);
    // LOCALSTORAGE.set("items", this.model.items);
    this.view.updateNote(id, note);
  }

  handleEditStart(id) {
    const note = this.model.findItem(id);
    this.model.setSelectedItemId(id);

    this.view.openEditModal(note);
  }

  handleEditCancel() {
    this.view.closeEditModal();
  }

  handleCreateCancel() {
    this.view.closeCreateModal();
  }

  addNote(note) {
    this.model.addItem(note);
    // LOCALSTORAGE.set("items", this.model.items);
    this.showAllNotes();
  }

  deleteNote(id) {
    this.model.deleteItem(id);
    // LOCALSTORAGE.set("items", this.model.items);
    this.view.deleteNote(id);
  }
}
