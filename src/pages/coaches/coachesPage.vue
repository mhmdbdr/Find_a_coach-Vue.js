<template>
<div>
<base-dialog :show="!!error" title="an error ocurred" @close="handleerror">
  <p>{{ error }}</p>
</base-dialog>
<section>
  <coach-filter @change-filter="setfilters"></coach-filter>
</section>
<section>
  <base-card>
    <div class="controls">
      <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
      <base-button link to="/auth?redirect=register" v-if="!isloggedin">Login to register as a coach</base-button>
      <base-button v-if="!isCoach && !isloading && isloggedin" link to="/register">Register as Coach</base-button>
    </div>
    <div v-if="isloading">
      <base-spinner></base-spinner>
    </div>
    <ul v-else-if="hasCoaches">
      <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :first-name="coach.firstName" :last-name="coach.lastName" :rate="coach.hourlyRate" :areas="coach.areas"></coach-item>
    </ul>
    <h3 v-else>no coaches found.</h3>
  </base-card>
</section>
</div>
</template>

<script>
import CoachItem from '@/components/coaches/coachesItem.vue'
import coachFilter from '@/components/coaches/CoachFilter'

export default {
  data () {
    return {
      activefilters: {
        frontend: true,
        backend: true,
        career: true
      },
      isloading: false,
      error: null
    }
  },
  components: {
    CoachItem,
    coachFilter
  },
  computed: {
    isCoach () {
      return this.$store.getters['coaches/isCoach']
    },
    filteredCoaches () {
      const coaches = this.$store.getters['coaches/coaches']
      return coaches.filter((coach) => {
        if (this.activefilters.backend && coach.areas.includes('backend')) {
          return true
        }
        if (this.activefilters.frontend && coach.areas.includes('frontend')) {
          return true
        }
        if (this.activefilters.career && coach.areas.includes('career')) {
          return true
        }
        return false
      })
    },
    hasCoaches () {
      return !this.isloading && this.$store.getters['coaches/hasCoaches']
    },
    isloggedin () {
      return this.$store.getters.isAuthent
    }
  },
  methods: {
    setfilters (updatedfilters) {
      this.activefilters = updatedfilters
    },
    async loadCoaches (refresh = false) {
      this.isloading = true
      try {
        await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh })
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
    this.loadCoaches()
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
