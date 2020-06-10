<template>
  <div class="home">
    <!-- <router-link to="/userUpimage">图片上传</router-link> |
    <router-link to="/VueCropperDemo">图片裁剪</router-link> -->
    <div class="header">
     <Menu mode="horizontal" theme="light" active-name="1">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            <router-link to="/userUpimage">图片上传</router-link> 
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            <router-link to="/VueCropperDemo">图片裁剪</router-link>
        </MenuItem>
    </Menu>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      
    }
  }
}
</script>
<style lang="less" scoped>
  .header {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    padding-top: 70px;
  }
</style>

