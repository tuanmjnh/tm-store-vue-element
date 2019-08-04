<template>
  <el-form ref="form" :model="user">
    {{ user.id }}
    <el-form-item prop="email" label="Email"
      :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
      <el-input v-model="user.email" v-trim autocomplete="off" />
    </el-form-item>
    <el-form-item prop="displayName" :label="$t('users.full_name')"
      :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
      <el-input v-model="user.displayName" v-trim autocomplete="off" />
    </el-form-item>
    <el-form-item prop="phoneNumber" :label="$t('users.phone_number')"
      :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
      <el-input v-model="user.phoneNumber" type="text" autocomplete="off">
        <el-select slot="prepend" v-model="user.phoneRegion" :placeholder="$t('users.phone_region')"
          style="width:100px">
          <el-option v-for="(rg,index) in region" :key="index" :label="`+${rg.phone} - ${rg.name}`" :value="rg.phone" />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('users.note')">
      <el-input v-model="user.note" v-trim type="textarea" />
    </el-form-item>
    <el-form-item :label="$t('users.avatar')">
      <el-input v-model="user.photoURL" v-trim :placeholder="$t('users.avatar')">
        <el-button slot="append" icon="el-icon-more-outline"></el-button>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('users.avatar')">
      <img :src="user.photoURL" />
    </el-form-item>
    <el-form-item>
      <el-switch v-model="user.emailVerified" :active-text="$t('users.email_verified')" disabled>
      </el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" :disabled="loading" @click="submit">{{ $t('global.update') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import * as api from '@/api/firebase/users'
import region from '@/lang/region'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          uid: '',
          displayName: '',
          email: '',
          photoURL: '',
          phoneNumber: '',
          phoneRegion: '84',
          introduction: '',
          verified: false,
          roles: ['guest']
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      region: region
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          api.edit({ id: this.user.uid, data: this.user }).then((x) => {
            // update({ data: this.items, element: this.form, key: 'uid' })
            this.$message.success(this.$t('success.update'))
          }).catch((err) => {
            this.$message.error(this.$t(err.message))
          }).finally(() => {
            this.loading = false
          })
          // this.$message({
          //   message: 'User information has been updated successfully',
          //   type: 'success',
          //   duration: 5 * 1000
          // })
        }
      })
    }
  }
}
</script>
