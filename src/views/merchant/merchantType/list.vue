<template>
  <div class="merchantType">
    <div class="header clearfix">
      <div class="headerLeft"><el-button>新增</el-button></div>
      <div class="headerRight">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="等级名称">
            <el-input v-model="formInline.rank"></el-input>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="onSeach">搜索</el-button>
        </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="mTable">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            prop="rankName"
            label="等级名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mount"
            label="允许发布商品数量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="template"
            label="可选模板"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="fee"
            label="收费标准"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="attachSpace"
            label="附件空间"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="checked"
            label="需要审核"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            show-overflow-tooltip>
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top: 20px" class="footer clearfix">
        <div class="mountDel">
          <el-button @click="toggleSelection()">批量删除</el-button>
        </div>
        <div class="page">
          <el-pagination
            style="display: inline-block"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            current-page.sync="pageId"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formInline: {
          rank: ''
        },
        tableData3: [{
          rankName:'黄钻级',
          mount:7,
          template:'10套',
          fee:'300元',
          attachSpace:'0.0 M',
          checked:'是'
        },
          {
            rankName:'蓝钻级',
            mount:1024,
            template:'10套',
            fee:'300元',
            attachSpace:'23.0 M',
            checked:'是'
          },
          {
            rankName:'默认等级',
            mount:8965,
            template:'10套',
            fee:'300元',
            attachSpace:'98.0 M',
            checked:'是'
          },
        ],
        multipleSelection: [],
        total: 1000,
        pageSize: 100,
      }
    },
    methods: {
      onSeach() {
        console.log('submit!');
      },
      toggleSelection(rows) {  //全选
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) { //全选
        this.multipleSelection = val;
      },
      handleSizeChange(val) {       //条数改变
//          this.pageSize=val;
      },
      handleCurrentChange(val) {    //页数改变
//          this.pageId = val
      },
    }
  }
</script>
<style scoped>
  .merchantType {
    margin: 50px 100px;
    box-sizing: border-box;
    color: #333;
    width: 1440px;
  }
  .header {
    margin-bottom: 30px;
  }
  .headerLeft{
    float: left;
  }
  .headerLeft button {
    width: 90px;
  }
  .headerRight{
    float: right;
  }
  .mTable{
    max-height: 600px;
  }
  .footer > div {
    float: left;
  }
  .footer > div.page {
    margin-top: 4px;
  }
</style>
