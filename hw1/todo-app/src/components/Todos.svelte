<script>
  export let todoItems = [];

  function toggleDone(id) {
    // #Properties - on the item id
    const index = todoItems.findIndex((item) => item.id === Number(id));
    // #Properties - we use the . notation to access properties of the todo object
    todoItems[index].checked = !todoItems[index].checked;
  }

  function deleteTodo(id) {
    // #Reactive reassignment
    todoItems = todoItems.filter((item) => item.id !== Number(id));
    console.log(`Todo with id ${id} deleted!`);
  }
</script>

<ul class="todo-list">
  <!-- #controlFlow #loop -->
  <!-- #controlFlow #each iterates over the todoItems array and creates a new <li> for each item to the DOM -->
  <!-- #key uniquely identifies each item in the array using svelt's () syntax -->
  {#each todoItems as todo (todo.id)}
    <!-- #Properties checked property access -->
    <li class="todo-item {todo.checked ? 'done' : ''}">
      <input id={todo.id} type="checkbox" />
      <!-- #EventHandler on:click specifies the function that should run on the click event with toggleDone() as the handler  -->
      <label for={todo.id} class="tick" on:click={() => toggleDone(todo.id)} />
      <span>{todo.text}</span>
      <button class="delete-todo" on:click={() => deleteTodo(todo.id)}>
        <svg><use href="#delete-icon" /></svg>
      </button>
    </li>
  {/each}
</ul>
