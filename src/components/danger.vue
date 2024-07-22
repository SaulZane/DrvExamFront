<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div style="padding-top: 20px;">
    <el-row >
        <el-col :span="20" :offset="2"  >
            <div :class="['dangerdiv', skin]" >
        
        <el-row>
          <el-col :span="24" style="padding: 20px;">
            <h3>灰名单手工录入区</h3>
        </el-col>
        </el-row>
        <el-row >
            <el-col >
                <div>
                    <!-- <el-button type="primary" @click="changeColortored">测试</el-button> -->

                    <div class="my-2 flex items-center text-sm" >
                        <el-radio-group v-model="radioseg" class="ml-4" @change="radioChange">
                            <el-radio value="1">加入灰名单</el-radio>
                            <el-radio value="2">解除灰名单</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col  style="padding-top: 15px;">
                <div style="display: flex; justify-content: center; align-items: center;">
                    <el-form :model="dangerlist" :inline="true" class="demo-form-inline">
                        <el-form-item label="身份证明号码：">
                            <el-input v-model="dangerlist.sfzmhm"  style="width: 200px"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名：">
                            <el-input v-model="dangerlist.xm"  style="width: 150px"></el-input>
                        </el-form-item>
                        <el-form-item :label=llr>
                            <el-input v-model="dangerlist.lrr" style="width: 150px"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input v-model="dangerlist.bz" placeholder="可对此记录选填备注" style="width: 300px"></el-input>
                        </el-form-item>
                        
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <div style="padding-bottom: 20px;">
            <el-button type="primary" :disabled="buttdisabled" @click="postblacklist"><el-icon><MagicStick /></el-icon>现在上传信息</el-button>
        </div>
        
    </div>
        </el-col>
    </el-row>
</div>
   
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { postData } from "../plugins/index.js";
import { ElNotification } from 'element-plus';

// 初始化 skin 为 'dangergray'
let skin = ref("dangergray");
// 定义改变颜色的方法
const changeColortored = () => {
    // 当点击按钮时，将 skin 的值改为 'dangerred'
    skin.value = "dangerred";
};
const changeColortogreen = () => {
    // 当点击按钮时，将 skin 的值改为 'dangeryellow'
    skin.value = "dangergreen";
}

const radioseg = ref('')
const buttdisabled = ref(true)
let dangerlist = reactive({
    sfzmhm: '',
    xm: '',
    bz: '',
    lrr: ''
})

//显示加入人还是删除人
let llr = ref('人员信息')
//单选按钮变化时触发

//单选按钮变化时触发
const radioChange = (val) => {
    if (val == '1') {
        changeColortored()
        llr.value = '加入人：'
    } else {
        changeColortogreen()
        llr.value = '解除人：'
    }

}

watch(() => [dangerlist,radioseg], () => {
    if (dangerlist.sfzmhm && radioseg.value ) {
        buttdisabled.value = false
    } else {
        buttdisabled.value = true
    }
}, { deep: true })

//上传灰名单
const postblacklist = async () => {
    await postData('/postblacklist', {
        sfzmhm: dangerlist.sfzmhm,
        xm: dangerlist.xm,
        bz: dangerlist.bz,
        lrr: dangerlist.lrr,
        type:radioseg.value
    }).catch(err => {
        console.log(err)
    }).then(res=>{
        console.log(res)
        if(res.success){
        ElNotification({
        title: '灰名单加入成功',
        message: "身份证明号码:"+res.success.sfzmhm,
        type: 'success',
        })}
        if(res.error){
            ElNotification({
            title: '灰名单操作失败',
            message: res.error,
            type: 'error',
            })}
        if(res.delete){
        ElNotification({
        title: '灰名单解除成功',
        message: "身份证明号码:"+res.delete.sfzmhm,
        type: 'success',
        })}    

  })
    
    }


</script>



<style lang="scss" scoped>
.dangerdiv {
    border: 1px dashed #000;
    /* 设置边框为1px的虚线，颜色为黑色 */
    border-radius: 10px;
    /* 圆角的半径为10px */
    padding: 10px;
    /* 内边距 */
    text-align: center;
    /* 文字居中 */
    transition: background-color 1.5s;
    /* 平滑过渡背景色变化 */
}

.dangerred {
    background-color: #FFE4E1;
}

.dangergreen {
    background-color: #E0EEEE;
}

.dangergray {
    background-color: #e5eaf3;
    /* 默认颜色为灰色 */
}
</style>
