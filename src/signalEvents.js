function setupSignalEvents() {
    document.querySelectorAll('.signal').forEach(el => {
        el.addEventListener('click', function (e) {
            this.style.opacity = '0.5';
            let target = this;
            setTimeout(() => {
                target.style.opacity = '1';
            }, 200);

            let signal = peregon.signals.find(el => el.name == this.id);
            let joint = peregon.joints.findIndex(el => el.name == signal.joint);
            let open = peregon.joints.findIndex(el => el.name == (signal.y ?? signal.yg ?? signal.g));
            let result = peregon.joints.slice(joint, open + 1).map(el => 'rc' + el.name);
            let resultText = "['" + result.join("', '") + "']";
            console.log(resultText);
            navigator.clipboard.writeText(resultText);
        })
    });

    document.querySelectorAll('.rcname').forEach(el => {
        el.addEventListener('click', function (e) {
            let name = el.querySelector('text');

            if (!window.rcStart) {
                window.rcStart = name;
                window.rcStart.style.fill = 'red';
            } else {
                window.rcStart.style.fill = '';
                window.rcEnd = name;

                const startI = Number(peregon.joints.findIndex(el => el.name == window.rcStart.innerHTML)) + 1;
                const endI = Number(peregon.joints.findIndex(el => el.name == window.rcEnd.innerHTML)) + 2;

                const result = [];
                for (let i = startI; i < endI; i++) {
                    result.push(arsCode(peregon.joints[i]));
                }

                const resultText = "'" + result.join("', '") + "'";

                console.log(resultText);
                navigator.clipboard.writeText(resultText);

                window.rcStart = null;
                window.rcEnd = null;
            }
        });
    });
}
