<template>
  <div>
    <up-image ref="upImg"
              :action="action"></up-image>
    <!-- <Button type="primary" @click="upHandler">点我显示上传控件</Button> -->
  </div>
</template>
<script>
import upImage from './UpImage.vue'
export default {
  name: 'userUpimage',
  data () {
    return {
      action: 'wwww.yukan.com/api'
    }
  },
  components: {
    upImage
  },
  methods: {
    // upHandler () {
    //   this
    // }
  }
}
</script>
<style lang="less" scoped>
</style>
