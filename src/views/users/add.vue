<template>
  <el-form autocomplete="off">
    <!-- <hr class="hr"> -->
    <el-tabs v-model="tabs">
      <el-tab-pane :label="$t('tabs.main')" name="one">
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item prop="email" label="Email" :rules="[
            {required: true, message: $t('error.required'), trigger: 'blur'},
            {type: 'email', message: $t('error.email'), trigger: 'blur'}]">
            <el-input v-model="form.email" v-trim autocomplete="off"
              @blur="()=>{if(form.email)form.email=form.email.toLowerCase()}" />
          </el-form-item>
          <el-tooltip v-if="!item" v-model="capsTooltip" :content="$t('login.caps_lock')" placement="right" manual>
            <el-form-item prop="password" :label="$t('users.password')" :rules="[
            {required: true, message: $t('error.required'), trigger: 'blur'},
            {min: 6, message: $t('login.msg_min_password',{min:6}), trigger: 'blur'}]">
              <el-input v-model="form.password" :type="passwordType" autocomplete="off" @keyup.native="checkCapslock"
                @blur="capsTooltip=false" />
              <el-tooltip class="show-pwd" effect="dark" :content="$t('login.show_password')" placement="top-start">
                <!-- <span class="show-pwd" @click="showPwd"> -->
                <svg-icon :icon-class="passwordType==='password'?'eye':'eye-open'"
                  @click="passwordType=(passwordType==='password'?'text':'password')" />
                <!-- </span> -->
              </el-tooltip>
            </el-form-item>
          </el-tooltip>
          <el-form-item prop="displayName" :label="$t('users.full_name')"
            :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
            <el-input v-model="form.displayName" v-trim type="text" autocomplete="off" />
          </el-form-item>
          <!-- <el-form-item prop="fname" :label="$t('users.first_name')"
            :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
            <el-input v-model="form.fname" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="lname" :label="$t('users.last_name')"
            :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
            <el-input v-model="form.lname" type="text" />
          </el-form-item> -->
          <el-form-item prop="phoneNumber" :label="$t('users.phone_number')"
            :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
            <el-input v-model="form.phoneNumber" type="text" autocomplete="off">
              <el-select slot="prepend" v-model="form.phoneRegion" :placeholder="$t('users.phone_region')"
                style="width:100px">
                <el-option v-for="(rg,index) in region" :key="index" :label="`+${rg.phone} - ${rg.name}`"
                  :value="rg.phone" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('users.note')">
            <el-input v-model="form.note" v-trim type="textarea" />
          </el-form-item>
          <el-form-item :label="$t('users.avatar')">
            <el-input v-model="form.photoURL" v-trim :placeholder="$t('users.avatar')">
              <el-button slot="append" icon="el-icon-more-outline"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('users.avatar')">
            <img :src="form.photoURL" />
          </el-form-item>
          <el-form-item>
            <el-switch v-model="form.emailVerified" :active-text="$t('users.email_verified')" disabled>
            </el-switch>
            <el-switch v-model="form.disabled" active-color="#ff4949" :active-text="$t('users.disabled')">
            </el-switch>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('roles.title')" name="two">
        <el-tree ref="tree" :check-strictly="checkStrictly" :data="roles" :props="defaultProps" show-checkbox
          node-key="key" class="permission-tree" />
      </el-tab-pane>
      <el-tab-pane v-if="item" :label="$t('tabs.updated')" name="three" class="details">
        <el-table v-if="loading" v-loading="loading" empty-text=" " />
        <time-line-log v-else :items.sync="form.log" />
      </el-tab-pane>
    </el-tabs>
    <div class="row-flex">
      <div class="spacer" />
      <el-button-group>
        <el-tooltip v-if="item" effect="dark" :content="$t('global.update')" placement="bottom">
          <el-button type="primary" :loading="loading_add" :disabled="loading_drafts" @click="onSubmit('update')">
            <svg-icon icon-class="edit-saved" />
          </el-button>
        </el-tooltip>
        <el-tooltip v-else effect="dark" :content="$t('global.add')" placement="bottom">
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
import * as api from '@/api/firebase/users'
import * as roles from '@/api/firebase/roles'
import region from '@/lang/region'
import { update } from '@/utils'
import TimelineLog from '@/components/TimelineLog'
export default {
  components: { 'time-line-log': TimelineLog },
  props: {
    dialog: { type: Boolean, default: true },
    item: { type: Object, default: () => { } },
    items: { type: Array, default: () => [] }
  },
  data() {
    return {
      loading: false,
      loading_add: false,
      loading_drafts: false,
      tabs: 'one',
      form: {},
      roles: [],
      passwordType: 'password',
      capsTooltip: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkStrictly: false,
      default: {
        email: '',
        password: '',
        fname: '',
        lname: '',
        displayName: '',
        note: '',
        phone: '',
        phoneRegion: '84',
        phoneNumber: '',
        photoURL: '',
        emailVerified: false,
        disabled: false
      },
      region: region
    }
  },
  watch: {
    dialog: {
      handler(val) {
        this.reset()
        if (this.item) {
          this.form = { ...this.item }
          if (this.form.phoneNumber) this.form.phoneNumber = this.form.phoneNumber.replace(this.form.phoneRegion, '')
          this.loading = true
          api.getLog(this.item.uid)
            .then((x) => {
              if (x) this.form.log = x
              else {
                this.$message.error(this.$t('error.not_exist'))
                this.$emit('update:dialog', false)
              }
            })
            .finally(() => { this.loading = false })
        }
        // this.checkStrictly = true
        if (this.form.roles && this.form.roles.length > 0) {
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.form.roles)
            // set checked state of a node not affects its father and child nodes
            // this.checkStrictly = false
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // this.form = { ...this.default }
    // console.log(this.routes)
    this.getRoles()
  },
  methods: {
    getRoles() {
      roles.getAll()
        .then((x) => { this.roles = x })
        .catch((err) => { this.$message.error(this.$t(err.message)) })
    },
    onSubmit(action) {
      // const checkedKeys = this.$refs.tree.getCheckedKeys()
      // const _routes = this.generateTree(routes, '/', checkedKeys)
      this.form.roles = this.$refs.tree.getCheckedKeys()
      if (this.item) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading_add = true
            api.edit({ id: this.item.uid, data: this.form }).then((x) => {
              if (x) this.form.log.unshift(x)
              update({ data: this.items, element: this.form, key: 'uid' })
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
            if (action === 'add') this.loading_add = true
            else this.loading_drafts = true
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
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    reset() {
      this.form = { ...this.default }
      if (!this.dialog) this.$emit('update:item', null)
      if (this.$refs.form) this.$refs.form.resetFields()
      // this.loading_add = false
      // this.loading_drafts = false
    }
  }
}
</script>

<style lang="scss" scoped>
.show-pwd {
  position: absolute;
  right: 10px;
  top: 11px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>
