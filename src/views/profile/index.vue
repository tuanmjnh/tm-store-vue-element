<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      // user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    // ...mapState({
    //   user: state => state.auth.user
    // })
    ...mapGetters({
      user: 'authUser'
    })
  },
  created() {
    // if (this.user.phoneNumber) this.user.phoneNumber = this.user.phoneNumber.replace(`+${this.user.phoneRegion}`, '')
    // this.getUser()
    if (this.user.phoneNumber) this.user.phoneNumber = this.user.phoneNumber.replace(`+${this.user.phoneRegion}`, '')
    if (this.$store.state.auth.roles && this.$store.state.auth.roles.length > 0) {
      this.user.role = this.$store.state.auth.roles[0].name
    }
  },
  methods: {
    getUser() {
      this.user = {
        id: this.authUser.uid,
        email: this.authUser.email,
        name: this.authUser.displayName,
        role: this.authUser.roles.join(' | '),
        avatar: this.authUser.photoURL,
        phone: this.authUser.phoneNumber ? this.authUser.phoneNumber.replace(`+${this.authUser.phoneRegion}`, '') : '',
        phoneRegion: this.authUser.phoneRegion,
        introduction: this.authUser.note,
        verified: this.authUser.emailVerified
      }
    }
  }
}
</script>
