<script>
  // #Component - the todo app itself is a component than can be reused in other projects
  // The app could be broken down into smaller components, but since the app is simple,
  // I've kept it all in one file
  let todoItems = [];
  let newTodo = '';

  function addTodo() {
    newTodo = newTodo.trim();
    if (!newTodo) return;

    const todo = {
      text: newTodo,
      checked: false,
      id: Date.now(),
    };

    // #Reactive
    // Because Svelte's reactivity is based on assignments, using array methods like
    // .push() and .splice() won't automatically trigger updates
    // We use the spread operator and reassignment below to trigger the update and take advantage of
    // Svelte's reactivity
    todoItems = [...todoItems, todo];
    newTodo = '';
  }
</script>

<main>
  <!-- This code just outlines the basic structure/layout and style of the app component (HTML/CSS) -->
  <div class="container">
    <h1 class="app-title">ToDo!</h1>
    <ul class="todo-list" />
    <div class="empty-state">
      <svg class="checklist-icon"><use href="#checklist-icon" /></svg>
      <!-- This should only appear when there are no entries -->
      <h2 class="empty-state__title">Add your first task</h2>
      <p class="empty-state__description">Let's get some things done!</p>
    </div>
    <!-- #EventHandler Specifies the function that should run on the submit event with addTodo() as the handler  -->
    <form on:submit|preventDefault={addTodo}>
      <!-- #Binding We bind the prop value to the reactive variable newTodo -->
      <input
        class="js-todo-input"
        type="text"
        aria-label="Add a new task to do"
        placeholder="E.g. Eat breakfast"
        bind:value={newTodo}
      />
    </form>
  </div>
</main>
