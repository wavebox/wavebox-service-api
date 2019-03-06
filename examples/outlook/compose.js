const argComponents = args.trim().split(' ')
const to = argComponents[0]
const subject = argComponents.slice(1).join(' ')
const qs = [
  to ? 'to=' + encodeURIComponent(to) : undefined,
  subject ? 'subject=' + encodeURIComponent(subject) : undefined
].filter((l) => !!l).join('&')
const composeUrl = [
  window.location.protocol,
  '//',
  window.location.hostname,
  '/mail/deeplink/compose?',
  qs
].join('')
window.open(composeUrl, '_blank', 'width=800,height=600')