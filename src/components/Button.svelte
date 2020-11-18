<script>
  import { createEventDispatcher } from 'svelte'

  export let label: string = ''

  const dispatch = createEventDispatcher()

  function onClick(event: Event) {
    dispatch('click', event)
  }
</script>

<button
  type="button"
  class={'ant-btn ant-btn-primary'}
  on:click={onClick}
  >
  {label}
</button>
