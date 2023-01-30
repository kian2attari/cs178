<script>
  // #Component - the todo app itself is a component than can be reused in other projects
  // The app could be broken down into smaller components, but since the app is simple,
  // I've kept it all in one file
  // component logic
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
    <form>
      <input
        class="js-todo-input"
        type="text"
        aria-label="Enter a new todo item"
        placeholder="E.g. Build a web app"
      />
    </form>
  </div>
</main>
