<template>
<div class="box">
   <Button @click="open" type="primary">点我裁剪图片</Button>
    <cropper :title="title" :img="img" ref="vueCropper" :url="url" @resImgUrl="getImgUrl"></cropper>
    <img :src="resImgUrl" />
</div>
</template>

<script>
// 引入组件
  import cropper from '@/components/pictureCropping/Cropper.vue'
  export default {
    name: 'VueCropperDemo',
    data () {
      return {
        // 改url对应图片服务器上的接口，下面举例url来自于教师管理-编辑页面的图片上传接口
        url: 'your api path',
        title: '图片裁剪测试demo',
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        resImgUrl: ''
      }
    },
    // 注册组件
    components: {
      cropper
    },
    methods: {
      // 打开弹窗
      open () {
        this.$refs['vueCropper'].modalValue = true
      },
      // 监听子组件的上传成功后返回被截取图片在本地的地址和后台返回的数据
      getImgUrl (url) {
        // let dt = url.resDt // 后台返回的数据
        this.resImgUrl = url.imgUrl // 被裁剪过的图片
      }
    }
  }
</script>

<style lang="less" scpoed>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
