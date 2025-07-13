var lines = lines || {};
lines['crossline-redux'] = lines['crossline-redux'] || {};
lines['crossline-redux']['4'] = [
    {
        name: 'пр. р. ст. №2',
        arsDrawBreakpoint: 7,
        arsAllSteps: false,
        tStay: 0,
        K: 1.5,
        interval: 44,
        modes: {
            0: 'H',
            188: '0',
        },
        joints: [
            { x: 109, name: '1СП', limit: 0 },
        ],
        signals: [
            { joint: '341', name: 'А3', lenses: 'WR-w' },
        ],
    },
    {
        name: 'жопа Е2м',
        arsDrawBreakpoint: 7,
        arsAllSteps: false,
        tStay: 0,
        K: 1,
        interval: 44,
        modes: {
            0: 'H',
            188: '0',
        },
        joints: [],
    },
];