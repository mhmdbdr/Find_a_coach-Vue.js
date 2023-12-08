<template>
<div>
  <base-dialog :show="!!error" title="an error ocurred" @close="handleerror">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests recevied</h2>
      </header>
      <base-spinner v-if="isloading"></base-spinner>
      <ul v-else-if="hasRequests && !isloading">
        <request-item v-for="req in receviedRequests" :key="req.id" :email="req.userEmail" :message="req.message"></request-item>
      </ul>
      <h3 v-else>you havent recevied any requests yet!</h3>
    </base-card>
  </section>
</div>
</template>

<script>
import RequestItem from '../../components/requests/requestsItem.vue'

export default {
  data () {
    return {
      isloading: false,
      error: null
    }
  },
  components: {
    RequestItem
  },
  computed: {
    receviedRequests () {
      return this.$store.getters['requests/requests']
    },
    hasRequests () {
      return this.$store.getters['requests/hasRequests']
    }
  },
  methods: {
    async loadRequests () {
      this.isloading = true
      try {
        await this.$store.dispatch('requests/fetchRequests')
      } catch (error) {
        this.error = error.message || 'something went wrong'
      }
      this.isloading = false
    },
    handleerror () {
      this.error = null
    }
  },
  created () {
    this.loadRequests()
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
