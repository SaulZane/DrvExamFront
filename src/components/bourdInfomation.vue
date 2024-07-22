<template>
    <div>
        <el-form :inline="true" :model="form" :rules="rules" ref="announcementForm">
            <el-form-item>输入新的公告内容</el-form-item>
            <el-form-item prop="announcement">
                <el-input v-model="form.announcement" style="width: 480px" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" :disabled="!isFormValid">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { ElForm } from 'element-plus';
import { getData, postData } from '../plugins/index.js';
import { bourdInfo } from '../stores/base.js';

// 表单数据
const form = reactive({
    announcement: '',
});

// 表单验证规则
const rules = {
    announcement: [
        { required: true, message: '公告内容不能为空', trigger: 'change' },
    ],
};

// 表单实例
const announcementForm = ref<InstanceType<typeof ElForm>>();

// 挂载时获取数据
onMounted(async () => {
    const response = await getData('/bourdinfo');
    form.announcement = response;
});

// 提交表单
const submit = async () => {
    if (!announcementForm.value) return;
    announcementForm.value.validate(async (valid) => {
        if (valid) {
            const response = await postData('/bourdinfochange', form.announcement);
            form.announcement = response;
            const bourdinfo = bourdInfo();
            bourdinfo.info = response;
        }
    });
};

// 计算表单是否有效
const isFormValid = computed(() => {
    return form.announcement !== '';
});
</script>

<style scoped></style>