const getNewestComposeElements = function () {
  const subjectEl = Array.from(document.querySelectorAll('[name="subjectbox"]')).slice(-1)[0]
  if (!subjectEl) { return undefined }

  const dialogEl = subjectEl.closest('[role="dialog"]')
  if (!dialogEl) { return undefined }

  const bodyEl = dialogEl.querySelector('[g_editable="true"][role="textbox"]')
  const recipientEl = dialogEl.querySelector('[name="to"]')

  return {
    subject: subjectEl,
    dialog: dialogEl,
    body: bodyEl,
    recipient: recipientEl
  }
}

const populateNewestComposeWindow = function (to, subject) {
  const elements = getNewestComposeElements()
  if (!elements) { return false }

  let focusOn

  if (to && elements.recipient) {
    elements.recipient.value = to
    focusOn = elements.subject
  }

  if (subject && elements.subject) {
    elements.subject.value = subject
    focusOn = elements.body
  }

  if (focusOn) {
    setTimeout(() => focusOn.focus(), 500)
  }
  return true
}

const composeMessage = function (to, subject) {
  // Open the compose window
  const composeButton = document.querySelector('.T-I.J-J5-Ji.T-I-KE.L3')
  if (!composeButton) { return }

  const downEvent = document.createEvent('MouseEvents')
  downEvent.initEvent('mousedown', true, false)
  composeButton.dispatchEvent(downEvent)

  const upEvent = document.createEvent('MouseEvents')
  upEvent.initEvent('mouseup', true, false)
  composeButton.dispatchEvent(upEvent)

  if (to || subject) {
    setTimeout(() => {
      const didPopulate = populateNewestComposeWindow(to, subject)
      if (!didPopulate) {
        let retries = 0
        const retry = setInterval(() => {
          retries++
          const didPopulate = populateNewestComposeWindow(to, subject)
          if (didPopulate || retries > 20) { clearInterval(retry) }
        }, 100)
      }
    }, 1)
  }

  return true
}


const argComponents = args.trim().split(' ')
const to = argComponents[0]
const subject = argComponents.slice(1).join(' ')
composeMessage(to, subject)