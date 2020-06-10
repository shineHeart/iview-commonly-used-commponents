<template>
<div>
  <Modal
    v-model="modalValue"
    :title="title"
    @on-ok="saveImg"
    :okText='okText'
    width="900"
    @on-cancel="modalValue = false">
    <div class="cropper-box">
      <div class="comp-box">
        <div class="cropper-content">
          <div class="cropper">
            <vueCropper ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="option.info" :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            @realTime="realTime"
            @imgLoad="imgLoad">
            </vueCropper>
          </div>
          <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </div>
        <div class="footer-btn">
          <div class="scope-btn">
            <label class="btn" for="uploads">选择图片</label>
            <input type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
            <Button  @click="rotateLeft"><span>↺</span></Button>
            <Button  @click="rotateRight"><span>↻</span></Button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</div>
</template>

<script>
  import { VueCropper } from 'vue-cropper'

  export default {
    name: 'cropper',
    props: {
      title: { // 弹出框标题
        type: String,
        required: false,
        default: '图片裁剪'
      },
      img: { // 初始化背景图（之前的老图）
        type: String,
        required: false,
        default: ''
      },
      okText: { // 确认按钮名称
        type: String,
        required: false,
        default: '保存'
      },
      outputType: { // 裁剪生成图片的格式
        type: String,
        required: false,
        default: 'jpeg'
      },
      canScale: { // 图片是否允许滚轮缩放 true = 可以
        type: Boolean,
        required: false,
        default: true
      },
      fixedBox: { // 是否可以修改截图框的大小 true = 不可以
        type: Boolean,
        required: false,
        default: true
      },
      autoCropWidth: { // 默认生成截图框宽度
        type: Number,
        required: false,
        default: 150
      },
      autoCropHeight: { // 默认生成截图框高度
        type: Number,
        requiredd: false,
        default: 150
      },
      url: { // 默认生成截图框高度
        type: String,
        required: true
      }
    },
    data () {
      return {
        previews: {}, // 剪切后显示的图片
        option: {
          img: this.img || '', // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
          centerBox: true, // 截图框是否被限制在图片里面
          full: true, // 是否输出原图比例的截图
          outputSize: 1, // 裁剪生成图片的质量
          outputType: this.outputType, // 裁剪生成图片的格式
          canScale: this.canScale, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: this.autoCropWidth, // 默认生成截图框宽度
          autoCropHeight: this.autoCropHeight, // 默认生成截图框高度
          fixed: false, // 是否开启截图框宽高固定比例
          fixedNumber: [1, 1], // 截图框的宽高比例
          fixedBox: this.fixedBox // 是否可以修改截图框的大小
        },
        modalValue: false, // 弹出框状态
        file: null // 截取后的图片，当用户提交时，将图片以文件流当形式传给后台
      }
    },
    components: {
      VueCropper
    },
    methods: {
      // 修改图片大小 正数为变大 负数变小
      changeScale (num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      // 向右边旋转90度
      rotateLeft () {
        this.$refs.cropper.rotateLeft()
      },
      // 向右边旋转90度
      rotateRight () {
        this.$refs.cropper.rotateRight()
      },
      // 实时预览函数
      realTime (data) {
        this.previews = data
      },
      // 提交图片
      saveImg () {
        this.$refs.cropper.getCropBlob(data => {
          if (data.size / 1024 / 1024 > 1) {
            return this.comm.msgError(`图片大小不能超过1M，当前图片大小为${~~(data.size / 1024 / 1024)}M`)
          }
          // 将blob转换为file
          let files = new window.File([data], this.file[0].name, { type: this.file[0].type })
          this.submit(files)
        })
      },
      async submit (data) {
        let formData = new FormData()
        formData.append('file', data)
        formData.append('fileType', 'IMAGE')
        this.comm.loading()
        let res = await this.comm.post(this.url, formData)
        this.comm.unloading()
        if (res.success) {
          this.comm.msgSuc(res.msg || '保存成功')
          // 将上传后的图片地址回传给调用组件
          this.$emit('resImgUrl', { imgUrl: window.URL.createObjectURL(data), resDt: res })
          console.log(window.URL.createObjectURL(data))
          this.modalValue = false
        } else {
          this.modalValue = true
          this.comm.msgError(res.msg || '保存失败')
        }
      },
      // 点击确定图片时
      uploadImg (e) {
        // 上传图片
        this.file = e.target.files
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          return this.comm.msgError('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        }
        let reader = new FileReader()
        reader.onload = ev => {
          let data = ''
          if (typeof ev.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([ev.target.result]))
          } else {
            data = ev.target.result
          }
          this.option.img = data
        }
        reader.readAsDataURL(this.file[0])
      },
      // 图片加载的回调 imgLoad 返回结果success, error
      imgLoad (msg) {
        console.log(msg)
      }
    }
  }
</script>

<style lang="less" scpoed>
  .cropper-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .comp-box {
      width: 100%;
      padding: 20px;
      .cropper-content {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
        align-items: center;
        .cropper {
          width: 350px;
          height: 300px;
        }
        .show-preview {
          flex: 1;
          -webkit-flex: 1;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          -webkit-justify-content: center;
          .preview {
            overflow: hidden;
            // border-radius: 50%;
            border: 1px solid #cccccc;
            background: #cccccc;
            margin-left: 40px;
          }
        }
      }
    }
    .footer-btn {
      padding-top: 20px;
      // display: flex;
      // display: -webkit-flex;
      // justify-content: flex-end;
      // -webkit-justify-content: flex-end;
      .scope-btn {
        // position: absolute;
        clip: rect(0 0 0 0);
        // width: 350px;
        // display: flex;
        // display: -webkit-flex;
        // justify-content: space-between;
        // -webkit-justify-content: space-between;
        input {
          display: none;
        }
        button {
          margin-left: 10px;
          span {
            font-weight: 600;
          }
        }
      }
      .upload-btn {
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
      }
      .btn {
        outline: none;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: 0.1s;
        transition: 0.1s;
        font-weight: 500;
        padding: 10px 15px;
        font-size: 12px;
        border-radius: 3px;
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;
      }
    }
}
</style>
