<template>
  <div class="admin">
    <form class="container">
      <h2>Administration</h2>
      <div class="admin-info">
        <h2>Add Admin</h2>
        <div class="input">
          <input
            required
            placeholder="Enter user email to make them an admin"
            type="email"
            id="addAdmins"
            v-model="adminEmail"
          />
        </div>
        <span>{{ this.responseMsg }}</span>
        <button v-show="!loading" @click.prevent="addAdmin" class="button">
          Submit
        </button>
        <button disabled v-show="loading" class="button"><Spin /></button>
      </div>
    </form>
  </div>
</template>

<script>
import "firebase/auth";
import db from "../firebase/firebaseInit";
import Spin from "../components/Spin.vue";

export default {
  name: "Admin",
  data() {
    return {
      adminEmail: "",
      selectedUserId: null,
      responseMsg: null,
      loading: false,
    };
  },
  components: {
    Spin,
  },
  methods: {
    async addAdmin() {
      if (this.adminEmail !== "") {
        this.loading = true;
        const dbUsersResult = await db.collection("users").get();

        dbUsersResult.forEach((doc) => {
          if (doc.data().email === this.adminEmail) {
            this.selectedUserId = doc.id;
          }
        });
        const database = db.collection("users").doc(this.selectedUserId);
        database
          .update({
            isAdmin: true,
          })
          .then(() => {
            this.loading = false;
            this.responseMsg = this.adminEmail + " is now an admin";
            this.adminEmail = "";
            setTimeout(() => {
              this.responseMsg = "";
            }, 5000);
          })
          .catch(() => {
            this.loading = false;
            this.responseMsg = "Something went wrong!";
          });
      } else {
        this.responseMsg = "Email is required";
        setTimeout(() => {
          this.responseMsg = "";
        }, 5000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.admin {
  .container {
    max-width: 1000px;
    padding: 60px 25px;

    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }

    .admin-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;

      span {
        font-size: 14px;
      }

      .input {
        margin: 16px 0;

        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }

          &:focus {
            outline: none;
          }
        }
      }

      button {
        align-self: center;
      }
    }
  }
}
</style>