<template>
  <div></div>
</template>
<script>
export default {
  created () {
    console.log('Refresh 刷新当前页面')
    if (this.$route.query.name) {
      this.$router.replace({ name: this.$route.query.name })
    } else {
      console.log('refresh fail')
    }
  }
}
</script>
