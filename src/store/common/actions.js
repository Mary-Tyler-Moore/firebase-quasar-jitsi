/* eslint-disable no-undef */
import 'jitsiAPI'

export function routeUserToAuth () {
  this.$router.push({ path: '/auth' })
}

export async function startConference ({ commit }, props) {
  let api
  const { parentNode, room, username } = props
  try {
    const domain = 'streamvideochat.com',
      options = {
        audioInput: '<deviceLabel>',
        audioOutput: '<deviceLabel>',
        videoInput: '<deviceLabel>',
        roomName: room,
        height: 500,
        parentNode: parentNode,
        interfaceConfigOverwrite: {
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false
        },
        configOverwrite: {
          disableSimulcast: false
        }
      }

    api = new JitsiMeetExternalAPI(domain, options)
    api.addEventListener('videoConferenceJoined', () => {
      commit('setChatLoadingOverlay', false)
      api.executeCommand('displayName', username)
    })
  } catch (err) {
    console.error(err)
  }
}
