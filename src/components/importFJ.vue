<template>
    <div>
    <el-row>
        <el-col :span="6" class="right-content">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleFileChange"
                :file-list="fileList"  :show-file-list="false" :auto-upload="false">
                <el-button   type="primary">选择文件</el-button>
            </el-upload>
        </el-col>
        <el-col :span="6" class="left-60">
            <el-text>{{ filePath }}</el-text>
        </el-col>
        <el-col :span="6" class="right-60">
            <el-input v-model="remark" placeholder="输入备注"></el-input>
        </el-col>
        <el-col :span="6" class="left-content">
            <el-button  type="primary" @click="submit">提交</el-button>
        </el-col>
    </el-row>
            
</div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const fileList = ref([])
const filePath = ref('')
const remark = ref('')

const handleFileChange = (file, fileList) => {
    if (file.raw) {
        filePath.value = file.raw.name
    }
}

const submit = () => {
    console.log('Input value:', inputValue.value)
    console.log('File path:', filePath.value)
    console.log('Remark:', remark.value)
    console.log('Submitted file:', fileList.value)
    // 在这里处理提交逻辑
}
</script>

<style>
.left-content{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.right-content{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.left-60{
    flex: 0 0 60%; 
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 20px;
    padding-left: 10px;
}
.right-60{
    flex: 0 0 60%; 
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    padding-right: 10px;
}
.el-button {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>