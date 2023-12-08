<template>
<div>
  <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-dialog :show="isloading" title="Authenticating..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">Please enter valid emial or 6 char password</p>
        <base-button>{{ submitButtonCap }}</base-button>
        <base-button type="button" mode="flat" @click="switchMode">{{ switchModeButtonCaption }}</base-button>
      </form>
    </base-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null
    }
  },
  computed: {
    submitButtonCap () {
      if (this.mode === 'login') {
        return 'login'
      } else {
        return 'signup'
      }
    },
    switchModeButtonCaption () {
      if (this.mode === 'login') {
        return 'signup instead'
      } else {
        return 'login instead'
      }
    }
  },
  methods: {
    async submitForm () {
      this.formIsValid = true
      if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
        this.formIsValid = false
        return
      }

      const actionPayolad = {
        email: this.email,
        password: this.password
      }

      this.isLoading = true

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayolad)
        } else {
          await this.$store.dispatch('signup', actionPayolad)
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
        this.$router.replace(redirectUrl)
      } catch (err) {
        this.error = err.message || 'failed to auth try later'
      }

      this.isLoading = false
    },
    switchMode () {
      if (this.mode === 'login') {
        this.mode = 'signup'
      } else {
        this.mode = 'login'
      }
    },
    handleError () {
      this.error = null
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  margin-bottom: 20px;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
p {
  color: red;
}
</style>
