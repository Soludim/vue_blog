import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    profileIsAdmin: null
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    }
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogPhotoFileURL;
      state.blogPhotoName = payload.blogPhotoName;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload);
    },
    updateUser(state, payload) {
      state.user = payload
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      state.profileIsAdmin = doc.data().isAdmin;
    },
    setProfileInitials(state) {
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("")
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
    changeEmail(state, payload) {
      state.profileEmail = payload;
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const database = db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await database.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials")
    },
    async getPost({ state }) {
      const database = db.collection('blogPosts').orderBy('date', 'desc');
      const dbResults = await database.get();
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some(post => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogTitle: doc.data().blogTitle,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },
    async deletePost({ commit }, payload) {
      const post = db.collection("blogPosts").doc(payload);
      await post.delete();
      commit('filterBlogPost', payload);
    },
    async updateUserSettings({ commit, state }) {
      const database = db.collection('users').doc(state.profileId);
      await database.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername
      });
      commit("setProfileInitials");
    },
  },
  modules: {
  }
})