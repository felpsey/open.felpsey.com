<template> 
  <p>You're viewing WELCOMEMESSAGE component</p>
  <WelcomeMessage msg="Message received from the server:" :info="info"/>
</template>

<script>
import WelcomeMessage from './components/WelcomeMessage.vue'

export default {
  name: 'App',
  components: {
    WelcomeMessage
  },
  data () {
    return {
      info: null
    }
  },
  mounted () {
    const axios = require('axios');

    axios
      .get('http://localhost:3000/welcome')
      .then(response => (this.info = response.data.message))
      .catch(error => (this.info = error.message))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
