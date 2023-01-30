<script>
  // #Component - the todo app itself is a component than can be reused in other projects
  // The app could be broken down into smaller components, but since the app is simple,
  // I've kept it all in one file

  // We hook into the afterUpdate lifecycle hook to refocus on the input field after DOM updates
  import { afterUpdate } from 'svelte';

  afterUpdate(() => {
    document.querySelector('.js-todo-input').focus();
  });

  //TODO: Make these into props by exporting them from a separate file
  let appTitle = 'ToDo';
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

    // #Format (inserted data into string dynamically)
    console.log(`Todo with id ${todo.id} added!`);

    // #Reactive
    // Because Svelte's reactivity is based on assignments, using array methods like
    // .push() and .splice() won't automatically trigger updates
    // We use the spread operator and reassignment below to trigger the update and take advantage of
    // Svelte's reactivity
    todoItems = [...todoItems, todo];
    // #Reactive on newTodo var to clear the input field
    newTodo = '';
  }

  function toggleDone(id) {
    // #Properties - on the item id
    const index = todoItems.findIndex((item) => item.id === Number(id));
    // #Properties - we use the . notation to access properties of the todo object
    todoItems[index].checked = !todoItems[index].checked;
  }

  function deleteTodo(id) {
    // #Reactive reassignment
    todoItems = todoItems.filter((item) => item.id !== Number(id));
  }
</script>

<main>
  <!-- This code just outlines the basic structure/layout and style of the app component (HTML/CSS) -->
  <div class="container">
    <!-- #text-exp -->
    <!-- The "Tasks" could just be called whatever the app name is -->
    <!-- The Text Expressions concept helps reduce repetition -->
    <h1 class="app-title">{appTitle}!</h1>
    <ul class="todo-list">
      <!-- #controlFlow #loop -->
      <!-- #each iterates over the todoItems array and creates a new <li> for each item to the DOM -->
      <!-- #key uniquely identifies each item in the array using svelt's () syntax -->
      {#each todoItems as todo (todo.id)}
        <!-- #Properties checked property access -->
        <li class="todo-item {todo.checked ? 'done' : ''}">
          <input id={todo.id} type="checkbox" />
          <!-- #EventHandler on:click specifies the function that should run on the click event with toggleDone() as the handler  -->
          <label
            for={todo.id}
            class="tick"
            on:click={() => toggleDone(todo.id)}
          />
          <span>{todo.text}</span>
          <button class="delete-todo" on:click={() => deleteTodo(todo.id)}>
            <svg><use href="#delete-icon" /></svg>
          </button>
        </li>
      {/each}
    </ul>
    <div class="empty-state">
      <svg class="checklist-icon"><use href="#checklist-icon" /></svg>
      <!-- This should only appear when there are no entries -->
      <!-- #text-exp -->
      <h2 class="empty-state__title">Add your first {appTitle}</h2>
      <!-- #text-exp -->
      <p class="empty-state__description">Let's get some {appTitle}s done!</p>
    </div>
    <!-- #EventHandler Specifies the function that should run on the submit event with addTodo() as the handler  -->
    <form on:submit|preventDefault={addTodo}>
      <!-- #Binding We bind the prop value to the reactive variable newTodo -->
      <!-- #text-exp in the value attribute's value  -->
      <!-- #Attributes (ex. value attribute) -->
      <input
        class="js-todo-input"
        type="text"
        aria-label="Add a new {appTitle}"
        placeholder="E.g. Eat breakfast"
        bind:value={newTodo}
      />
    </form>
  </div>
</main>
