<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <button class="itl-button" @click="click">Оптимизировать картинки</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
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
.itl-button {
    margin-top: 20px;
    min-width: 100px;
    min-height: 40px;
    padding: 10px;
    background: #42b983;
    color: aliceblue;
    font-size: 16px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 4px;
    transition: all 0.4s ease-in-out;

    &:hover {
        background: #00aac1;
        cursor: pointer;
    }
}
</style>
