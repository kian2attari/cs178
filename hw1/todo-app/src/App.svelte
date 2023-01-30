<script>
  // #Component
  import TodoItems from './components/Todos.svelte';

  import Blankslate from './components/Blankslate.svelte';
  // #Component - the todo app itself is a component than can be reused in other projects
  import { afterUpdate } from 'svelte';
  // We hook into the afterUpdate lifecycle hook to refocus on the input field after DOM updates
  afterUpdate(() => {
    document.querySelector('.js-todo-input').focus();
  });

  // #Reactive
  let todoItems = [];
  // #Reactive
  let newTodo = '';

  let appTitle = 'ToDo';

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
    // #Format (inserted data into string dynamically)
    console.log(`Todo with id ${todo.id} added!`);
    // #Reactive on newTodo var to clear the input field
  }
</script>

<main>
  <!-- This code just outlines the basic structure/layout and style of the app component (HTML/CSS) -->
  <div class="container">
    <!-- #text-exp -->
    <!-- The "Tasks" could just be called whatever the app name is -->
    <!-- The Text Expressions concept helps reduce repetition -->
    <h1 class="app-title">{appTitle}!</h1>
    <!-- #Component pass delete method as well to Todoitems-->
    <TodoItems bind:todoItems />
    <!-- #controlFlow #if -->
    {#if todoItems.length == 0}
      <!-- #Component -->
      <Blankslate {appTitle} />
    {/if}
    {#if todoItems.length > 0}
      <p class="todo-count">
        <!-- #Format (inserted data into string dynamically) -->
        You have {todoItems.length}
        {appTitle.toLowerCase()}s!
      </p>
    {/if}
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
