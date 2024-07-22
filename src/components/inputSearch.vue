<template>
  <div style="display: flex; justify-content: center; align-items: center;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="部门">
        <el-select v-model="selectedBM" placeholder="请选择部门">
          <el-option value="01" label="市所" />
          <el-option value="03" label="东所" />
          <el-option value="05" label="南所" />
          <el-option value="07" label="西所" />
          <el-option value="09" label="北所" />
          <el-option value="06" label="滨海所" />
        </el-select>
      </el-form-item>
      <el-form-item label="科目">
        <el-select v-model="selectedKM" placeholder="请选择考试科目">
          <el-option value="1" label="科目一" />
          <el-option value="2" label="科目二" />
          <el-option value="3" label="科目三" />
        </el-select>
      </el-form-item>
      <el-form-item label="考场">
        <el-select v-loading="KCloading" v-model="selectedKCResult" placeholder="请选择考场" @focus="selectedKCFocus">
          <el-option v-for="item in selectedKC.options" :value="item.value" :label="item.label" :key="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker type="date" placeholder="选择考试日期" v-model="selectedKSRQ" style="width: 220px"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="isButtonDisabled" @click="onSubmit">
          <el-icon>
            <Search />
          </el-icon>
          查询
        </el-button>
        <el-button type="primary" :disabled="isButtonDisabled" @click="ondownload">
          <el-icon>
            <ArrowDownBold />
          </el-icon>
          下载
        </el-button>
      </el-form-item>
    </el-form>
  </div>

  <div style="display: flex; justify-content: center; align-items: center;">

    <span>重点关注人数：</span><span style="color: red;">{{ gzrs }}</span><span>人。</span>
  </div>

  <el-row style="padding:20px">

    <el-col :span="6" :offset='3' style="display: flex; justify-content: center; align-items: center;">

      <el-form label-width="auto" style="padding:20px" class="demo-form-inline" :model="zdgzrytj" :rules="rules1"
        ref="formRef1">
        <el-form-item>
          <h3 style="margin-left: auto; margin-right: auto; display: block;">重点关注人员统计</h3>
        </el-form-item>
        <el-form-item label="实际到场人数" prop="sjdcrs">
          <el-input v-model="zdgzrytj.sjdcrs" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="缺考人数" prop="qkrs">
          <el-input v-model="zdgzrytj.qkrs" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="缺考率" prop="qkv">
          <el-input v-model="zdgzrytj.qkv" style="width: 100px" disabled></el-input>
        </el-form-item>
        <el-form-item label="合格人数" prop="hgrs">
          <el-input v-model="zdgzrytj.hgrs" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="不合格人数" prop="bhgrs">
          <el-input v-model="zdgzrytj.bhgrs" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="合格率" prop="hgk">
          <el-input v-model="zdgzrytj.hgk" style="width: 100px" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6" style="display: flex; justify-content: center;">
      <el-form :model="formRef2Model" :rules="rules2" ref="formRef2" label-width="auto" style="padding:20px">
        <el-form-item>
          <h3 style="margin-left: auto; margin-right: auto; display: block;">预约总人数</h3>
        </el-form-item>
        <el-form-item label="预约总人数" prop="yyzrs">
          <el-input v-model="formRef2Model.yyzrs" style="width: 100px"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6" style="display: flex; justify-content: center; align-items: center;">

      <el-form label-width="auto" style="padding:20px" :model="drksrytj" :rules="rules3" ref="formRef3">
        <el-form-item>
          <h3 style="margin-left: auto; margin-right: auto; display: block;">当日考试人员统计</h3>
        </el-form-item>
        <el-form-item label="实际到场人数" prop="sjdcrs">
          <el-input v-model="drksrytj.sjdcrs" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="缺考人数" prop="qkrs">
          <el-input v-model="drksrytj.qkrs" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="缺考率" prop="qkv">
          <el-input v-model="drksrytj.qkv" style="width: 100px" disabled></el-input>
        </el-form-item>
        <el-form-item label="合格人数" prop="hgrs">
          <el-input v-model="drksrytj.hgrs" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="不合格人数" prop="bhgrs">
          <el-input v-model="drksrytj.bhgrs" style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="合格率" prop="hgk">
          <el-input v-model="drksrytj.hgk" style="width: 100px" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

  <div style="display: flex; justify-content: center; align-items: center;">
    <el-button type="primary" :disabled="isButtonDisabled2" @click='submitForm'><el-icon>
        <Suitcase />
      </el-icon>提交</el-button>
  </div>
  <el-drawer v-model='drawer' title="提交数据" size="20%" direction='btt' :show-close='false'>
    <template #header="{ close, titleId, titleClass }">

      <h4 :id="titleId" :class="titleClass">提交信息验证失败</h4>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left">
          <CircleCloseFilled />
        </el-icon>
        关闭
      </el-button>
    </template>
    <div style="display: flex; justify-content: center; align-items: center;"> <span>{{ validmassage }}</span></div>
  </el-drawer>
