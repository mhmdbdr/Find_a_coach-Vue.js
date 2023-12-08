<template>
<div>
  <section>
    <base-card>
    <h2>Register as a coach now!</h2>
    <coach-form @save-data="savedata"></coach-form>
    </base-card>
  </section>
</div>
</template>

<script>
import coachForm from '../../components/coaches/CoachForm.vue'

export default {
  components: {
    coachForm
  },
  methods: {
    savedata (coachdata) {
      this.$store.dispatch('coaches/registercoach', coachdata)
      this.$router.replace('/coaches')
    }
  },
  computed: {
  }
}
</script>
