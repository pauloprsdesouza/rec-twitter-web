<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{'disabled': pagination.page === 1}">
        <button class="page-link" v-on:click="previous()">Previous</button>
      </li>
      <li class="page-item" v-for="(item,index) in pagination.totalPages" :key="index" :class="{'active': pagination.page === item}">
        <button class="page-link" v-on:click="current(item)" v-if="item <= 4">{{item}}</button>
      </li>
      <li class="page-item" :class="{'disabled': pagination.page === pagination.totalPages}">
        <button class="page-link" v-on:click="next()">Next</button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ["update", "paginationBegin", "currentPagination", "limit"],
  data: function() {
    return {
      pagination: this.currentPagination
    };
  },
  watch: {
    currentPagination: function(newPagination) {
      newPagination.limit = typeof this.limit === "number" ? this.limit : 10;
      this.pagination = newPagination;
    }
  },
  methods: {
    previous: function() {
      if (this.pagination.page > 1) {
        this.pagination.page--;

        this.update();
      }
    },
    next: function() {
      if (this.pagination.page < this.pagination.totalPages) {
        this.pagination.page++;

        this.update();
      }
    },
    current: function(page) {
      this.pagination.page = page;

      this.update();
    }
  },
  mounted() {
    this.pagination = {
      page: 1,
      totalPages: 1,
      limit: typeof this.limit === "number" ? this.limit : 10
    };

    this.paginationBegin();
  }
};
</script>
