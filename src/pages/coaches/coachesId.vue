<template>
<div>
  <section>
    <base-card>
    <h2>{{ fullName }}</h2>
    <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
    <header>
    <h2>Interested? Reash out now!</h2>
    <base-button link :to="contactLink">contact</base-button>
    </header>
    <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
    <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
    <p>{{ descriptions }}</p>
    </base-card>
  </section>
</div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      selectedCoach: null
    }
  },
  computed: {
    fullName () {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
    },
    coachContactLink () {
      return this.$route.path + '/' + this.id + '/contact/'
    },
    areas () {
      return this.selectedCoach.areas
    },
    rate () {
      return this.selectedCoach.hourlyRate
    },
    descriptions () {
      return this.selectedCoach.description
    }
  },
  created () {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find((coach) => coach.id === this.id)
  }
}
</script>
