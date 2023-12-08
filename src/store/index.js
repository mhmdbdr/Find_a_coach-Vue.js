import { createStore } from 'vuex'

import coachesmodule from './modules/coaches/index'
import requestsmodule from './modules/requests/index'
import authmodule from './modules/auth/index'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const store = createStore({
  modules: {
    coaches: coachesmodule,
    requests: requestsmodule,
    auth: authmodule
  },
  mutations,
  getters,
  actions
})

export default store
