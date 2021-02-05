<template>
    <div class="home">
        <upload-files></upload-files>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GButton from "@/components/controls/g-button.vue"
import UploadFiles from "@/components/controls/UploadFiles.vue"

@Component({
    components: {UploadFiles, GButton}
})
export default class Home extends Vue {

}
</script>
<style lang="scss">
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: auto;
}
@media (max-width: 600px) {
    .home {
        width: 100%;
    }
}
</style>
