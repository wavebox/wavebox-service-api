(function () {
  // Utils
  const getUnreadMessageElements = function () {
    return Array.from(document.querySelectorAll('.CxUIE')).filter((el) => {
      return !el.querySelector('[data-icon="muted"]')
    })
  }

  const getUnreadCount = function (elements) {
    return elements.length
  }

  const getUnreadMessages = function (elements) {
    return elements.map((el, index) => {
      const titles = el.querySelectorAll('[title]')
      const name = titles[0].getAttribute('title')
      const summary = titles[1].getAttribute('title')
      return {
        text: name,
        subtitle: summary,
        id: `${index}_${name}`,
        date: index
      }
    })
  }

  const unreadMessagesToHash = function (messages) {
    return messages.map((m) => `${m.text}|${m.summary}`).join('|')
  }

  // Updating
  const prev = {
    count: undefined,
    messagesHash: undefined
  }
  const updateWavebox = function () {
    const elements = getUnreadMessageElements()
    const count = getUnreadCount(elements)
    const messages = getUnreadMessages(elements)
    const messagesHash = unreadMessagesToHash(messages)

    if (prev.count !== count) {
      prev.count = count
      window.wavebox.badge.setCount(count)
    }
    if (prev.messagesHash !== messagesHash) {
      prev.messagesHash = messagesHash
      window.wavebox.tray.setMessages(messages)
    }
  }

  // Events
  setInterval(function () {
    updateWavebox()
  }, 2000)
  const observer = new window.MutationObserver(function (mutations) {
    updateWavebox()
  })
  observer.observe(document.querySelector('head title'), {
    subtree: true,
    characterData: true,
    childList: true
  })
})()
