export const teste = (hass) =>
  hass.connection.sendMessagePromise({
    type: 'raceland-dashboard/testevent'
  })