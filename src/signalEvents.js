function setupSignalEvents() {
    document.querySelectorAll('.signal').forEach(el => {
        el.addEventListener('click', function (e) {
            this.style.opacity = '0.5';
            let target = this;
            setTimeout(() => {
                target.style.opacity = '1';
            }, 200);

            const signalName = this.id;
            const result = signalRcs(signalName);
            const resultText = "['" + result.join("', '") + "']";
            console.log(resultText);
            navigator.clipboard.writeText(resultText);
        });
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
                    if (e.shiftKey) {
                        result.push('rc' + peregon.joints[i-1].name);
                    } else {
                        result.push(arsCode(peregon.joints[i]));
                    }
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
