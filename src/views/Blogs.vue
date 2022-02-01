<template>
  <div class="container">
    <div v-show="error" class="err-message">
      <p><span>Error: </span>{{ errorMsg }}</p>
    </div>
    <div class="blog-card-wrap">
      <div class="blog-cards container">
        <div v-if="this.$store.state.profileIsAdmin" class="toggle-edit">
          <span>Toggle Editing Post</span>
          <input type="checkbox" v-model="editPost" />
        </div>
        <BlogCard
          v-on:unauthorized="unauthorizedMethod"
          :post="post"
          v-for="(post, index) in blogPosts"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard.vue";
export default {
  name: "blogs",
  data() {
    return {
      error: false,
      errorMsg: null,
    };
  },
  components: { BlogCard },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        this.$store.commit("toggleEditPost", payload);
      },
    },
  },
  methods: {
    unauthorizedMethod() {
      this.error = true;
      this.errorMsg = "Unauthorized to edit and delete this post";
      setTimeout(() => {
        this.error = false;
        this.errorMsg = "";
      }, 2000);
    },
  },
  beforeDestroy() {
    this.$store.commit("toggleEditPost", false);
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type="checkbox"]::before {
      background: #fff;
      left: 52px;
    }
  }
}

.err-message {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  background-color: #303030;
  opacity: 1;
  transform: 0.5s ease all;

  p {
    font-size: 14px;
  }

  span {
    font-weight: 600px;
  }
}
</style>