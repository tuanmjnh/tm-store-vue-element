<template>
  <div class="app-container">
    <!-- Filter Dialog -->
    <el-dialog :title="$t('global.filter')" :visible.sync="dialogFilter" width="30%">
      <span>
        <div class="row-flex">
          <el-date-picker v-model="params.start_date" type="date" format="dd-MM-yyyy"
            :placeholder="$t('global.start_date')">
          </el-date-picker>
          <div class="spacer"></div>
          <el-date-picker v-model="params.end_date" type="date" format="dd-MM-yyyy"
            :placeholder="$t('global.end_date')">
          </el-date-picker>
        </div>
        <div class="row">
          <el-input v-model="params.search" :placeholder="$t('global.search')" class="input-with-select">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onDialogFilter">{{ $t('global.accept') }}</el-button>
        <!-- <el-button @click="dialog_filter=false">{{ $t('global.cancel') }}</el-button> -->
      </span>
    </el-dialog>
    <!-- Confirm Dialog -->
    <el-dialog :title="$t('message_box.warning')" width="30%" :visible.sync="dialogConfirmTrash"
      :close-on-click-modal="false" @closed="onConfirmTrashClose">
      <span>
        <div v-if="confirmType==='recover'" class="row">{{ $t('message_box.recover') }}</div>
        <div v-else-if="confirmType==='delete'" class="row">{{ $t('message_box.delete') }}</div>
        <div v-else class="row">{{ $t('message_box.trash') }}</div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onConfirmTrashOk">{{ $t('global.accept') }}</el-button>
        <el-button @click="dialogConfirmTrash=false">{{ $t('global.cancel') }}</el-button>
      </span>
    </el-dialog>
    <!-- dialog add -->
    <el-dialog :title="item?$t('global.edit'):$t('global.add')" class="dialog-xs-24"
      :visible.sync="dialogAdd" :close-on-click-modal="false">
      <template-add :dialog.sync="dialogAdd" :item.sync="item" :items.sync="items" />
    </el-dialog>
    <!-- header -->
    <div class="row-flex">
      <label class="title">{{ $t('roles.list') }}</label>
      <div class="spacer" />
      <!-- <el-button-group> -->
      <el-tooltip effect="dark" :content="$t('global.filter')" placement="bottom">
        <el-button @click="dialogFilter=true">
          <svg-icon icon-class="filter" />
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="$refs.table&&$refs.table.selection.length>0&&$route.meta.flag===1" effect="dark"
        :content="$t('global.delete')" placement="bottom">
        <el-button type="danger" icon="el-icon-delete" @click="onConfirm('trash')" />
      </el-tooltip>
      <el-tooltip v-if="$refs.table&&$refs.table.selection.length>0&&$route.meta.flag===0" effect="dark"
        :content="$t('global.recover')" placement="bottom">
        <el-button type="success" icon="el-icon-refresh" @click="onConfirm('recover')" />
      </el-tooltip>
      <el-tooltip v-if="$refs.table&&$refs.table.selection.length>0&&$route.meta.flag===0" effect="dark"
        :content="$t('global.deleted_forever')" placement="bottom">
        <el-button type="danger" icon="el-icon-remove" @click="onConfirm('delete')" />
      </el-tooltip>
      <el-tooltip effect="dark" :content="$t('global.add')" placement="bottom">
        <el-button type="primary" icon="el-icon-plus" @click.native="dialogAdd=true" />
      </el-tooltip>
      <!-- </el-button-group> -->
    </div>
    <hr class="hr">
    <!-- <loading-content v-if="loading"></loading-content> -->
    <el-table ref="table" v-loading="loading" :data="items">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="key" :label="$t('roles.key')">
      </el-table-column>
      <el-table-column prop="name" :label="$t('roles.name')">
      </el-table-column>
      <el-table-column prop="desc" :label="$t('global.desc')">
      </el-table-column>
      <el-table-column label="#" width="180" align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="params.search" :d-val="scope" :placeholder="$t('global.search')" @change="getItems()" />
        </template>
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="$t('global.edit')" placement="bottom">
            <el-button type="warning" size="mini" icon="el-icon-edit-outline" @click.native="onEdit(scope.row)" />
          </el-tooltip>
          <el-tooltip effect="dark" :content="$t('global.delete')" placement="bottom">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="onTrash('trash', scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <p>
      <el-pagination :page-size.sync="params.pageSize" :pager-count="params.pagerCount"
        layout="sizes, prev, pager, next" :page-sizes="params.pageSizes" :total="params.totalItems" align="right"
        :current-page.sync="params.currentPage" @current-change="onPaginationChange"
        @size-change="onSizePaginationChange">
      </el-pagination>
    </p>
  </div>
</template>

<script>
import add from './add'
import * as api from '@/api/firebase/roles'
import { remove } from '@/utils'
export default {
  components: { 'template-add': add },
  data() {
    return {
      loading: false,
      items: [],
      item: null,
      dialogFilter: false,
      dialogConfirmTrash: false,
      dialogAdd: false,
      confirmType: '',
      params: {
        search: '',
        currentPage: 1,
        pageSize: 10,
        pagerCount: 9,
        totalItems: 0,
        pageSizes: [10, 20, 50, 100]
      }
    }
  },
  created() {
    this.getItems()
    // console.log(this.$route.meta.flag)
  },
  methods: {
    getItems() {
      this.loading = true
      api.getPagination(this.params).then((x) => {
        this.items = x
      }).catch((err) => {
        this.$message.error(this.$t(err.message))
      }).finally(() => {
        this.loading = false
      })
    },
    onPaginationChange(val) {
      this.getItems()
    },
    onSizePaginationChange(val) {
      this.getItems()
    },
    // onSelection(val) {
    //   this.selected = val
    // },
    onTrash(type, val) {
      this.$refs.table.clearSelection()
      this.$refs.table.selection.push(val)
      this.confirmType = type
      this.dialogConfirmTrash = true
    },
    onConfirm(type) {
      this.dialogConfirmTrash = true
      this.confirmType = type
    },
    onConfirmTrashOk(val) {
      this.loading = true
      this.dialogConfirmTrash = false
      this.loading = false
      // if (this.confirmType === 'delete') {
      //   api.remove(this.$refs.table.selection).then((rs) => {
      //     remove({ data: this.items, element: rs, key: 'id' })
      //     this.$message.success(this.$t('success.delete'))
      //   }).catch((err) => {
      //     this.$message.error(this.$t(err.message))
      //   }).finally(() => {
      //     this.loading = false
      //   })
      // } else {
      //   api.trash(this.$refs.table.selection).then((rs) => {
      //     remove({ data: this.items, element: rs, key: 'id' })
      //     if (this.confirmType === 'recover') this.$message.success(this.$t('success.recover'))
      //     else this.$message.success(this.$t('success.trash'))
      //   }).catch((err) => {
      //     this.$message.error(this.$t(err.message))
      //   }).finally(() => {
      //     this.loading = false
      //   })
      // }
    },
    onConfirmTrashClose() {
      this.$refs.table.clearSelection()
    },
    onDialogFilter() {
      this.dialogFilter = false
      this.getItems()
    },
    onEdit(row) {
      this.dialogAdd = true
      this.item = row
    }
  }
}
</script>

<style>
</style>
