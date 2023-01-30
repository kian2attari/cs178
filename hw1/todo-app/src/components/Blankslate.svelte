<script>
  export let appTitle;
</script>

<div class="empty-state">
  <svg class="checklist-icon"><use href="#checklist-icon" /></svg>
  <!-- This should only appear when there are no entries -->
  <!-- #text-exp -->
  <h2 class="empty-state__title">Add your first {appTitle}</h2>
  <!-- #text-exp -->
  <p class="empty-state__description">Let's get some {appTitle}s done!</p>
</div>
