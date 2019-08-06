<template>
  <div class="dashboard-container">
    <component :is="dashboard" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import editor from './editor'
import admin from './admin'
export default {
  name: 'Dashboard',
  components: { editor, admin },
  data() {
    return {
      dashboard: 'editor'
    }
  },
  computed: {
    // ...mapGetters([
    //   'auth'
    // ])
  },
  created() {
    if (this.$store.state.auth.roles.some(x => x.type === 'manager')) this.dashboard = 'admin'
  }
}
</script>
