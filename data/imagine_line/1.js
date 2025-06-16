var lines = lines || {};
lines['imagine_line'] = lines['imagine_line'] || {};
lines['imagine_line']['1'] = [
    {
    name: 'Касторская',
    arsDrawBreakpoint: 9,
    arsAllSteps: true,
    tStay: 25,
    K: 1.5,
    modes: {
      0: 'H',
      100: '0',
      1009: 'T',
    },
    joints: [
      { x: 84, name: '315', limit: 60 },
      { x: 84 + 50, name: '401', limit: 60 },
      { x: 84 + 50 + 100, name: '401а', limit: 60, point: true, point: true },
      { x: 84 + 50 + 215 - 10.5, name: '401б', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 - 62.5 - 87.5 - 112.5 - 12.5, name: '401в', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 - 62.5 - 87.5 - 12.5, name: '403', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 - 62.5 - 87.5 - 12.5 + 62.5, name: '403а', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 - 62.5 + 25, name: '403б', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 + 25, name: '405', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 - 62.5 + 25 + 12.5, name: '407', limit: 60 },
      { x: 1099 - 60.5 - 100 - 87.5 + 25 + 25 + 12.5, name: '409', limit: 60 },
      { x: 1099 - 60.5 - 50, name: '411', limit: 60, },
      { x: 1099 - 60.5 + 12.5 + 7.5, name: '413', limit: 60, },
      { x: 1099 + 2 - 12.5 + 7.5, name: '413а', limit: 60, point: true },
      { x: 1099 + 2 + 62.5 + 12.5 - 12.5, name: '415', limit: 40 },
      { x: 1099 + 2 + 62.5 + 12.5 + 37.5 - 12.5, name: '417', limit: 40, point: true },
      { x: 1099 + 2 + 62.5 + 62.5 + 12.5 + 12.5 - 12.5, name: '419', limit: 0, point: true },
      { x: 1099 + 2 + 62.5 + 75 + 37.5 + 12.5 - 12.5, name: '501', limit: 0, point: true },
      { x: 1099 + 2 + 62.5 + 75 + 50 + 37.5, name: '501а', limit: 0, point: true },
      { x: 1099 + 2 + 62.5 + 75 + 37.5 + 62.5 + 62.5 + 12.5, name: '519', limit: 0 },
    ],
    signals: [
      { joint: '315', name: 'КС401', lenses: 'WYY-GRw', autostop: 1, guard: 60, y: '401в', g: 'NEXT_y' },
      { joint: '401б', name: 'КС403', lenses: 'yYYY-GRw', autostop: 1, guard: 60, y: '403б', g: 'NEXT_y' },
      { joint: '403', name: 'КС405', lenses: 'YYRGw', autostop: 1, guard: 60, y: '405', g: 'NEXT_y', shift: 2.5 },
      { joint: '403а', name: 'МТ407', lenses: 'YYRGw', autostop: 1, guard: 60, service: 25, y: '407', yg: 'NEXT_y', g: 'NEXT_yg', shift: 2.5 },
      { joint: '403б', name: 'МТ409', lenses: 'YYRGw', autostop: 1, guard: 60, service: 25, y: '409', yg: 'NEXT_y', g: 'NEXT_yg', shift: 2.5 },
      { joint: '405', name: 'MT411', lenses: 'YYRGw', autostop: 1, guard: 60, service: 25, y: '411', yg: 'NEXT_y', g: 'NEXT_yg', shift: 11 },
      { joint: '407', name: 'MT413', lenses: 'YYRGw', autostop: 1, guard: 60, service: 25, y: '413а', yg: 'NEXT_y', g: 'NEXT_yg', shift: 19.5 },
      { joint: '409', name: 'MT415', lenses: 'YYRGw', autostop: 1, guard: 60, service: 25, y: '415', yg: 'NEXT_y', g: 'NEXT_g', shift: 17 },
      { joint: '411', name: 'MT417', lenses: 'YYRGw', autostop: 1, guard: 60, service: 25, y: '417', g: 'NEXT_yg', shift: 14.5 },
      { joint: '413', name: '419', lenses: 'YY-RG', autostop: 1, guard: 60, yg: '419', shift: 10 },
      { joint: '415', name: '501М', lenses: 'X', guard: 35 },
    ],
    switches: [
			{ x: 87.5, name: '1', left: true, trailing: false },
			{ x: 87.5 + 39, name: '83', left: true, trailing: true },
			{ x: 84 + 50 + 215 - 10.5 + 10, name: '5', left: false, trailing: false },
			{ x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 - 62.5 - 87.5 - 12.5 + 38, name: '9', left: false, trailing: true },
			{ x: 1099 - 60.5 - 100 - 87.5 - 62.5 - 62.5 - 62.5 - 87.5 - 12.5 + 38, name: '7', left: true, trailing: false },
			{ x: 1099 - 63, name: '1', left: true, trailing: true },
		],
  },
  {
    name: 'Проспект Метростроителей',
    // trackLength: 1102,
    arsDrawBreakpoint: 9,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
      0: 'H',
      180: '0',
      1939: 'T',
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
      { x: 2 - 12.5 + 7.5, name: '413а', limit: 60, point: true },
      { x: 2 + 62.5 + 12.5 - 12.5, name: '415', limit: 60 },
      { x: 2 + 62.5 + 12.5 + 37.5 - 12.5, name: '417', limit: 60, point: true },
      { x: 2 + 62.5 + 62.5 + 12.5 + 12.5 - 12.5, name: '419', limit: 60, point: true },
      { x: 2 + 62.5 + 75 + 37.5 + 12.5 - 12.5, name: '501', limit: 60, point: true },
      { x: 2 + 62.5 + 75 + 50 + 37.5, name: '501а', limit: 60, point: true },
      { x: 2 + 62.5 + 75 + 37.5 + 62.5 + 62.5 + 12.5, name: '501б', limit: 60, point: true },

      // { x: 2030 - 1659, name: '1', limit: 70, },

      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100 - 100 - 137.5 - 137.5 - 100 - 100 - 100 - 100 - 100 - 100, name: '501в', limit: 80 },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100 - 100 - 137.5 - 137.5 - 100 - 100 - 100 - 100 - 100, name: '501г', limit: 80, point: true },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100 - 100 - 137.5 - 137.5 - 100 - 100 - 100 - 100, name: '501д', limit: 80, point: true },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100 - 100 - 137.5 - 137.5 - 100 - 100 - 100, name: '503', limit: 80 },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100 - 100 - 137.5 - 137.5 - 100 - 100, name: '503а', limit: 80, point: true },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100 - 100 - 137.5 - 137.5 - 100, name: '503б', limit: 80, point: true },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100 - 100 - 137.5 - 137.5, name: '505', limit: 80 },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100 - 100 - 137.5, name: '505а', limit: 80, point: true },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100 - 100, name: '507', limit: 80 },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100 - 100, name: '507а', limit: 80, point: true },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5 - 100, name: '507б', limit: 70, point: true },
      { x: 2030 - 62.5 - 75 - 75 - 112.5 - 112.5, name: '509', limit: 70, },
      { x: 2030 - 62.5 - 75 - 75 - 112.5, name: '509а', limit: 70, },
      { x: 2030 - 62.5 - 75 - 75, name: '511', limit: 70, },
      { x: 2030 - 62.5 - 75, name: '513', limit: 70, },
      { x: 2030 - 62.5, name: '515', limit: 70, },
      { x: 2030, name: '517', limit: 60, point: true },
      { x: 2030 + 62.5, name: '519', limit: 60, },
      { x: 2030 + 62.5 + 62.5, name: '601', limit: 0 },
      { x: 2030 + 62.5 + 62.5 + 75, name: '601а', limit: 0 },
      { x: 2030 + 62.5 + 62.5 + 75 + 100, name: '601б', limit: 0, },
    ],
    signals: [
      { joint: '415', name: '501М', lenses: 'YYGR', autostop: 1, guard: 80, service: 80, y: '501д', g: 'NEXT_y' },
      { joint: '501в', name: '503', lenses: 'YYGR', autostop: 1, guard: 80, service: 80, y: '503б', g: 'NEXT_y' },
      { joint: '503', name: '505', lenses: 'YYGR', autostop: 1, guard: 80, service: 80, y: '505а', g: 'NEXT_y' },
      { joint: '505', name: '507', lenses: 'YYGR', autostop: 1, guard: 80, service: 80, y: '507б', g: 'NEXT_y' },
      { joint: '507', name: '509', lenses: 'YYGR', autostop: 1, guard: 80, service: 80, y: '509а', yg: 'NEXT_y', g: 'NEXT_yg' },
      { joint: '509', name: '511М', lenses: 'YYGR', autostop: 1, guard: 80, service: 35, y: '511', yg: 'NEXT_y', g: 'NEXT_yg' },
      { joint: '509а', name: '513', lenses: 'YYGR', autostop: 1, guard: 72, service: 35, y: '513', yg: 'NEXT_y', g: 'NEXT_yg' },
      { joint: '511', name: '515', lenses: 'YYGR', autostop: 1, guard: 66, service: 35, y: '515', yg: 'NEXT_y', g: 'NEXT_g' },
      { joint: '513', name: '517', lenses: 'YYGR', autostop: 1, guard: 63, service: 35, y: '517', g: 'NEXT_yg' },
      { joint: '515', name: '519', lenses: 'YYGR', autostop: 1, guard: 60, yg: '519' },
      { joint: '519', name: '601', lenses: 'X', guard: 35 },
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