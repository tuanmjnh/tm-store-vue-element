<template>
  <el-timeline :reverse="reverse">
    <el-timeline-item v-for="(item, index) in items" :key="index" :icon="item.icon" :type="item.type"
      :color="getColor(item.action)" :size="item.size"
      :timestamp="item.at?$moment(item.at.toDate()).format(format):$t('global.updating')">
      {{ $t(`global.${item.action}`) }}: {{ item.by }}
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
    reverse: { type: Boolean, default: false },
    format: { type: String, default: 'DD/MM/YYYY hh:mm' }
  },
  methods: {
    getColor(action) {
      switch (action) {
        case 'insert': return '#1890FF'
          break
        case 'update': return '#DCD005'
          break
        case 'trash': return '#13C2C2'
          break
        case 'recover': return '#11A983'
          break
        case 'delete': return '#F5222D'
          break
        default: return '#6959CD'
          break
      }
    }
  }
}
</script>

<style>
</style>
