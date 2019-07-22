<template>
  <el-form>
    <!-- <hr class="hr"> -->
    <el-tabs v-model="tabs">
      <el-tab-pane :label="$t('tabs.main')" name="one">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item prop="key" :label="$t('roles.key')" :rules="[
            {required: true, message: $t('error.required'), trigger: 'blur'},
            {min:4, message: $t('error.min_length',{min:4}), trigger: 'blur'}]">
            <el-input v-model.trim="form.key" type="text" @blur="()=>{if(form.key)form.key=form.key.toLowerCase()}">
            </el-input>
          </el-form-item>
          <el-form-item prop="name" :label="$t('roles.name')"
            :rules="[{required: true, message: $t('error.required'), trigger: 'blur'}]">
            <el-input v-model.trim="form.name" type="text"></el-input>
          </el-form-item>
          <el-form-item :label="$t('global.desc')">
            <el-input v-model.trim="form.desc" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('roles.menus')" name="two">
        <el-tree ref="tree" :check-strictly="checkStrictly" :data="routes" :props="defaultProps" show-checkbox
          node-key="path" class="permission-tree" />
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
import path from 'path'
import i18n from '@/lang'
import TimelineLog from '@/components/TimelineLog'
import * as api from '@/api/firebase/roles'
import { update, deepClone } from '@/utils'
import { constantRoutes, asyncRoutes } from '@/router'
const routes = deepClone([...constantRoutes, ...asyncRoutes])
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
      routes: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      checkStrictly: false,
      default: {
        key: '',
        name: '',
        desc: '',
        routes: []
      }
    }
  },
  watch: {
    dialog: {
      handler(val) {
        this.reset()
        if (this.item) {
          this.form = { ...this.item }
          this.loading = true
          api.getLog(this.item.id)
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
        this.$nextTick(() => {
          // const routes = this.generateRoutes(this.form.routes)
          // this.$refs.tree.setCheckedNodes(this.generateArr(routes))
          // console.log(this.form.routes)
          this.$refs.tree.setCheckedKeys(this.form.routes)
          // set checked state of a node not affects its father and child nodes
          this.checkStrictly = false
        })
        // if (!val) this.reset()
        // console.log(val, this.form)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // this.form = { ...this.default }
    // console.log(this.routes)
    this.getRoutes()
  },
  methods: {
    // Generate Routes
    async getRoutes() {
      const _routes = this.generateRoutes(routes)
      this.routes = this.i18n(_routes)
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    onSubmit(action) {
      // const checkedKeys = this.$refs.tree.getCheckedKeys()
      // const _routes = this.generateTree(routes, '/', checkedKeys)
      this.form.routes = this.$refs.tree.getCheckedKeys()
      if (this.item) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading_add = true
            api.edit({ id: this.item.id, data: this.form }).then((x) => {
              if (x) this.form.log.unshift(x)
              update({ data: this.items, element: this.form, key: 'id' })
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
      if (!this.dialog) this.$emit('update:item', null)
      if (this.$refs.form) this.$refs.form.resetFields()
      // this.loading_add = false
      // this.loading_drafts = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-left: 30px;
  }
}
</style>
