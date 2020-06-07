<template>
  <div class="container">
    <p v-cloak>{{title}}</p>
    <div class="up">
      <Upload class="logo-up"
              ref="upload"
              :on-success="handleSuccess"
              :on-error="handleError"
              :format="formatVal"
              :max-size="maxSize"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :type="upType"
              :multiple="false"
              :headers="headers"
              :action="action">
        <div class="user-up-img"
             v-show="showImg">
          <img :src="showImg" />
        </div>
        <div class="no-img"
             v-show="!showImg">
          <Icon type="ios-cloud-upload"
                size="52"></Icon>
          <p>点击此处上传图片</p>
        </div>
      </Upload>
      <p class="tip"
         v-cloak>{{tip}}</p>
    </div>
  </div>
</template>
<script>
// import Cookies from 'js-cookie'
export default {
  name: 'upImage',
  props: {
    // 上传请求头设置，可以设置token和其它一些需要的参数
    headers: {
      required: false,
      type: Object,
      // default: () => { return { 'Access-Control-Allow-Origin': '*', XYTOKEN: Cookies.get('.XYTOKEN') } }
    },
    // 允许上传的尺寸
    maxSize: {
      required: false,
      type: Number,
      default: 10240
    },
    // 去请求的后台接口
    action: {
      required: true,
      type: String
    },
    // 请求的格式
    formatVal: {
      required: false,
      type: Array,
      default: () => ['jpg', 'jpeg', 'png']
    },
    // 是否允许拖拽上传，具体配置可见iview官网  https://www.iviewui.com/docs/guide/install
    upType: {
      required: false,
      type: String,
      default: 'drag'
    },
    // 上传下方提示文字
    tip: {
      required: false,
      type: String,
      default: '照片尺寸需要大于100x100像素，格式为JPG,JPEG,PNG 或者不超过10M' // 照片尺寸需要大于100x100像素，格式为JPG,JPEG,PNG 或者不超过10M
    },
    // 标题
    title: {
      required: false,
      type: String,
      default: '上传头像：'
    }
  },
  data () {
    return {
      resInfo: {}, // 上传成功后用于存后台返回的数据 引用组件可以通过 this.$refs['ref'].resInfo 来获取
      imgUrl: '' // 要显示的图片路径
    }
  },
  computed: {
    // 是否显示上传图片控件，有头像就显示头像，没有就显示文字
    showImg: {
      get () {
        return this.imgUrl
      },
      set (val) {
        this.imgUrl = val
      }
    }
  },
  methods: {
    // eslint-disable-next-line handle-callback-err
    handleError (error, file, fileList) {
      console.log(error)
      console.log(file)
      console.log(fileList)
      this.comm.msgError('上传失败了！')
    },
    // 上传成功
    handleSuccess (res, file) {
      console.log(file)
      this.resInfo = res.data
      // 上传成功后及时跟新显示图片，后面加随机数字，目的是为了防止浏览缓存
      this.showImg = `${this.$store.state.apiPath}${res.data.UserImgVirtualPath}?${Math.round(Math.random() * 100000000)}`
      this.comm.msgSuc(res.msg)
    },
    // 上传类型错误报错
    handleFormatError (file) {
      console.log(file)
      this.comm.msgError(`上传失败！只允许上传格式为${this.formatVal.join('、')}的图片`)
    },
    // 上传大小超出报错
    handleMaxSize (file) {
      console.log(file)
      this.comm.msgError(`上传失败！${file.name}图片大小不能超过${this.maxSize / 1024}M`)
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
  > p {
    width: 100px;
    font-size: 14px;
    color: #515a6e;
    text-align: center;
  }
  .up {
    // width: 300px;
    // height: 104px;
    width: 164px;
    .user-up-img {
      img {
        height: 104px;
        width: 164px;
      }
    }
    .logo-up {
      p {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }
      i {
        color: #c3c3c3;
      }
      .no-img {
        padding: 20px 0;
      }
      .no-img:hover i,
      .no-img:hover p {
        color: #3399ff;
      }
    }
    .tip {
      padding-top: 10px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
}
</style>
