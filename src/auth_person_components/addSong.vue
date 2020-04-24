<template>
    <div id="addSong">
        <div class="line-box ">
            <el-input placeholder="请输入歌曲名" v-model="song.name" required></el-input>
        </div>
        <div class="line-box ">
            <el-input placeholder="请输入专辑名" v-model="song.artist" required></el-input>
        </div>
        <div class="line-box">
            <span>上传封面</span>
            <el-upload
                    action="#"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :http-request="upload"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <div class="line-box">
            <span>上传歌曲</span>
            <el-upload
                    action="#"
                    :on-remove="handleRemove"
                    :http-request="upload"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
        <div class="line-box">
            <span>上传歌词</span>
            <el-upload
                    action="#"
                    :on-remove="handleRemove"
                    :http-request="upload"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>


    </div>
</template>
<script>
    export default {
        name: "AddSong",
        data() {
            return {
                dialogVisible: false,
                dialogImageUrl: "",
                song: {
                    name: "",
                    artist: "",
                    src: "",
                    cover: "",
                    lrc: ""
                }
            }
        },
        methods: {
            upload() {

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }

        }
    }
</script>
<style lang="less">
    #addSong {
        max-width: 40vw;
        background-color: rgba(255, 255, 255, .8);
        padding: 1em;

        .line-box {
            margin-bottom: .5em;
        }
    }
</style>