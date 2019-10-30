import shortid from "shortid";
// import LOCALSTORAGE from "./services/localstorage";

export default class Model {
  constructor(items = []) {
    this.items = items;
    this.selectedItemId = null;
    this.filteredItems = [];
  }

  filterItems(formState) {
    const isEmptyState = Object.values(formState).every(el => el === "");
    if (isEmptyState) {
      this.filteredItems = this.items;
    }
    if (formState.inputValue !== "") {
      this.filteredItems = this.filteredItems.filter(item =>
        item.title.toLowerCase().includes(formState.inputValue.toLowerCase())
      );
    }
    if (formState.progressValue !== "" && formState.progressValue !== "all") {
      this.filteredItems = this.filteredItems.filter(
        item => item.done === formState.progressValue
      );
    }

    if (formState.priorityValue !== "" && formState.priorityValue !== "all") {
      this.filteredItems = this.filteredItems.filter(
        item => item.priority === formState.priorityValue
      );
    }
  }

  getItemsFromLS() {
    this.items = LOCALSTORAGE.get("items") || [];
    this.filteredItems = this.items;
  }

  findItem(id) {
    return this.items.find(item => item.id === id);
  }

  setSelectedItemId(id) {
    this.selectedItemId = id;
  }

  getSelectedItemId() {
    return this.selectedItemId;
  }

  addItem({ title, text, priority, done }) {
    const item = {
      id: shortid(),
      text,
      title,
      priority,
      done
    };
    this.items.push(item);
    return item;
  }

  updateItem(id, note) {
    const itemToUpdate = { ...this.findItem(id), ...note };
    this.items = this.items.map(item => (item.id === id ? itemToUpdate : item));
  }

  deleteItem(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  updateDoneStatus(id) {
    const currentItem = this.findItem(id);
    const newItem =
      currentItem.done === "open"
        ? (currentItem.done = "done")
        : (currentItem.done = "open");

    this.items.forEach(item => (item.id === id ? newItem : item));
  }
}
