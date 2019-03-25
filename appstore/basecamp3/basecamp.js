(function () {
    let prev
    function setCount(next) {
        if (next !== prev) {
            window.wavebox.badge.setCount(next);
            prev = next;
        }
    }
    document.addEventListener("bc:unreads-change", function (e) {
        setCount(e.unreads.length);
    });
    setCount(BC.unreads.getTotal());
})()