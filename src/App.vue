<template>
  <div id="app">
    <!-- <loading v-if="$store.state.$appLoading" /> -->
    <router-view />
  </div>
</template>

<script>
// firebase
// import firebase from '@/api/firebase/index'
// import loading from './components/LoadingContent'
export default {
  name: 'App',
  // components: { loading },
  data() {
    return {
      // loading: true
    }
  },
  created() {
    // this.init()
  },
  methods: {
    // async init() {
    //   await this.$store.dispatch('roles/select')
    //   const user = firebase.auth().currentUser
    //   if (user) {
    //     await this.$store.commit('auth/SET_AUTH', user)
    //     await this.$store.dispatch('auth/getUser', { uid: user.uid })
    //   }
    //   this.loading = false
    // }
  }
}
</script>
<style lang="scss">
@import "@/assets/site.scss";
@import "@/assets/el-responsive.scss";
// @import "@/assets/responsive.scss";
</style>
