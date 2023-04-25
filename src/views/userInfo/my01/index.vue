<template>
  <div>
    <h2>my01</h2>
    {{ testVuex }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'My01',
  computed: {
    ...mapGetters(['testVuex'])
  }
}
</script>

<style>

</style>