</template>

<script lang="ts" setup>
import {  onMounted, reactive, ref, watch } from 'vue'
import { getData, postData } from '../plugins/index.js'
import emitter from '../plugins/Bus.js';
import { ElNotification } from 'element-plus'
const selectedKC = reactive({
  options: []
})
const formInline = reactive({
  selectedBM: '',
  selectedKM: '',
})
let KCloading = ref(false)
let receiveSelectKCData = []
const selectedBM = ref('')
const selectedKM = ref('')
const selectedKCResult = ref('')
const selectedKSRQ = ref('')
const isButtonDisabled = ref(true) // 按钮是否禁用
let gzrs = ref('-') //重点关注人数
const selectedKCFocus = async () => {
  KCloading.value = true
  getData('/getKC').then(response => {
    receiveSelectKCData = response
    selectedKC.options = receiveSelectKCData.filter(item => item.FSBH === selectedBM.value && item.KCLB === selectedKM.value).map(item => {
      return { value: item.FCODE, label: item.FNAME }
    })
  })
  KCloading.value = false
}
// 监听表单项变化，判断按钮是否禁用
watch([selectedBM, selectedKM, selectedKCResult, selectedKSRQ], () => {
  isButtonDisabled.value = ((selectedBM.value !== '') & (selectedKM.value !== '') & (selectedKCResult.value !== '') & (selectedKSRQ.value !== '')) ? false : true
})
watch([selectedBM, selectedKM], () => { selectedKCResult.value = '' })
const onSubmit = () => {
  emitter.emit("selectKC", selectedKCResult);
  emitter.emit("selectKSRQ", selectedKSRQ);

  //查询逻辑
  const selectedOption = selectedKC.options.find(option => option.value === selectedKCResult.value);
  postData('/postyyks', { FNAME: selectedOption.label, YKRQ:selectedKSRQ.value.toLocaleDateString() }).then(response => {
    gzrs.value=response.success  
  })

}



const ondownload = () => {
  console.log('下载')
}
///----下半截----///

let zdgzrytj = reactive({
  sjdcrs: '' , //实际到场人数
  qkrs: '' , //缺考人数
  qkv: '', // 缺考率
  hgrs: '' , //合格人数
  bhgrs: '' , //不合格人数
  hgk: '', //合格率
})

//监听zdgzrytj所有数据的变化，重新计算缺考率和合格率
watch([() => zdgzrytj.sjdcrs, () => zdgzrytj.qkrs, () => zdgzrytj.hgrs, () => zdgzrytj.bhgrs], () => {
  zdgzrytj.qkv = (zdgzrytj.qkrs / zdgzrytj.sjdcrs * 100).toFixed(2) + "%"
  zdgzrytj.hgk = ((zdgzrytj.hgrs / (parseInt(zdgzrytj.hgrs) + parseInt(zdgzrytj.bhgrs))) * 100).toFixed(2) + "%"
})

let yyzrs = ref('') //预约总人数


let drksrytj = reactive({
  sjdcrs: '' , //实际到场人数
  qkrs: '' , //缺考人数
  qkv: '', // 缺考率
  hgrs: '' , //合格人数
  bhgrs: '' , //不合格人数
  hgk: '', //合格率
})

//监听drksrytj所有数据的变化，重新计算缺考率和合格率
watch([() => drksrytj.sjdcrs, () => drksrytj.qkrs, () => drksrytj.hgrs, () => drksrytj.bhgrs], () => {
  drksrytj.qkv = (drksrytj.qkrs / drksrytj.sjdcrs * 100).toFixed(2) + "%"
  drksrytj.hgk = ((drksrytj.hgrs / (parseInt(drksrytj.hgrs) + parseInt(drksrytj.bhgrs))) * 100).toFixed(2) + "%"
})


