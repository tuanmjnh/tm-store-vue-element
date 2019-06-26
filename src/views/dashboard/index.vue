<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    // ...mapGetters([
    //   'auth'
    // ])
  },
  created() {
    if (!this.$store.state.auth.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
    // auth.currentUser.updateProfile({
    //   displayName: "tuanmjnh",
    //   phoneNumber: '0888814222',
    //   photoURL: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    // }).then(function() {
    //   console.log(auth.currentUser)
    // }).catch(function(err) {
    //   console.log(err)
    // });
  }
}
</script>
