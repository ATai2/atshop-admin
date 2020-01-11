<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <span>一级分类</span>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span>二级分类</span>
    <el-select v-model="value2" placeholder="请选择">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span>三级分类</span>
    <el-select v-model="value3" placeholder="请选择">
      <el-option
        v-for="item in options3"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getcatalogList} from '@/api/catalog'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        options: [],
        value: '',
        options2: [],
        value2: '',
        options3: [],
        value3: ''
      }
    },
    mounted() {
      getcatalogList().then(response => {
        console.log(response)
        let that = this
        this.options = []
        response.forEach(function (i, index) {
          that.options.push({
            value: '选项' + i['id'],
            label: i['name']
          })
        })

      })
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