const formRef1 = ref(null)
const rules1 = reactive({
  sjdcrs: [
    { required: true, message: '请输入', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' }
  ],
  qkrs: [
    { required: true, message: '请输入', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value > zdgzrytj.sjdcrs) {
          callback(new Error('缺考人数太多'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  hgrs: [
    { required: true, message: '请输入', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' }
  ],
  bhgrs: [
    { required: true, message: '请输入', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' }
  ]
});

const formRef2 = ref(null);
let formRef2Model = reactive({
  yyzrs: ''
});

const rules2 = reactive({
  yyzrs: [
    { required: true, message: '请输入', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' }
  ]
});


const formRef3 = ref(null)
const rules3 = reactive({
  sjdcrs: [
    { required: true, message: '请输入', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' }
  ],
  qkrs: [
    { required: true, message: '请输入', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value > drksrytj.sjdcrs) {
          callback(new Error('缺考人数太多'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  hgrs: [
    { required: true, message: '请输入', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' }
  ],
  bhgrs: [
    { required: true, message: '请输入', trigger: 'blur' },
    { pattern: /^\d+$/, message: '请输入数字', trigger: 'blur' }
  ]
});

const submitForm = async () => {
  const validateForm1 = formRef1.value.validate()
  const validateForm2 = formRef2.value.validate()
  const validateForm3 = formRef3.value.validate()

  //基本检查
  const validResults = await Promise.all([validateForm1, validateForm2, validateForm3])
  const allValid = validResults.every(result => result)
  if (!allValid) {
    return false;
  }
  //按钮检查
  else if (validbutton()) {
    drawer.value = true;
    return false;
  }
  //全部通过
  else {
    console.log('提交')
    const selectedOption = selectedKC.options.find(option => option.value === selectedKCResult.value);
    postData('/postimportdept', {
      KCMC: selectedOption.label,
      ZDGZ: gzrs.value,
      KM: selectedKM.value,
      ZDSJDCRS: zdgzrytj.sjdcrs,
      ZDQKRS: zdgzrytj.qkrs,
      ZDHGRS: zdgzrytj.hgrs,
      ZDBHGRS: zdgzrytj.bhgrs,
      ZDQKL: zdgzrytj.qkv,
      ZDHGL: zdgzrytj.hgk,
      YYZRS: yyzrs.value,
      DRSJDCRS: drksrytj.sjdcrs,
      DRQKRS: drksrytj.qkrs,
      DRHGRS: drksrytj.hgrs,
      DRBHGRS: drksrytj.bhgrs,
      DRQKL: drksrytj.qkv,
      DRHGL: drksrytj.hgk,
      JLZT: '1',
      KSRQ: new Date(selectedKSRQ.value).toLocaleDateString(),
    }).then(response => {
      if (response.success) {
        ElNotification({
          title: '提交成功',
          message: "部门：" + selectedOption.label + "，日期：" + new Date(selectedKSRQ.value).toLocaleDateString(),
          type: 'success',
        })
      }

    });
  }
};

let isButtonDisabled2 = ref(true)
//将提交按钮做成动态的，监听3个form组件，所有的验证通过后自动按钮可点
watch([() => zdgzrytj.sjdcrs, () => zdgzrytj.qkrs, () => zdgzrytj.hgrs, () => zdgzrytj.bhgrs, () => formRef2Model.yyzrs, () => drksrytj.sjdcrs, () => drksrytj.qkrs, () => drksrytj.hgrs, () => drksrytj.bhgrs], () => {
  //判断是否有空值
  if (zdgzrytj.sjdcrs && zdgzrytj.qkrs && zdgzrytj.hgrs && zdgzrytj.bhgrs && formRef2Model.yyzrs && drksrytj.sjdcrs && drksrytj.qkrs && drksrytj.hgrs && drksrytj.bhgrs) {
    isButtonDisabled2.value = false
  } else {
    isButtonDisabled2.value = true
  }
})
//将formRef2Model.yyzrs自动赋值给yyzrs
watch(() => formRef2Model.yyzrs, () => {
  yyzrs.value = formRef2Model.yyzrs
})


onMounted(() => {
  emitter.on("gzrs", (data) => {
    gzrs.value = data
  })
})



const drawer = ref(false)
let validmassage = ref('')
let validbutton = () => {
  if ((parseInt(zdgzrytj.sjdcrs) + parseInt(zdgzrytj.qkrs)) != gzrs.value) {
    validmassage.value = '实际到场人数+缺考人数≠重点关注人数，不能通过验证。'
    drawer.value = true;
    return true
  }
  if ((parseInt(zdgzrytj.hgrs) + parseInt(zdgzrytj.bhgrs)) != parseInt(zdgzrytj.sjdcrs)) {
    validmassage.value = '合格人数+不合格人数≠实际到场人数，不能通过验证。'
    drawer.value = true;
    return true
  }
  if ((parseInt(drksrytj.sjdcrs) + parseInt(drksrytj.qkrs)) != yyzrs.value) {
    validmassage.value = '实际到场人数+缺考人数≠预约总人数，不能通过验证。'
    drawer.value = true;
    return true
  }
  if ((parseInt(drksrytj.hgrs) + parseInt(drksrytj.bhgrs)) != parseInt(drksrytj.sjdcrs)) {
    validmassage.value = '合格人数+不合格人数≠实际到场人数，不能通过验证。'
    drawer.value = true;
    return true
  }
}

</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.h3 {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
