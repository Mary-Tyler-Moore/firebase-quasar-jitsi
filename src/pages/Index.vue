
<template>
  <q-page class="column items-center justify-center bg-grey-7 text-white">
    <div
      class="full-width"
      id="jitsi-container"
    ></div>
  </q-page>
</template>

<script>
/* eslint-disable no-undef */
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { QSpinnerGears } from 'quasar'

export default {
  name: 'PageIndex',
  computed: {
    ...mapGetters('common', ['chatOverlay'])
  },
  data () {
    return {
      room: '',
      username: ''
    }
  },
  mounted () {
    this.openRoom()
  },
  methods: {
    ...mapActions('common', ['startConference']),
    ...mapMutations('common', ['setChatLoadingOverlay']),
    openRoom () {
      const self = this
      this.$q.dialog({
        title: 'Welcome to J.C. Lewis Ford',
        message: 'Please enter your name.',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        self.username = data
        this.$q.dialog({
          title: 'Welcome to J.C. Lewis Ford',
          message: 'Please select a department.',
          options: {
            type: 'radio', // or 'checkbox' / 'toggle'
            model: 'sales', // Array when checkbox/toggle! (like '[]')
            items: [
              { label: 'Sales', value: 'sales' },
              { label: 'Service', value: 'service' },
              { label: 'Finance', value: 'finance' }
            ]
          },
          cancel: true,
          persistent: true
        }).onOk(async data => {
          self.room = data
          const { room, username } = self,
            parentNode = document.getElementById('jitsi-container')
          this.$q.loading.show({
            message: 'Loading your chat, standby',
            backgroundColor: 'grey-4',
            spinner: QSpinnerGears
          })
          this.setChatLoadingOverlay(true)
          this.startConference({ parentNode, room, username })
        })
      })
    }
  },
  watch: {
    chatOverlay: function (val) {
      if (!val) this.$q.loading.hide()
    }
  }
}
</script>
<style lang="sass">
#jitsi-container
  height: 100vh
</style>
