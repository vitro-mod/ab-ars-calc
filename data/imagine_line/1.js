var lines = lines || {};
lines['imagine_line'] = lines['imagine_line'] || {};
lines['imagine_line']['1'] = [
  {
    name: 'Касторская',
    // trackLength: 1102,
    arsDrawBreakpoint: 9,
    arsAllSteps: true,
    tStay: 25,
    K: 1.5,
    modes: {
      0: 'H',
      100: '0',
      1009: 'T',
    },
    // curves: {
			// 0: 0,
		// },
		// slopes: {
      // 0: 0,
      // 820: -55,
      // 980: 0,
		// },
    joints: [
      { x: 84, name: '315', limit: 60 },
      { x: 84 + 50, name: '401', limit: 60 },
      { x: 84 + 50 + 100, name: '401а', limit: 60, point: true },
      { x: 84 + 50 + 215 - 10.5, name: '401б', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 - 62.5 - 87.5 - 112.5 - 12.5, name: '401в', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 - 62.5 - 87.5 - 12.5, name: '403', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 - 62.5, name: '403а', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5, name: '403б', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5, name: '405', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5, name: '407', limit: 60 },
      { x: 1099 - 60.5 - 100, name: '409', limit: 60 },
      { x: 1099 - 60.5 - 50, name: '409а', limit: 60, },
      { x: 1099 - 60.5, name: '411', limit: 60, },
      { x: 1099 + 2 + 12.5, name: '413с', limit: 60, vks: 'min' },
      { x: 1099 + 2 + 62.5 + 12.5, name: '415', limit: 40 },
      { x: 1099 + 2 + 62.5 + 62.5 + 12.5, name: '417', limit: 0 },
      { x: 1099 + 2 + 62.5 + 75 + 37.5, name: '501', limit: 0 },
      { x: 1099 + 2 + 62.5 + 75 + 50 + 37.5, name: '501а', limit: 0 },
      { x: 1099 + 2 + 62.5 + 75 + 37.5 + 62.5 + 62.5 + 12.5, name: '519', limit: 0 },
    ],
    signals: [
      { joint: '315', name: 'КС401', lenses: 'WYGRw', autostop: 1, guard: 60, y: '401в', g: 'NEXT_y' },
      { joint: '401б', name: 'КС403', lenses: 'YGRYw', autostop: 1, guard: 60, y: '403б', g: 'NEXT_y' },
      // { joint: '463', name: 'КС465', lenses: 'YGRw', autostop: 1, guard: 60, y: '469', g: 'NEXT_y' },
      { joint: '403', name: 'КС405', lenses: 'YGRw', autostop: 1, guard: 60, y: '405', g: 'NEXT_y' },
      { joint: '403а', name: 'МТ407', lenses: 'YRGw', autostop: 1, guard: 60, y: '407', yg: 'NEXT_y', g: 'NEXT_yg', shift: 3 },
      { joint: '403б', name: 'MT409', lenses: 'YRGw', autostop: 1, guard: 60, y: '409а', yg: 'NEXT_y', g: 'NEXT_yg' },
      { joint: '405', name: 'MT411', lenses: 'YRGw', autostop: 1, guard: 60, y: '411', yg: 'NEXT_y', g: 'NEXT_yg' },
      { joint: '407', name: 'MT413', lenses: 'YRGw', autostop: 1, guard: 60, y: '413с', yg: 'NEXT_y', g: 'NEXT_g', shift: 3 },
      { joint: '409', name: 'MT415', lenses: 'YRGw', autostop: 1, guard: 60, y: '415', g: 'NEXT_yg', shift: 17 },
      { joint: '411', name: '417', lenses: 'YRG', autostop: 1, guard: 60, yg: '417' },
      { joint: '415', name: '501', lenses: 'X', guard: 35 },
    ],
  },
  {
    name: 'Проспект Метростроителей',
    // trackLength: 1102,
    arsDrawBreakpoint: 9,
    arsAllSteps: true,
    tStay: 25,
    K: 1.5,
    modes: {
      0: 'H',
      100: '0',
      1009: 'T',
    },
    // curves: {
			// 0: 0,
		// },
		// slopes: {
      // 0: 0,
      // 820: -55,
      // 980: 0,
		// },
    joints: [
      { x: 0 - 60.5, name: '411', limit: 60, },
      { x: 0 + 2 + 12.5, name: '413с', limit: 60, vks: 'min' },
      { x: 0 + 2 + 62.5 + 12.5, name: '415', limit: 40 },
      { x: 0 + 2 + 62.5 + 62.5 + 12.5, name: '417', limit: 0 },
      { x: 0 + 2 + 62.5 + 75 + 37.5, name: '515', limit: 0 },
      { x: 0 + 2 + 62.5 + 75 + 50 + 37.5, name: '517', limit: 0 },
      { x: 0 + 2 + 62.5 + 75 + 37.5 + 62.5 + 62.5, name: '519', limit: 0 },
      { x: 0 + 2 + 62.5 + 75 + 37.5 + 62.5 + 62.5 + 100, name: '519', limit: 0 },
    ],
    signals: [
    ],
  },
  {
    name: 'Россошанская',
        arsDrawBreakpoint: 9,
    arsAllSteps: true,
    tStay: 25,
    K: 1.5,
    modes: {
      0: 'H',
      100: '0',
      1009: 'T',
    },
    // curves: {
			// 0: 0,
		// },
		// slopes: {
      // 0: 0,
      // 820: -55,
      // 980: 0,
		// },
    // joints: [
    // ],
    // signals: [
    // ],
  },
  {
    name: 'Красный Маяк',
    arsDrawBreakpoint: 6,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
    },
    joints: [
    ],
    signals: [
    ],
  },
  {
    name: 'Инженерная',
    arsDrawBreakpoint: 6,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
    },
    joints: [
    ],
    signals: [
    ],
  },
  {
    name: 'Северная',
    arsDrawBreakpoint: 6,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
    },
    joints: [
    ],
    signals: [
    ],
  },
  {
    name: 'Проспект Энергетиков',
    arsDrawBreakpoint: 6,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
    },
    joints: [
    ],
    signals: [
    ],
  },
  {
    name: 'Проспект Энергетиков - Оборот',
    arsDrawBreakpoint: 6,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
    },
    joints: [
    ],
    signals: [
    ],
  },
]