<template>
  <form @submit.prevent="submitform">
    <div class="form-control" :class="{invalid : !firstname.isvalid}">
      <label for="firstname">firstname</label>
      <input type="text" id="firstname" v-model.trim="firstname.val" @blur="clearval('firstname')">
      <p v-if="!firstname.isvalid ">first name must not be empty.</p>
    </div>
    <div class="form-control" :class="{invalid : !lastname.isvalid}">
      <label for="lastname">lastname</label>
      <input type="text" id="lastname" v-model.trim="lastname.val" @blur="clearval('lastname')">
      <p v-if="!lastname.isvalid ">last name must not be empty.</p>
    </div>
    <div class="form-control"  :class="{invalid : !description.isvalid}">
      <label for="description">description</label>
      <textarea id="description" rows="5" v-model.trim="description.val" @blur="clearval('description')"></textarea>
      <p v-if="!description.isvalid ">description must not be empty.</p>
    </div>
    <div class="form-control" :class="{invalid : !rate.isvalid}">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate.val" @blur="clearval('rate')">
      <p v-if="!rate.isvalid ">rate must not be greater than 0.</p>
    </div>
    <div class="form-control" :class="{invalid : !areas.isvalid}">
      <h3>Area of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="clearval('areas')">
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="clearval('areas')">
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="clearval('areas')">
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isvalid ">At least one expertise must be selected.</p>
    </div>
    <p v-if="!validation">please fix the above errors and submit again</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data () {
    return {
      firstname: {
        val: '',
        isvalid: true
      },
      lastname: {
        val: '',
        isvalid: true
      },
      description: {
        val: '',
        isvalid: true
      },
      rate: {
        val: null,
        isvalid: true
      },
      areas: {
        val: [],
        isvalid: true
      },
      validation: true
    }
  },
  methods: {
    clearval (input) {
      this[input].isvalid = true
    },
    validateform () {
      this.validation = true
      if (this.firstname.val === '') {
        this.firstname.isvalid = false
        this.validation = false
      }
      if (this.lastname.val === '') {
        this.lastname.isvalid = false
        this.validation = false
      }
      if (this.description.val === '') {
        this.description.isvalid = false
        this.validation = false
      }
      if (this.areas.val.length === 0) {
        this.areas.isvalid = false
        this.validation = false
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isvalid = false
        this.validation = false
      }
    },
    submitform () {
      this.validateform()
      if (!this.validation) {
        return
      }
      const formdata = {
        first: this.firstname.val,
        last: this.lastname.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      }
      this.$emit('save-data', formdata)
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
