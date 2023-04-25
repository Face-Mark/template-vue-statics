<template>
  <div>
    <h2>home</h2>
    <div class="des" @click="goLink()"><span>go about</span></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    goLink () {
      this.$router.push('/about')
      console.log('111111', this.$router)
    }
  }
}
</script>

<style lang="scss" scoped>
  .des {
    span {
      color: greenyellow;
    }
  }
</style>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
