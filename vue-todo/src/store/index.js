import { createStore } from 'vuex'

const storage = {
    fetch() {
        const arr = [];
        if(localStorage.getItem.length > 0) {
            for(let i = 0; i < localStorage.length; i++) {
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
        }
        return arr;
    }
}

const store = createStore({
  state: {
    todoItems: storage.fetch()
  },
  mutations: {
    addOneItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
      localStorage.removeItem(payload.todoItem.item);
      state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
      state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
      localStorage.removeItem(payload.todoItem.item);
      localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    clearAllItems(state) {
      localStorage.clear();
      state.todoItems = [];
    }
  }
})

export default store