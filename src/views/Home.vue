<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <br>
        <g-button value="Оптимизировать картинки" @click="click"/>
        <hr>
        <form id="uploadForm"
              enctype="multipart/form-data"
              action="/api/file"
              method="post"
        >
            <input type="file" name="userFile"/>
            <input type="submit" value="Upload File" name="submit">
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GButton from "@/components/controls/g-button.vue"

@Component({
    components: {GButton}
})
export default class Home extends Vue {
   click() {
       Vue.axios.get('http://localhost:3000/compress-file').then((response) => {
           console.log(`response: ${response.data}`)
       }).catch( error=> {
           console.log(`error: ${error}`)
       })
   }
}
</script>
<style lang="scss">
</style>
