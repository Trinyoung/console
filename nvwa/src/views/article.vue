<template>
  <main
    class="my-1 shadow-sm bg-white border height-100 console_article_container"
  >
    <el-breadcrumb separator="/" style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form-container border-bottom">
      <el-form :inline="true" label-width="150px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="日期范围:">
              <el-date-picker
                v-model="searchInfo.dateRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签选择:">
              <el-select v-model="searchInfo.tag" placeholder="请选择活动区域">
                <el-option
                  v-for="item in tags"
                  :key="item.id"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分类选择:">
              <el-cascader
                v-model="searchInfo.type"
                :options="types"
                :props="{ checkStrictly: true }"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否公开:">
              <el-switch
                v-model="searchInfo.isPublic"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布状态:">
              <el-switch
                v-model="searchInfo.published"
                active-text="已发布"
                inactive-text="未发布"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关键字:">
              <el-input
                v-model="searchInfo.keyword"
                placeholder="请输入关键字"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="20" style="text-align: right">
            <el-form-item>
              <el-button type="success" plain>搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="my-0 p-3" id="main-content">
      <div
        class="btn-toolbar my-1 pb-1"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <el-button type="primary" @click="jumpTo('/console/editor/new')"
          >新 增</el-button
        >
      </div>
      <el-table>
        <el-table-column type="select"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="分类" prop="type">
          <template slot-scope="{ row }">
            {{ row.type.title }}
          </template>
        </el-table-column>
        <el-table-column label="作者" prop="author.username"></el-table-column>
        <el-table-column label="发布时间" prop="createdAt"></el-table-column>
        <el-table-column label="标签" prop="">
          <template slot-scope="{ row }">
            <el-tag v-for="tag in row.tags" :key="tag._id" class="tag">
              {{ tag.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否公开" prop="">
          <template slot-scope="{ row }">
            {{ row.isPublic ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="发布状态" prop="">
          <template slot-scope="{ row }">
            <el-tag>
              {{ row.published ? "已发布" : "未发布" }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- <table class="table table-bordered">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">标题</th>
            <th scope="col">分类</th>
            <th scope="col">作者</th>
            <th scope="col">发布时间</th>
            <th scope="col">标签</th>
            <th scope="col">是否公开</th>
            <th scope="col">发布状态</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.type && item.type.title }}</td>
            <td>{{ item.author.username }}</td>
            <td>{{ item.createdAt }}</td>
            <td>
              <el-tag v-for="tag in item.tags" :key="tag._id" class="tag">
                {{ tag.name }}
              </el-tag>
            </td>
            <td>
              <el-tag>
                {{ item.isPublic ? "是" : "否" }}
              </el-tag>
            </td>
            <td>
              <el-tag>
                {{ item.published ? "已发布" : "未发布" }}
              </el-tag>
            </td>
            <td class="handle-cell">
              <div class="btn-group" role="group" aria-label="Basic example">
                <el-button
                  type="success"
                  plain
                  @click="
                    jumpTo(`/person/${$route.params.uid}/articles/${item._id}`)
                  "
                  >详情</el-button
                >
                <el-button
                  type="primary"
                  plain
                  @click="jumpTo(`/console/editor/${item._id}`)"
                  >编辑</el-button
                >
                <el-button type="danger" plain @click="deleteArticle(item._id)"
                  >删除</el-button
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </main>
</template>
<script>
// import '@fortawesome/fontawesome-free/css/all.css'
// import pagination from "../tools/pagination";
import moment from "moment";
export default {
  name: "artile-manager",
  // components: {
  //   pagination,
  // },
  data() {
    return {
      list: [],
      pages: 1,
      currentPage: 1,
      searchInfo: {
        dateRange: "",
        type: "",
        published: "",
        keyword: "",
        tag: "",
        isPublic: 0,
      },
      page: {
        pageSize: 10,
        pageIndex: 1,
      },
      options: [],
      tags: [],
      types: [],
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
  mounted() {
    this.getList(1);
    this.getTags();
    this.getTypes();
  },
  methods: {
    getNewestList: function () {
      return "";
    },
    getHotList: function () {
      return "";
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.pageIndex = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page.pageIndex = val;
      this.getList();
    },
    async getList(page) {
      let queryString = `page=${page}&createdBy=${this.$route.params.uid}`;
      if (page) {
        this.currentPage = page;
      }
      const { keyword, type } = this.$data;
      if (keyword) queryString += `&keyword=${keyword}`;
      if (type) queryString += `&type=${keyword}`;
      try {
        const result = await this.$getAjax(`/api/articles/list?${queryString}`);
        this.list = result.docs;
        this.pages = result.pages;
        this.list.forEach((item) => {
          item.createdAt = moment(item.createdAt * 1000).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
      } catch (err) {
        this.$message.error(err.message);
      }
    },
    async getTags() {
      let tags = localStorage.getItem("tags");
      if (tags) {
        this.tags = JSON.parse(tags);
        return;
      }
      try {
        const result = await this.$getAjax(
          `/myapi/tags?createdBy=${this.$route.params.uid}`
        );
        this.tags = result;
        localStorage.setItem("tags", JSON.stringify(this.tags));
      } catch (err) {
        this.$message.error(err.message);
      }
    },
    async getTypes() {
      let types = localStorage.getItem("types");
      if (types) {
        this.types = JSON.parse(types);
        return;
      }
      try {
        const queryString = `createdBy=${this.$route.params.uid}`;
        const result = await this.$getAjax(
          `/myapi/articles/types/all?${queryString}`
        );
        this.types = result;
        localStorage.setItem("types", JSON.stringify(this.types));
      } catch (err) {
        this.$message.error("获取失败");
      }
    },
    jumpTo(url) {
      this.$router.push(url);
    },
    deleteArticle(id) {
      this.$confirm("删除文章不可恢复， 确定要删除文章吗？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(async () => {
        await this.$deleteAjax(`/api/articles/${id}`, true);
        this.$message.success("删除成功！");
        this.getList();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form-item {
  display: flex !important;
}
:deep .el-form-item__content {
  width: 100%;
}
.el-select {
  width: 100% !important;
}
.console_article_container {
  padding: 10px;
}
.el-cascader {
  width: 100%;
}
:deep .el-form--inline {
  display: flex;
  margin-right: 0;
}
// .el-form-item
:deep .el-form-item_content {
  flex: 1;
}
.form-container {
  margin-top: 20px;
}
.btn-toolbar {
  text-align: right;
}
:deep .el-popper {
  margin-top: 40px !important;
}
</style>
