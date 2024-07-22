<!-- 用  <upload :withKey='1'/> 方式传参数，注意大小写！-->
<template>
    <el-upload class="upload-demo" drag action="http://localhost:8000/uploadfile/" :on-progress="onprogress"
        :on-success="onSuccess" :data="withkey" :before-upload="onBeforeUpload">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            {{ uploadtext }}
        </div>
    </el-upload>
</template>

<script lang="ts" setup >
import { reactive, ref ,defineProps} from 'vue';
import { ElNotification } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue'
import { UploadProgressEvent, UploadFile, UploadFiles, UploadRawFile } from 'element-plus'
let withkey = defineProps([ "withKey" ])
let uploadtext = ref('把Excel文件拖到此地或者点击此区域进行上传')
const onprogress = (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => {

    uploadtext.value = '上传中...'

}
const onSuccess = (response: any, file: UploadFile, fileList: UploadFiles) => {
    if (response.error) {
        ElNotification({
            title: "上传失败",
            message: response.error,
            type: 'error',
            duration: 30000,
        })
    }
    else {
        ElNotification({
            title: '上传成功',
            message: 'Excel文件已上传',
            type: 'success',
        })
    }
    uploadtext.value = '把Excel文件拖到此地或者点击此区域进行上传'
}

const onBeforeUpload = (rawFile: UploadRawFile) => { withkey.withKey; return true }
</script>

<style lang="scss" scoped></style>