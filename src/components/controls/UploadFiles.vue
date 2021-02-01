<template>
    <div>
        <div v-if="currentFile" class="progress">
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
        <label class="btn btn-default">
            <input type="file" ref="file" @change="selectFile" multiple/>
        </label>

        <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">
            Upload
        </button>

        <div class="alert alert-light" role="alert">{{ message }}</div>

        <div class="card">
            <div class="card-header">List of Files</div>
            <ul class="list-group list-group-flush">
                <li
                    class="list-group-item"
                    v-for="(file, index) in fileInfos"
                    :key="index"
                >
                    <a :href="file.url">{{ file.name }}</a>
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

    static getFiles() {
        return Vue.axios.get("/files");
    }
}

@Component

export default class UploadFiles extends Vue {

    selectedFiles = []
    currentFile = []
    progress = 0
    message = ""
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
                this.message = response.data.message;
                return UploadFilesService.getFiles();
            })
            .then(files => {
                this.fileInfos = files.data;
            })
            .catch(() => {
                this.progress = 0;
                this.message = "Could not upload the file!";
                this.currentFile = undefined;
            });

        this.selectedFiles = undefined;
    }

    mounted() {
        UploadFilesService.getFiles().then(response => {
            this.fileInfos = response.data;
        });
    }
}
</script>
