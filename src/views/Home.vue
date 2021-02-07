<template>
    <div class="home">
        <h3 @click="hideGif" title="Скрыть gif">Инструкция gif. Файлы только с расширением png!!!</h3>
        <img class="setup-gif" v-show="isShowGif" :src="require(`@a/setup.gif`)" @click="hideGif"/>
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
    isShowGif = true
    hideGif() {
        this.isShowGif = !this.isShowGif
    }
}
</script>
<style lang="scss">
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: auto;
    .setup-gif {
        width: 30%;
        cursor: pointer;
        transition: width 1s ease;
        &:hover {
            width: 90%;
        }
    }
    h3 {
        cursor: pointer;
        &:hover {
            color: #0f5498;
        }
        margin-bottom: 15px;
    }
}
@media (max-width: 600px) {
    .home {
        width: 100%;
    }
}
</style>
