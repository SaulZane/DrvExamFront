<template>
  <div>
    <el-form :model="form" :inline="true" class="demo-form-inline" ref="formRef">
      <el-form-item v-for="field in fields" :key="field.prop" :label="field.label" :prop="field.prop" :rules="field.rules"> 
        <el-input v-model="form[field.prop]" :placeholder="field.placeholder"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" :disabled="!isFormValid"><el-icon><List /></el-icon>提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { List } from '@element-plus/icons-vue';
import { ref, reactive, watch } from 'vue';
import emitter from '../plugins/Bus';
const form = reactive({
  SJDC: '',
  QK: '',
  HG: '',
  BHG: ''
});

const isFormValid = ref(false);

const formRef = ref();

const validateNumber = (rule, value, callback) => {
  const reg = /^\d+$/;
  
  if (!reg.test(value)) {
    callback(new Error('请输入数字'));
  } else {
    callback();
  }
};

const fields = [
  { label: '到场', prop: 'SJDC', rules: [{ required: true, message: '请输入实际到场人数', trigger: 'blur' }, { validator: validateNumber, trigger: 'blur' }], placeholder: '请输入实际到场人数' },
  { label: '缺考', prop: 'QK', rules: [{ required: true, message: '请输入缺考人数', trigger: 'blur' }, { validator: validateNumber, trigger: 'blur' }], placeholder: '请输入缺考人数' },
  { label: '合格', prop: 'HG', rules: [{ required: true, message: '请输入合格人数', trigger: 'blur' }, { validator: validateNumber, trigger: 'blur' }], placeholder: '请输入合格人数' },
  { label: '不合格', prop: 'BHG', rules: [{ required: true, message: '请输入不合格人数', trigger: 'blur' }, { validator: validateNumber, trigger: 'blur' }], placeholder: '请输入不合格人数' }
];

const submitForm = () => {

  formRef.value.validate((valid) => {
    if (valid) {      
      
    } else {
      console.log('表单验证未通过');
    }
  });
};

let listen=emitter.on('selectKC', (data) => {
        console.log(data.value);
      })
let listen2= emitter.on('selectKSRQ', (data) => {
        console.log(data.value);
      })
watch(form, () => {
  //如果表单值没填写，不触发验证
  if (Object.values(form).some(value => value === '')) {
    isFormValid.value = false;
    return;
  }

  formRef.value.validate((valid) => {
    isFormValid.value = valid;
  });
}, { deep: true });

</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>