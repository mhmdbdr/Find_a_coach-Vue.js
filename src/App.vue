<template>
<the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/theHeader.vue'

export default {
  components: {
    TheHeader
  },
  created () {
    this.$store.dispatch('tryLogin')
  },
  computed: {
    didAutoLogout () {
      return this.$store.getters.didAutoLogout
    }
  },
  watch: {
    didAutoLogout (cur, old) {
      if (cur && cur !== old) {
        this.$router.replace('/coaches')
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active{
  transition: all 0.3s ease-out;
}
.route-leave-active{
    transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
