<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <br>
        <g-button value="Оптимизировать картинки" @click="click"/>
        <hr>
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
   click() {
       alert("ok")
       // Vue.axios.get('http://localhost:3000/compress-file').then((response) => {
       //     console.log(`response: ${response.data}`)
       // }).catch( error=> {
       //     console.log(`error: ${error}`)
       // })
   }
}
</script>
<style lang="scss">
</style>
