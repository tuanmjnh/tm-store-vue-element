<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ $t('settings.title') }}</h3>

      <div class="drawer-item">
        <span>{{ $t('settings.theme') }}</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.tagsView') }}</span>
        <el-switch v-model="tags_view" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch v-model="fixed_header" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.sidebarLogo') }}</span>
        <el-switch v-model="sidebar_logo" class="drawer-switch" />
      </div>

    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'

export default {
  components: { ThemePicker },
  data() {
    return {
      // fixed_header: true
    }
  },
  computed: {
    setting() {
      const rs = this.$store.state.auth.setting
      console.log(rs)
      return rs
    },
    tags_view: {
      get() {
        return this.$store.state.auth.setting.tags_view
      },
      set(val) {
        // this.$store.state.auth.setting.fixed_header = val
        this.$store.dispatch('auth/changeSetting', {
          key: 'tags_view',
          value: val,
          loading: true
        })
      }
    },
    fixed_header: {
      get() {
        return this.$store.state.auth.setting.fixed_header
      },
      set(val) {
        // this.$store.state.auth.setting.fixed_header = val
        this.$store.dispatch('auth/changeSetting', {
          key: 'fixed_header',
          value: val,
          loading: true
        })
      }
    },
    sidebar_logo: {
      get() {
        return this.$store.state.auth.setting.sidebar_logo
      },
      set(val) {
        // this.$store.state.auth.setting.fixed_header = val
        this.$store.dispatch('auth/changeSetting', {
          key: 'sidebar_logo',
          value: val,
          loading: true
        })
      }
    }
    //   tagsView: {
    //     get() {
    //       return this.$store.state.settings.tagsView
    //     },
    //     set(val) {
    //       this.$store.dispatch('settings/changeSetting', {
    //         key: 'tagsView',
    //         value: val
    //       })
    //     }
    //   },
    //   sidebarLogo: {
    //     get() {
    //       return this.$store.state.settings.sidebarLogo
    //     },
    //     set(val) {
    //       this.$store.dispatch('settings/changeSetting', {
    //         key: 'sidebarLogo',
    //         value: val
    //       })
    //     }
    //   }
  },
  methods: {
    themeChange(val) {
      // this.$store.dispatch('settings/changeSetting', {
      //   key: 'theme',
      //   value: val
      // })
      this.$store.dispatch('auth/changeSetting', {
        key: 'theme',
        value: val,
        loading: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
