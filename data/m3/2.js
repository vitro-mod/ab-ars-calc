var lines = lines || {};
lines['m3'] = lines['m3'] || {};
lines['m3']['2'] = [
    {
        name: 'Kőbánya-Kispest',
        trackLength: 1431,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1.5,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
            935: -60,
            1152: 0,
        },
        modes: {
            0: 'H',
            200: '0',
            935: 'P-59',
            1152: '0',
            1342: 'T',
        },
        joints: [
            { x: 62.5 + 4.2+12.5, name: '152', limit: 0 },
            { x: 62.5 + 4.2 + 200, name: '154', limit: 0 },
            { x: 62.5 + 4.2 + 300 + 300 - 50, name: '156', limit: 0 },
            { x: 62.5 + 4.2 + 375 + 375 + 150, name: '20', limit: 0 },
            { x: 1166.72, name: '22', limit: 0 },
            { x: 1431 - 62.5 - 62.5 - 62.5, name: '26', limit: 0 },
            { x: 1431 - 62.5 - 62.5, name: '28', limit: 0 },
            { x: 1431 - 62.5, name: '28d', limit: 0 },
            { x: 1431, name: '30', limit: 0 },
            { x: 1431 + 62.5, name: '32', limit: 0 },
            { x: 1431 + 62.5 + 62.5, name: '34', limit: 0 },
            { x: 1431 + 62.5 + 62.5 + 62.5, name: '36a', limit: 0 },
        ],
        signals: [
            { joint: '152', name: '22', lenses: 'GRY', autostop: 3, guard: 80, y: '154', g: 'NEXT_y' },
            { joint: '154', name: '24', lenses: 'GRY', autostop: 3, guard: 80, y: '156', g: 'NEXT_y' },
            { joint: '156', name: '26', lenses: 'GRY', autostop: 3, guard: 80, y: '26', g: 'NEXT_y' },
            { joint: '20', name: '28', lenses: 'GRY', autostop: 3, guard: 60, shift: 4.7, y: '28', yg: 'NEXT_y', g: 'NEXT_yg' },
            { joint: '22', name: 'FH-T4H', lenses: 'GYRY', autostop: 1, guard: 60, shift: 11.2, y: '28d', yg: 'NEXT_y', g: 'NEXT_yg' },
            { joint: '26', name: '30H', lenses: 'GRY', autostop: 1, guard: 60, y: '30', yg: 'NEXT_y', g: 'NEXT_yg' },
            { joint: '28', name: '32H', lenses: 'GRY', autostop: 1, guard: 60, y: '32', yg: 'NEXT_y' },
            { joint: '28d', name: '34H', lenses: 'YR', autostop: 1, guard: 60, y: '34' },
            { joint: '32', name: 'EH', lenses: 'x', autostop: 3, guard: 35 },
        ],
        switches: [
            { x: 1174, name: '2', left: true, trailing: false },
        ],
    },
    {
        name: 'Határ út',
        trackLength: 896,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
            317: -52,
            593: 0,
        },
        modes: {
            0: 'H',
            200: '0',
            317: 'P-51',
            593: '0',
            779: 'T',
        },
    },
    {
        name: 'Pöttyös utca',
        trackLength: 405,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
        },
        modes: {
            // 0: 'H',
        },
    },
    {
        name: 'Ecseri út',
        trackLength: 979,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
        },
        modes: {
            // 0: 'H',
        },
    },
    {
        name: 'Népliget',
        trackLength: 1246,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
        },
        modes: {
            // 0: 'H',
        },
    },
    {
        name: 'Nagyvárad tér',
        trackLength: 2015,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
        },
        modes: {
            // 0: 'H',
        },
    },
    {
        name: 'Klinikák',
        trackLength: 393,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
        },
        modes: {
            // 0: 'H',
        },
    },
    {
        name: 'Corvin-negyed',
        trackLength: 1739,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
        },
        modes: {
            // 0: 'H',
        },
    },
    {
        name: 'Kálvin tér',
        trackLength: 703,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
        },
        modes: {
            // 0: 'H',
        },
    },
    {
        name: 'Ferenciek tere',
        trackLength: 901,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
        },
        modes: {
            // 0: 'H',
        },
    },
    {
        name: 'Deák Ferenc tér',
        trackLength: 260,
        arsAllSteps: true,
        arsDrawBreakpoint: 6,
        tStay: 30,
        K: 1,
        curves: {
            0: 0,
        },
        slopes: {
            0: 0,
        },
        modes: {
            // 0: 'H',
        },
    },
];