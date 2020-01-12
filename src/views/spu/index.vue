<template>
  <div class="app-container">

    <span>一级分类</span>
    <el-select v-model="catalog1" @change="changeSelect1" placeholder="请选择">
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.lable"
        :value="item.value">
      </el-option>
    </el-select>
    <span>二级分类</span>
    <el-select v-model="catalog2" @change="changeSelect2" placeholder="请选择">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.lable"
        :value="item.value">
      </el-option>
    </el-select>
    <span>三级分类</span>
    <el-select v-model="catalog3" @change="changeSelect" placeholder="请选择">
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.lable"
        :value="item.value">
      </el-option>
    </el-select>


    <el-button @click="addRecord">添加记录</el-button>
    <el-button @click="fetchTableData">刷新数据</el-button>
    <el-table style="width: 100%" border :data="tableData">
      <template v-for="(item,index) in tableHead">
        <el-table-column :prop="item" :label="item" :key="index"
        >
          <template slot-scope="scope">
                            <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="scope.row[item]">
                                </el-input>
                            </span>
            <span v-else>{{scope.row[item]}}</span>
          </template>

        </el-table-column>

        <!--        <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index"-->
        <!--                         v-if="item.column_name != 'id'"></el-table-column>-->
      </template>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
                            <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;"
                                  @click="pwdChange(scope.row,scope.$index,true)">
                                {{scope.row.isSet?'保存':"修改"}}
                            </span>
          <span v-if="!scope.row.isSet" @click="deletData(scope.row)" class="el-tag el-tag--danger el-tag--mini"
                style="cursor: pointer;">
                                删除
                            </span>
          <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;"
                @click="pwdChange(scope.row,scope.$index,false)">
                                取消
                            </span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import {getSkuListBySpuId, addData, getTableData, updateData, getTables, deleteData} from '@/api/spu'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        options1: [],
        options2: [],
        options3: [],
        catalog1:[],
        catalog2:[],
        catalog3:[],
        tableData: [],
        tableHead: [],
        tableName: "spu_info",
        // tableName: null,
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchCatalog()
      this.fetchTableColumns()
      this.fetchTableData()
      let i = 0
    },
    methods: {
      fetchCatalog(){
        this.listLoading = true
        let that = this
        that.tableHead = []
        that.options1=[]
        that.options2=[]
        that.options3=[]
        getTableData({tableName: "base_catalog1"}).then(response => {
          console.log(response)
          response.data.forEach(i => {
            that.options1.push({lable: i['name'],value:i['id']})
          })
          console.log(that.tableData)
          this.listLoading = false
        })
      },
      changeSelect1() {
        this.listLoading = true
        let that = this
        that.options2=[]
        getTableData({tableName: "base_catalog2"}).then(response => {
          console.log(response)
          response.data.forEach(i => {
            that.options2.push({lable: i['name'],value:i['id']})
          })
          this.listLoading = false
        })
      },
      changeSelect2() {
        this.listLoading = true
        let that = this
        that.options3=[]
        getTableData({tableName: "base_catalog3"}).then(response => {
          console.log(response)
          response.data.forEach(i => {
            that.options3.push({lable: i['name'],value:i['id']})
          })
          this.listLoading = false
        })
      },
      changeSelect() {
        this.fetchTableColumns()
        this.fetchTableData()
      },

      addRecord() {
        if (this.tableData != null) {
          let row = this.tableData[0]
          let map = {}

          for (let item of this.tableHead) {
            map[item] = null
          }
          map.isSet = true
          map.add = true
          this.tableData.unshift(map)
        }
      },
      pwdChange(row, index, cg) {

        if (row.isSet == undefined) {
          row.isSet = true
          return
        }
        if (!cg) {
          row.isSet = !row.isSet
        }

        if (row.add != undefined) {
          this.addData(row)
        }
        //提交数据
        if (row.isSet) {
          this.updateData(row)
          row.isSet = false;
        } else {
          // app.master_user.sel = JSON.parse(JSON.stringify(row));
          row.isSet = true;
        }
      },
      addData(row) {
        this.listLoading = true
        let that = this
        addData({tableName: that.tableName, id: row.id, data: row}).then(response => {
          console.log(response)
          that.fetchTableData()
          this.listLoading = false
        })
      },
      deletData(row) {
        this.listLoading = true
        let that = this
        deleteData({tableName: that.tableName, id: row.id, data: row}).then(response => {
          console.log(response)
          that.fetchTableData()
          this.listLoading = false
        })
      },
      updateData(row) {
        this.listLoading = true
        let that = this
        updateData({tableName: that.tableName, data: JSON.stringify(row)}).then(response => {
          console.log(response)
          this.listLoading = false
        })
      },
      fetchTableNames() {
        this.listLoading = true
        let that = this
        that.tableHead = []
        getTables(null).then(response => {
          response.data.forEach(i => {
            that.options.push({lable: i['columnName'], value: i['columnName']})
          })
          console.log(that.tableHead)
          this.listLoading = false
        })
      },
      fetchTableColumns() {
        this.listLoading = true
        let that = this
        that.tableHead = []
        getTableInfo({tableName: this.tableName}).then(response => {
          // console.log(response)
          response.data.forEach(i => {
            // console.log(i)
            that.tableHead.push(i['columnName'])
          })

          this.listLoading = false
        })
      },
      fetchTableData() {
        this.listLoading = true
        let that = this
        that.tableData = []
        getTableData({tableName: that.tableName}).then(response => {
          console.log(response)
          response.data.forEach(i => {
            // console.log(i)
            i['isSet'] = false
            that.tableData.push(i)
          })
          console.log(that.tableData)
          this.listLoading = false
        })
      }
    }
  }
</script>
