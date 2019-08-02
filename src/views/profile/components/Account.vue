<template>
  <el-form>
    {{ user.displayName }}
    <el-form-item prop="displayName" :label="$t('users.full_name')"
      :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
      <el-input v-model="user.displayName" v-trim type="text" autocomplete="off" @change="(v)=>user.displayName=v.trim()" />
      <!-- <el-input v-model.trim="user.name" /> -->
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{ $t('global.update') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      test: 'tm'
    }
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
