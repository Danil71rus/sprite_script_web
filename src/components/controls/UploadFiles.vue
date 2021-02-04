<template>
    <div class="upload-files">
        <div v-if="currentFile.length" class="progress">
            <div
                class="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{ width: progress + '%' }"
            >
                {{ progress }}%
            </div>
        </div>
        <div class="flex-row between">
            <label class="btn btn-default">
                <!--webkitdirectory mozdirectory-->
                <input type="file" ref="file" @change="selectFile" multiple webkitdirectory mozdirectory/>
            </label>

            <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">
                Загрузить
            </button>
        </div>

        <div v-if="fileInfos.length" class="card">
            <div class="card-header">Список файлов</div>
            <ul class="list-group list-group-flush">
                <li
                    class="list-group-item flex-row between"
                    v-for="(file, index) in fileInfos"
                    :key="index"
                >
                    <div class="name">{{ file.name }}</div>
                    <div v-if="toFileInfos.length" class="compare flex-row between ">
                        <div class="flex-column">
                            <div class="size"> {{ file.size }}</div>
                            <div class="size"> {{ toFileInfos[index].size }}</div>
                        </div>
                        <div class="persent"> {{ getPersent(file.size, toFileInfos[index].size) }}</div>
                    </div>
                    <div v-else class="size"> {{ file.size }}</div>
                </li>
            </ul>
        </div>
        <div class="download flex-row middle mt-x2">
            <g-button v-if="fileInfos.length" :is-loading="isLoading" value="Оптимизировать картинки" @click="click"/>
            <g-link v-if="urlDownload" :href="urlDownload" value="Скачать архив"/>
        </div>

    </div>
</template>

<script>
import {Component, Vue, Watch} from "vue-property-decorator"
import GButton from "@c/controls/g-button"
import GLink from "@c/controls/g-link"

class UploadFilesService {
    static upload(files, onUploadProgress) {
        const formData = new FormData();

        for( let i = 0; i < files.length; i++ ){
            const file = files[i];
            formData.append('file', file);
        }

        return Vue.axios.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    static getFiles(params) {
        return Vue.axios.get("/files", {params: params});
    }
}

@Component({
    components: {GLink, GButton}
})

export default class UploadFiles extends Vue {
    @Watch("$route.params.dir", {immediate: true})
    onChengUrl() {
        const obg = this.$route.params.dir ? {dirName: this.$route.params.dir} : undefined
        UploadFilesService.getFiles(obg).then(response => {
            this.fileInfos = response.data;
        }).catch(err=>{
            this.$router.push({ path: `/compress` });
        });
    }

    selectedFiles = []
    currentFile = []
    progress = 0
    fileInfos = []
    toFileInfos = []
    isLoading = false

    get urlDownload() {
        return this.toFileInfos.length && this.$route.params.dir ?
            `http://localhost:3000/zip?dirName=${this.$route.params.dir}`: false
    }

    selectFile() {
        this.selectedFiles = this.$refs.file.files;
    }

    upload() {
        this.progress = 0;

        this.currentFile = this.selectedFiles;

        UploadFilesService.upload(this.currentFile, event => {
            this.progress = Math.round((100 * event.loaded) / event.total);
        })
            .then(response => {
                this.$router.push({ name: 'Compress', params: { dir: response.data.dirName } });
                return UploadFilesService.getFiles({
                  dirName: response.data.dirName,
                });
            })
            .then(files => {
                this.fileInfos = files.data;
            })
            .catch(() => {
                this.progress = 0;
                this.message = "Could not upload the file!";
                this.currentFile = [];
            });

        this.selectedFiles = [];
    }

    delayPromis(ms, res) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve(res)
            }, ms);
        });
    }

     click() {
        if (this.$route.params.dir) {
            const obg = {dirName: this.$route.params.dir}
            Vue.axios.get('/compress-file', {params: obg})
                .then(res=>{
                    this.isLoading = true
                    return this.delayPromis(5000, res);
                })
                .then((response) => {
                    return UploadFilesService.getFiles({
                        dirName: response.data,
                    });
                })
                .then(res => {
                    this.isLoading = false
                    this.toFileInfos = res.data;
                })
                .catch(() => {
                    this.progress = 0;
                    this.message = "Could not upload the file!";
                    this.currentFile = [];
                })
        }
    }

    getPersent(a, b) {
        a = Number(a);
        b = Number(b);
        return (((a-b)/a)*100).toFixed(0);
    }
}
</script>

<style scoped lang="scss">
.upload-files {
    width: 600px;
    margin-top: 60px;
    margin-bottom: 60px;
    .list-group-item {
        align-items: center;
        .compare {
            align-items: center;
        }
        .name {
            width: 300px;
        }
        .size {
            margin-right: 16px;
            &::after {
                content: " Мб";
                font-weight: bold;
            }
        }
        .persent {
            color: #00B956;
            &::after {
                content: "%";
                font-weight: bold;
            }
        }
    }
    .download {
        justify-content: center;
        &>*:not(:last-child) {
           margin-right: 20px;
        }
        a {

        }
    }
}
</style>
