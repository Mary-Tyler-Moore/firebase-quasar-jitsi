<template>
  <q-page padding class="bg-grey-9 text-white column items-center justify-center">
    <q-card class="column items-center q-pa-md q-gutter-y-lg">
      <h5 class="text-black">Quasar Jitsi Video Chat</h5>
      <q-btn>
        <q-icon left>
          <img src="~assets/google-logo.svg" alt="Google Logo">
        </q-icon>
        <div @click="login" class="text-grey">Sign in with Google</div>
      </q-btn>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Auth',
  methods: {
    ...mapActions('auth', ['signInWithGoogle']),
    async login () {
      try {
        await this.signInWithGoogle()
        this.$router.push({ path: '/' })
      } catch (err) {

      }
    }
  }
}
</script>
<style lang="sass">
  .icon-logo, .video-logo
    height: 5em

  .video-logo
    width: 7em!important
</style>
