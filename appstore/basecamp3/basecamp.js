(function () {
    let prev
    function setCount(next) {
        if (next !== prev) {
            window.wavebox.badge.setCount(next);
            prev = next;
        }
    }
    function getMessages() {
        BC.fetch(BC.accountPath("/my/readings"), { as: "json" }).then((e) => {
            let messages = [];
            for (const i in e.unreads) {
                if (e.unreads.hasOwnProperty(i)) {
                    const unread = e.unreads[i];
                    messages.push({
                        id: unread.id,
                        title: unread.title,
                        subtitle: `${unread.creator.name} - ${unread.bucket_name}`,
                        date: Date.parse(unread.unread_at)
                    });
                }
            }
            window.wavebox.tray.setMessages(messages);
        });
    }
    document.addEventListener("bc:unreads-change", function (e) {
        setCount(e.unreads.length);
        getMessages();
    });
    setCount(BC.unreads.getTotal());
    getMessages();
})()