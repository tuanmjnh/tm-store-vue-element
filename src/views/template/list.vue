<template>
  <div class="app-container">
    <div class="row-flex">
      <label class="title">{{ $t('global.list') }}</label>
      <div class="spacer" />
      <!-- <el-button-group> -->
      <el-tooltip effect="dark" :content="$t('global.filter')" placement="bottom">
        <el-button @click="dialog_filter=true">
          <svg-icon icon-class="filter" />
        </el-button>
      </el-tooltip>
      <el-tooltip v-if="$refs.table&&$refs.table.selection.length>0" effect="dark" :content="$t('global.delete')"
        placement="bottom">
        <el-button type="danger" icon="el-icon-delete" @click="onTrash()" />
      </el-tooltip>
      <el-tooltip effect="dark" :content="$t('global.add')" placement="bottom">
        <el-button type="primary" icon="el-icon-plus" @click="$router.push('add')" />
      </el-tooltip>
      <!-- </el-button-group> -->
    </div>
    <hr class="hr">
    <el-table ref="table" :data="items">
      <el-table-column type="selection" width="55" @selection-change="onSelection">
      </el-table-column>
      <el-table-column prop="name" label="Name" width="140">
      </el-table-column>
      <el-table-column prop="region" label="Region" width="120">
      </el-table-column>
      <el-table-column prop="resource" label="Resource">
      </el-table-column>
      <el-table-column prop="date1" label="Datetime">
      </el-table-column>
    </el-table>
    <el-dialog title="Tips" :visible.sync="dialog_filter" width="30%" :before-close="onDialogClose">
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_filter=false">Cancel</el-button>
        <el-button type="primary" @click="dialog_filter=false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/firebase/template'
import { remove } from '@/utils'
export default {
  data() {
    return {
      items: [],
      selected: [],
      dialog_filter: false,
      params: {
        flag: 1
      }
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    getItems() {
      api.get(this.params).then((rs) => {
        this.items = rs
      })
    },
    onSelection(val) {
      this.selected = val
    },
    onTrash(val) {
      api.trash(this.$refs.table.selection).then((rs) => {
        remove({ data: this.items, element: rs, key: 'id' })
      })
    },
    onDialogClose() {
      this.getItems()
    }
  }
}
</script>

<style>
</style>
