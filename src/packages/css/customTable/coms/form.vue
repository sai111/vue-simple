<template>
  <div class="receiver-form">
    <div class="head">
      <div class="head-li head-li-index">
        序号
      </div>
      <div class="head-li">
        请输入企业名称
      </div>
      <div class="head-li head-li-tel">
        请输入手机号码
      </div>
    </div>
    <div class="receiver-form-body scrollbar-components">
      <el-scrollbar style="width: 100%; height: 100%">
        <el-form :model="form" ref="form" class="custom-form">
          <div
            v-for="(item, index) in form.list"
            :key="'item-li-' + index"
            class="item-li-wrap"
          >
            <el-form-item label="" style="width: 100px">
              <div class="form-index">
                {{ index + 1 }}
              </div>
            </el-form-item>
            <el-form-item
              :prop="'list.' + index + '.companyName'"
              label=""
              :rules="rules.companyName"
              style="width: calc(50% - 50px);"
            >
              <el-input
                v-model.trim="item.companyName"
                placeholder="请输入企业名称"
                class="item-li-company"
              />
            </el-form-item>
            <el-form-item
              :prop="'list.' + index + '.telNo'"
              label=""
              :rules="rules.telNo"
              style="width: calc(50% - 50px);"
            >
              <el-input
                v-model.trim="item.telNo"
                placeholder="请输入您的手机号码"
                class="item-li-company"
              />
              <span v-if="form.list.length > 1" @click="removeForm(index)">
                <i class="el-icon-delete" />
              </span>
            </el-form-item>
          </div>
        </el-form>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import regexp from '@/lib/utils/regexp.js'
export default {
  name: 'CustomTable',
  components: {},
  props: {},
  data() {
    return {
      form: {
        list: [{ companyName: '', telNo: '' }]
      },
      rules: {
        companyName: [
          { required: true, message: '请输入企业名称'}
        ],
        telNo: [
          { required: true, message: '请输入您的手机号码' },
          { max: 11, message: '字符长度最大为11' },
          { pattern: regexp.mobile, message: '请填写正确的手机号' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    addForm() {
      this.form.list.push({ companyName: '', telNo: '' })
      this.resetForm('form')
    },
    removeForm(index) {
      this.resetForm('form')
      this.form.list.splice(index, 1)
    },
    resetForm(formName) {
      this.$refs[formName].clearValidate()
    },
    initForm() {
      this.form = {
        list: [{ companyName: '', telNo: '' }]
      }
    },
    submitForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('success')
            resolve(this.form)
          } else {
            this.$message.error('请正确填写收件人信息！')
            reject()
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.receiver-form{
  width: 100%;
  .head {
    width: 100%;
    display: flex;
    .head-li {
      width: calc(50% - 50px);
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #DCDFE6;
      border-right: none;
    }
    .head-li-index {
      width: 100px;
    }
    .head-li-tel {
      border-right: 1px solid #DCDFE6;
    }
  }
  .receiver-form-body {
    width: 100%;
    height: 240px;
  }
  .item-li-wrap {
    width: 100%;
    display: flex;
    border: 1px solid #DCDFE6;
    border-top: none;
    .el-form-item {
      margin-bottom: 0;
    }
    .form-index {
      text-align: center;
      height: 54px;
      line-height: 54px;
    }
  }
  ::v-deep .custom-form.el-form {
    .el-form-item__content{
      height: 54px;
      border-right: 1px solid #DCDFE6;
      .item-li-company.el-input{
        width: 90%;
        padding: 7px 5%;
        box-sizing: border-box;
        .el-input__inner{
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .el-form-item__error {
      left: 5%;
      top: 8%;
    }
  }
}
::v-deep .scrollbar-components {
  .el-scrollbar {
    .el-scrollbar__wrap{
      overflow-x: hidden;
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
}
</style>
