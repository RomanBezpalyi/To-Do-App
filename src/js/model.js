import shortid from "shortid";

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
    if (formState.progressValue !== "" && formState.progressValue !== "All") {
      this.filteredItems = this.filteredItems.filter(
        item => item.progress === formState.progressValue
      );
    }

    if (formState.priorityValue !== "" && formState.priorityValue !== "All") {
      this.filteredItems = this.filteredItems.filter(
        item => item.priority === formState.priorityValue
      );
    }
  }

  getItemsFromLS() {
    if (localStorage.items) {
      try {
        this.items = JSON.parse(localStorage.getItem("items"));
        this.filteredItems = this.items;
      } catch (e) {
        console.error("Error while parsing.");
      }
    }
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

  addItem({ title, text, priority, progress }) {
    const item = {
      id: shortid(),
      text,
      title,
      priority,
      progress
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

  updateProgressStatus(id) {
    const currentItem = this.findItem(id);
    const newItem =
      currentItem.progress === "Open"
        ? (currentItem.progress = "Done")
        : (currentItem.progress = "Open");

    this.items.forEach(item => (item.id === id ? newItem : item));
  }
}
