<template>
    <div
        class="itl-spinner"
    >
        <img :src="require(`@a/spinner-16.svg`)" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component
export default class GSpinner extends Vue {
}
</script>

<style lang="scss" scoped>
@keyframes awesome-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.itl-spinner {
    display: inline-block;
    vertical-align: middle;
    color: $primary;
    animation: awesome-spin 1s linear infinite;
}
</style>
