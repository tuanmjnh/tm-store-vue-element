<template>
  <loading-content v-if="loading"></loading-content>
  <el-form v-else class="app-container">
    <div class="row-flex">
      <label class="title">{{ $route.params.id ? $t('global.details') : $t('global.add') }}</label>
      <div class="spacer" />
      <el-button-group>
        <el-tooltip v-if="$route.params.id" effect="dark" :content="$t('global.update')" placement="bottom">
          <el-button type="primary" :loading="loading_add" :disabled="loading_drafts" @click="onSubmit('update')">
            <svg-icon icon-class="edit-saved" />
          </el-button>
        </el-tooltip>
        <el-tooltip v-else effect="dark" :content="$t('global.add')" placement="bottom">
          <el-button type="primary" :loading="loading_add" :disabled="loading_drafts" @click="onSubmit('add')">
            <svg-icon icon-class="add" />
          </el-button>
        </el-tooltip>
        <el-tooltip v-if="!$route.params.id" effect="dark" :content="$t('global.drafts')" placement="bottom">
          <el-button type="warning" :loading="loading_drafts" :disabled="loading_add" @click="onSubmit('drafts')">
            <svg-icon icon-class="drafts" />
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('global.back')" placement="bottom">
          <el-button :disabled="loading_add||loading_drafts" @click="$router.push('/template/list')">
            <svg-icon icon-class="back" />
          </el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <!-- <hr class="hr"> -->
    <el-tabs v-model="tabs">
      <el-tab-pane :label="$t('tabs.main')" name="primary">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item prop="name" label="Activity name" :rules="[
      {required: true, message: $t('login.msg_required_username'), trigger: 'change'},
      {min:4, message: $t('login.msg_min_username',{min:4}), trigger: 'change'}]">
            <el-input v-model="form.name" type="text"></el-input>
          </el-form-item>
          <el-form-item prop="region" label="Activity zone"
            :rules="[{required: true, message: $t('login.msg_required_username'), trigger: 'change'}]">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Activity time" required>
            <div class="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-11 el-col-lg-8 el-col-xl-8">
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"> -->
              <el-form-item prop="start_date"
                :rules="[{required: true, message: $t('login.msg_required_username'), trigger: 'change'}]">
                <el-date-picker v-model="form.start_date" type="date" placeholder="Pick a date" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
              <!-- </el-col> -->
            </div>
            <div class="el-col el-col-24 el-col-xs-24 el-col-sm-24 el-col-md-11 el-col-lg-8 el-col-xl-8">
              <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8"> -->
              <el-form-item prop="end_date"
                :rules="[{required: true, message: $t('login.msg_required_username'), trigger: 'change'}]">
                <el-time-picker v-model="form.end_date" placeholder="Pick a time" style="width: 100%;">
                </el-time-picker>
              </el-form-item>
              <!-- </el-col> -->
            </div>
          </el-form-item>
          <el-form-item label="Instant delivery">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item prop="type" label="Activity type"
            :rules="[{required: true, message: $t('login.msg_required_username'), trigger: 'change'}]">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="Online activities" name="type"></el-checkbox>
              <el-checkbox label="Promotion activities" name="type"></el-checkbox>
              <el-checkbox label="Offline activities" name="type"></el-checkbox>
              <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item prop="resource" label="Resources"
            :rules="[{required: true, message: $t('login.msg_required_username'), trigger: 'change'}]">
            <el-radio-group v-model="form.resource">
              <el-radio label="Sponsor"></el-radio>
              <el-radio label="Venue"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input v-model="form.desc" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane v-if="$route.params.id" :label="$t('tabs.updated')" name="secondary" class="details">
        <el-timeline :reverse="true">
          <el-timeline-item v-for="(item, index) in form.log" :key="index" :icon="item.icon" :type="item.type"
            :color="item.color" :size="item.size"
            :timestamp="item.at?$moment(item.at.toDate()).format('DD/MM/YYYY hh:mm'):$t('global.updating')">
            {{ $t(`global.${item.action}`) }}: {{ item.by }}
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
      <!-- <el-tab-pane :label="$t('tabs.updated')" name="secondary" class="details">
        <div class="el-col el-col-6 el-col-xs-12 el-col-sm-12">
          <label>{{ $t('global.created_by') }}: </label>
          <span>{{ form.created_by ? form.created_by : $t('global.updating') }}</span>
        </div>
        <div class="el-col el-col-6 el-col-xs-12 el-col-sm-12">
          <label>{{ $t('global.created_at') }}: </label>
          <span>{{ form.created_at ? $moment(form.created_at.toDate()).format('DD/MM/YYYY hh:mm') : $t('global.updating') }}</span>
        </div>
        <div class="el-col el-col-6 el-col-xs-12 el-col-sm-12">
          <label>{{ $t('global.updated_by') }}: </label>
          <span>{{ form.updated_by ? form.updated_by : $t('global.updating') }}</span>
        </div>
        <div class="el-col el-col-6 el-col-xs-12 el-col-sm-12">
          <label>{{ $t('global.updated_at') }}: </label>
          <span>{{ form.updated_at ? form.updated_at : $t('global.updating') }}</span>
        </div>
        <div class="el-col el-col-6 el-col-xs-12 el-col-sm-12">
          <label>{{ $t('global.deleted_by') }}: </label>
          <span>{{ form.deleted_by ? form.deleted_by : $t('global.updating') }}</span>
        </div>
        <div class="el-col el-col-6 el-col-xs-12 el-col-sm-12">
          <label>{{ $t('global.deleted_at') }}: </label>
          <span>{{ form.deleted_at ? form.deleted_at : $t('global.updating') }}</span>
        </div>
      </el-tab-pane> -->
    </el-tabs>
  </el-form>
</template>

<script>
import LoadingContent from '@/components/LoadingContent'
import * as api from '@/api/firebase/template'
export default {
  components: { LoadingContent },
  data() {
    return {
      loading: false,
      loading_add: false,
      loading_drafts: false,
      tabs: 'primary',
      form: {},
      default: {
        name: '',
        region: '',
        start_date: '',
        end_date: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        flag: 1
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.loading = true
      api.find(this.$route.params.id).then((x) => {
        this.form = x
        // console.log(x)
        // this.item_log = [
        //   {
        //     content: `${this.$t('global.created_by')}: ${x.created_by}`,
        //     timestamp: x.created_at ? this.$moment(x.created_at.toDate()).format('DD/MM/YYYY hh:mm') : '',
        //     size: 'large',
        //     type: 'primary',
        //     icon: 'el-icon-plus',
        //     color: '#1890FF'
        //   },
        //   {
        //     content: x.updated_by ? `${this.$t('global.updated_by')}: ${x.updated_by}` : this.$t('global.updating'),
        //     timestamp: x.updated_at ? this.$moment(x.updated_at.toDate()).format('DD/MM/YYYY hh:mm') : '',
        //     color: '#0bbd87'
        //   }
        // ]
      }).catch((err) => {
        this.$message.error(this.$t(err.message))
      }).finally(() => {
        this.loading = false
      })
    } else {
      this.form = { ...this.default }
    }
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
              this.form.flag = 1
            } else {
              this.loading_drafts = true
              this.form.flag = 0
            }
            api.add({ data: this.form }).then((x) => {
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
      this.$refs.form.resetFields()
      // this.loading_add = false
      // this.loading_drafts = false
    }
  }
}
</script>

<style>
</style>
