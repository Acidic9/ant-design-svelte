<script>
  import {afterUpdate, onDestroy} from 'svelte'
  import React from 'react'
  import {render as ReactDOMrender, unmountComponentAtNode} from 'react-dom'
  let container: any
  afterUpdate(async () => {
    const { component, children, ...props } = $$props
    ReactDOMrender(React.createElement(component, props, props.children), container)
  })
  onDestroy(() => {
	unmountComponentAtNode(container)
  })
</script>

<div bind:this={container}/>