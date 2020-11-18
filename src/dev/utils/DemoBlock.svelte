<script>
    export let minHeight: string = '40px'
    export let width: string = '100%'
    export let background: string = 'rgb(0, 146, 255) none repeat scroll 0% 0%'
    export let color: string = 'white'
    let styles: string = `
        background: ${background};
        padding: 8px 0px;
        text-align: center;
        min-height: ${minHeight};
        width: ${width};
        color: ${color};
    `
</script>

<div style={styles}>
    <slot></slot>
</div>