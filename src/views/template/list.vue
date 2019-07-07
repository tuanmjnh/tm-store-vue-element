<template>
  <div class="app-container">
    <!-- Filter Dialog -->
    <el-dialog :title="$t('global.filter')" :visible.sync="dialog_filter" width="30%">
      <span>
        <div class="row-flex">
          <el-date-picker v-model="params.start_at" type="date" format="dd-MM-yyyy"
            :default-value="new Date(2019,10,10)" :placeholder="$t('global.start_date')">
          </el-date-picker>
          <div class="spacer"></div>
          <el-date-picker v-model="params.end_at" type="date" :placeholder="$t('global.end_date')">
          </el-date-picker>
        </div>
        <div class="row">
          <el-input v-model="params.search" :placeholder="$t('global.search')" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onDialogFilter">{{ $t('global.accept') }}</el-button>
        <!-- <el-button @click="dialog_filter=false">{{ $t('global.cancel') }}</el-button> -->
      </span>
    </el-dialog>
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
        <el-button type="primary" icon="el-icon-plus" @click="$router.push('/template/add')" />
      </el-tooltip>
      <!-- </el-button-group> -->
    </div>
    <hr class="hr">
    <!-- <loading-content v-if="loading"></loading-content> -->
    <el-table ref="table" v-loading="loading" :data="items">
      <el-table-column type="selection" width="55" @selection-change="onSelection">
      </el-table-column>
      <el-table-column prop="name" label="Name" width="140">
      </el-table-column>
      <el-table-column prop="region" label="Region" width="120">
      </el-table-column>
      <el-table-column prop="resource" label="Resource">
      </el-table-column>
      <el-table-column :label="$t('global.start_date')">
        <template slot-scope="scope">
          {{ scope.row.start_date ? scope.row.start_date.toDate().toLocaleDateString() : '' }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('global.end_date')">
        <template slot-scope="scope">
          {{ scope.row.end_date ? scope.row.end_date.toDate().toLocaleTimeString() : '' }}
        </template>
      </el-table-column>
      <el-table-column label="Created At">
        <template slot-scope="scope">
          {{ scope.row.created_at.toDate().toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="#" width="180" align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="params.search" :d-val="scope" :placeholder="$t('global.search')" @change="getItems()" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="$router.push(`/template/add/${scope.row.id}`)">{{ $t('global.edit') }}
          </el-button>
          <el-button size="mini" type="danger" @click="onDelete(scope.$index, scope.row)">{{ $t('global.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import LoadingContent from '@/components/LoadingContent'
import * as api from '@/api/firebase/template'
import { remove } from '@/utils'
export default {
  // components: { LoadingContent },
  data() {
    return {
      loading: false,
      items: [],
      selected: [],
      dialog_filter: false,
      params: {
        start_date: this.$moment().format('DD-MM-YYYY'),
        end_date: this.$moment().format('DD-MM-YYYY'),
        search: '',
        flag: 1
      }
    }
  },
  created() {
    this.getItems()
  },
  methods: {
    getItems() {
      this.loading = true
      api.get(this.params).then((x) => {
        this.items = x
      }).catch((err) => {
        this.$message({
          type: 'error',
          showClose: true,
          message: this.$t(err.message)
        })
      }).finally(() => {
        this.loading = false
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
    onEdit(index, row, scope) {
      console.log(index, row, scope)
    },
    onDelete() {

    },
    onDialogFilter() {
      this.getItems()
      this.dialog_filter = false
      console.log(this.items)
    }
  }
}
</script>

<style>
</style>
