<template>
  <div class="app-container">
    <div class="row-flex">
      <label class="title">{{ $t('global.add') }}</label>
      <div class="spacer" />
      <el-button-group>
        <el-tooltip effect="dark" :content="$t('global.add')" placement="bottom">
          <el-button type="primary" @click="onSubmit">
            <svg-icon icon-class="edit-saved" />
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('global.drafts')" placement="bottom">
          <el-button type="warning" @click="onDrafts">
            <svg-icon icon-class="drafts" />
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('global.back')" placement="bottom">
          <el-button @click="onBack">
            <svg-icon icon-class="back" />
          </el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <hr class="hr">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item prop="name" label="Activity name" required :rules="[
      {required: true, message: $t('login.msg_required_username'), trigger: 'change'},
      {min:4, message: $t('login.msg_min_username',{min:4}), trigger: 'change'}]">
        <el-input ref="name" v-model="form.name" name="name" type="text"></el-input>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;">
          </el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"></el-checkbox>
          <el-checkbox label="Promotion activities" name="type"></el-checkbox>
          <el-checkbox label="Offline activities" name="type"></el-checkbox>
          <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor"></el-radio>
          <el-radio label="Venue"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('invalid!')
        }
      })
    },
    onDrafts() {
      console.log('onDrafts!')
    },
    onBack() {
      console.log('onBack!')
    }
  }
}
</script>

<style>
</style>
