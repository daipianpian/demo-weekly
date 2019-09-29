<template>
  <div>周报详情</div>
</template>

<script>
export default {
  data () {
    return {
      weeklyId: null
    }
  },
  created () {
    this.weeklyId = this.$route.query.weeklyId
    console.log('this.weeklyId==' + this.weeklyId)
  }
}
</script>

<style lang="scss">
</style>
