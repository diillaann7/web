new Vue({
  el: '#app',
  data() {
    return {
      newTodo: '',
      todos: JSON.parse(localStorage.getItem('todos') || '[]'),
      filter: 'all', 
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'active') {
        return this.todos.filter(t => !t.completed);
      }
      if (this.filter === 'completed') {
        return this.todos.filter(t => t.completed);
      }
      return this.todos;
    },
    remaining() {
      return this.todos.filter(t => !t.completed).length;
    },
    hasCompleted() {
      return this.todos.some(t => t.completed);
    }
  },
  methods: {
    addTodo() {
      const text = this.newTodo.trim();
      if (!text) return;

      this.todos.push({
        id: Date.now(),
        text,
        completed: false,
      });

      this.newTodo = '';
      this.saveTodos();
    },
    removeTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id);
      this.saveTodos();
    },
    clearCompleted() {
      this.todos = this.todos.filter(t => !t.completed);
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  },
  watch: {
    todos: {
      handler() {
        this.saveTodos();
      },
      deep: true
    }
  }
});
