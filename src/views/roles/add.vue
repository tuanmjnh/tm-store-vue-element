<template>
  <el-form>
    <loading-content v-if="loading"></loading-content>
    <!-- <hr class="hr"> -->
    <el-tabs v-model="tabs">
      <el-tab-pane :label="$t('tabs.main')" name="primary">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item prop="key" :label="$t('roles.key')" :rules="[
            {required: true, message: $t('login.msg_required_username'), trigger: 'change'},
            {min:4, message: $t('login.msg_min_username',{min:4}), trigger: 'change'}]">
            <el-input v-model="form.key" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="name" :label="$t('roles.name')"
            :rules="[{required: true, message: $t('login.msg_required_username'), trigger: 'change'}]">
            <el-input v-model="form.name" type="text"></el-input>
          </el-form-item>
          <el-form-item :label="$t('global.desc')">
            <el-input v-model="form.desc" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="roleid" :label="$t('tabs.updated')" name="secondary" class="details">
        <el-timeline :reverse="true">
          <el-timeline-item v-for="(item, index) in form.log" :key="index" :icon="item.icon" :type="item.type"
            :color="item.color" :size="item.size"
            :timestamp="item.at?$moment(item.at.toDate()).format('DD/MM/YYYY hh:mm'):$t('global.updating')">
            {{ $t(`global.${item.action}`) }}: {{ item.by }}
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
    </el-tabs>
    <div class="row-flex">
      <div class="spacer" />
      <el-button-group>
        <el-tooltip effect="dark" :content="$t('global.add')" placement="bottom">
          <el-button type="primary" :loading="loading_add" :disabled="loading_drafts" @click="onSubmit('add')">
            <svg-icon icon-class="add" />
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('global.cancel')" placement="bottom">
          <el-button :loading="loading_drafts" :disabled="loading_add" @click="$emit('update:dialog', false)">
            <svg-icon icon-class="back" />
          </el-button>
        </el-tooltip>
      </el-button-group>
    </div>
  </el-form>
</template>

<script>
import LoadingContent from '@/components/LoadingContent'
import * as api from '@/api/firebase/roles'
export default {
  components: { LoadingContent },
  props: {
    dialog: { type: Boolean, default: false },
    roleid: { type: String, default: '' },
    items: { type: Array, default: () => [] }
  },
  data() {
    return {
      loading: false,
      loading_add: false,
      loading_drafts: false,
      tabs: 'primary',
      form: {},
      default: {
        key: '',
        name: '',
        desc: ''
      }
    }
  },
  watch: {
    roleid(val) {
      if (val) {
        this.loading = true
        api.find(val).then((x) => {
          this.form = x
        }).catch((err) => {
          this.$message.error(this.$t(err.message))
        }).finally(() => {
          this.loading = false
        })
      }
      console.log(val)
    },
    dialog(val) {
      if (!val) this.reset()
    }
  },
  created() {
    this.form = { ...this.default }
  },
  methods: {
    onSubmit(action) {
      if (this.$route.params.id) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading_add = true
            api.edit({ id: this.$route.params.id, data: this.form }).then((x) => {
              if (x) this.form.log.unshift(x)
              this.$message.success(this.$t('success.update'))
            }).catch((err) => {
              this.$message.error(this.$t(err.message))
            }).finally(() => {
              this.loading_add = false
            })
          }
        })
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (action === 'add') {
              this.loading_add = true
            } else {
              this.loading_drafts = true
            }
            api.add({ data: this.form }).then((x) => {
              this.$emit('update:items', [...this.items, ...[x]])
              this.reset()
              this.$message.success(this.$t('success.insert'))
            }).catch((err) => {
              this.$message.error(this.$t(err.message))
            }).finally(() => {
              this.loading_add = false
              this.loading_drafts = false
            })
          }
        })
      }
    },
    reset() {
      this.form = { ...this.default }
      this.$emit('update:roleid', '')
      this.$refs.form.resetFields()
      // this.loading_add = false
      // this.loading_drafts = false
    }
  }
}
</script>

<style>
</style>
