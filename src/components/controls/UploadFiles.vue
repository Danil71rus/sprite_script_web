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
                    <div class="flex-row between" style="width: 180px">
                        <size> {{ file.size }}</size>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "vue-property-decorator"

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

@Component

export default class UploadFiles extends Vue {

    selectedFiles = []
    currentFile = []
    progress = 0
    fileInfos = []

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
                this.$router.push({ path: `/${response.data.dirName}` })
                return UploadFilesService.getFiles({
                  dirName: response.data.dirName,
                });
            })
            .then(files => {
                this.fileInfos = files.data;
                this.$emit("success");
            })
            .catch(() => {
                this.progress = 0;
                this.message = "Could not upload the file!";
                this.currentFile = undefined;
            });

        this.selectedFiles = undefined;
    }

    mounted() {
        const obg = this.$route.params.dir ? {dirName: this.$route.params.dir} : undefined
        UploadFilesService.getFiles(obg).then(response => {
            this.fileInfos = response.data;
        });
    }
}
</script>

<style scoped lang="scss">
.upload-files {
    width: 600px;
    margin-top: 60px;
    .name {
        width: 300px;
    }
    size {
        &::after {
            content: "Мб";
            font-weight: bold;
        }
    }
}
</style>
