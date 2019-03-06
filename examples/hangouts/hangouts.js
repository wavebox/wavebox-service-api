(function () {
  const getUnreadCount = function () {
    try {
      const chatFrame = document.querySelector('#hangout-landing-chat iframe').contentWindow.document.body
      return chatFrame.querySelectorAll('.ee').length
    } catch (ex) {
      return 0
    }
  }

  let prev
  window.Notification.requestPermission()
  setInterval(function () {
    const next = getUnreadCount()
    if (next !== prev) {
      window.wavebox.badge.setCount(next)
      if (next === 0) {
        window.wavebox.tray.setMessages([])
      } else if (next === 1) {
        window.wavebox.tray.setMessages([{ text: '1 unread message' }])
      } else if (next > 1) {
        window.wavebox.tray.setMessages([{ text: next + ' unread messages' }])
      }

      if (prev !== undefined && next !== undefined && next > prev) {
        const diff = next - prev
        const notif = new window.Notification('New Hangouts Message', {
          body: 'You have ' + diff + ' new message' + (diff > 1 ? 's' : '')
        })
        notif.onclick = function () {}
      }

      prev = next
    }
  }, 1500)
})()
