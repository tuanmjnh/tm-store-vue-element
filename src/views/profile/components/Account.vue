<template>
  <el-form ref="form" :model="user">
    {{ user.id }}
    <el-form-item prop="email" label="Email"
      :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
      <el-input v-model="user.email" v-trim autocomplete="off" />
    </el-form-item>
    <el-form-item prop="name" :label="$t('users.full_name')"
      :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
      <el-input v-model="user.name" v-trim autocomplete="off" />
    </el-form-item>
    <el-form-item prop="phone" :label="$t('users.phone_number')"
      :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
      <el-input v-model="user.phone" type="text" autocomplete="off">
        <el-select slot="prepend" v-model="user.phoneRegion" :placeholder="$t('users.phone_region')"
          style="width:100px">
          <el-option v-for="(rg,index) in region" :key="index" :label="`+${rg.phone} - ${rg.name}`" :value="rg.phone" />
        </el-select>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('users.note')">
      <el-input v-model="user.introduction" v-trim type="textarea" />
    </el-form-item>
    <el-form-item :label="$t('users.avatar')">
      <el-input v-model="user.avatar" v-trim :placeholder="$t('users.avatar')">
        <el-button slot="append" icon="el-icon-more-outline"></el-button>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('users.avatar')">
      <img :src="user.avatar" />
    </el-form-item>
    <el-form-item>
      <el-switch v-model="user.verified" :active-text="$t('users.email_verified')" disabled>
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
          id: '',
          name: '',
          email: '',
          avatar: '',
          phone: '',
          phoneRegion: '84',
          introduction: '',
          verified: false
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
          api.edit({ id: this.user.id, data: this.user }).then((x) => {
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
