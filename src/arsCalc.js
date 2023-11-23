function calcArs() {
    for (let i = 0; i < peregon.joints.length; i++) {
        let x = peregon.joints[i].x;
        let arsS = arsSteps.map(el => {
            // console.log(peregon.joints[i].name, x, el, stepFn(peregon.slopes, x), stepFn(peregon.slopes, Number(stepFnNext(peregon.slopes, x)) + 1), Number(stepFnNext(peregon.slopes, x)) - x)
            let sObj = sArsObj(el, stepFn(peregon.slopes, x), stepFn(peregon.slopes, Number(stepFnNext(peregon.slopes, x)) + 1), Number(stepFnNext(peregon.slopes, x)) - x);

            let nextJoint = findNextJoint(x + sObj.full, i);
            let nextJointX = nextJoint.joint?.x || x + sObj.full;
            let nextJointI = nextJoint.i || i;
            let v = el;
            let jointI = i;
            if (peregon.joints[i].limit < el) nextJointI = 0;
            if (peregon.joints[i].later && peregon.joints[i].later[el]) {
                nextJointI += peregon.joints[i].later[el];
                nextJointX = peregon.joints[nextJointI].x;
            }
            else if(peregon.joints[i].later && peregon.joints[i].later[el] == 0) {
                nextJointI = 0;
            }

            // if (i && peregon.arsAllSteps && nextJoint.i - i ==  )

            return { jointI, nextJointX, nextJointI, v, sObj };
        });

        peregon.joints[i].arsCalc = arsS;

        if (peregon.arsAllSteps) {
            arsS.forEach((el, ind, arr) => {
                if (ind && el.nextJointI && el.nextJointI <= arr[ind - 1].nextJointI) {
                    el.nextJointI = arr[ind - 1].nextJointI + 1;
                    el.nextJointX = peregon.joints[el.nextJointI]?.x || el.nextJointX;
                }
            });
        }
        if (i) {
            let beg = Math.round(peregon.joints[i - 1].x / stepLength);
            let end = Math.round(peregon.joints[i].x / stepLength);
            let max = Math.max(...peregonConcat.slice(beg, end).map(el => el.Vn));
            peregon.joints[i].vMax = max;
        }
    }
}