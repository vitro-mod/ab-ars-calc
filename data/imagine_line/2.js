var lines = lines || {};
lines['imagine_line'] = lines['imagine_line'] || {};
lines['imagine_line']['2'] = [
  {
    name: 'Проспект Энергетиков"',
    arsDrawBreakpoint: 6,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
      0: 'H',
    },
    // joints: [
    // ],
    // signals: [
    // ],
  },
  {
    name: 'Северная',
    arsDrawBreakpoint: 6,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
      0: 'H',
    },
    // joints: [
    // ],
    // signals: [
    // ],
  },
  {
    name: 'Инженерная',
    arsDrawBreakpoint: 6,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
      0: 'H',
    },
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
      0: 'H',
    },
    // joints: [
    // ],
    // signals: [
    // ],
  },
  {
    name: 'Россошанская',
    arsDrawBreakpoint: 6,
    arsAllSteps: true,
    tStay: 25,
    K: 1,
    modes: {
      0: 'H',
    },
    // joints: [
    // ],
    // signals: [
    // ],
  },
  {
    name: 'Проспект Метростроителей',
    arsDrawBreakpoint: 1,
    arsAllSteps: true,
    tStay: 0,
    K: 1.5,
    modes: {
      0: 'H',
      210: '0',
      1101: 'T',
    },
    joints: [
      { x: 0 - 1, name: '580', limit: 60, },
      { x: 61.5, name: '412', limit: 60, },
      { x: 61.5 + 62.5, name: '414', limit: 60, },
      { x: 61.5 + 62.5 + 75, name: '416', limit: 60, point: true },
      { x: 1132 - 84 - 50 - 75 - 75 - 75 - 100 - 112.5 - 87.5 - 100 - 100, name: '458', limit: 60, },
      { x: 1132 - 84 - 50 - 75 - 75 - 75 - 100 - 112.5 - 87.5 - 100, name: '460', limit: 60, },
      { x: 1132 - 84 - 50 - 75 - 75 - 75 - 100 - 112.5 - 87.5, name: '462', limit: 60, },
      { x: 1132 - 84 - 50 - 100 - 100 - 100 - 100, name: '464', limit: 60, },
      { x: 1132 - 84 - 50 - 100 - 100 - 100, name: '466', limit: 60, },
      { x: 1132 - 84 - 50 - 100 - 100, name: '468', limit: 60 },
      { x: 1132 - 84 - 50 - 100, name: '472', limit: 60, },
      { x: 1132 - 84 - 50, name: '474', limit: 40, },
      { x: 1132 - 84, name: '476', limit: 40, },
      { x: 1132 - 84 + 50, name: '478', limit: 40, point: true },
      { x: 1132 - 84 + 50 + 50, name: '480', limit: 40, point: true },
      { x: 1132 - 84 + 150, name: '474з', limit: 40, },
    //   { x: 1132 - 84 + 150 + 12.5, name: '474з', limit: 0, },
      { x: 1132 - 84 + 150 + 61.5, name: '402', limit: 0 },
    ],
    signals: [
      { joint: '412', name: 'MT402', lenses: 'WGY-Rw', autostop: 1, guard: 60, y: '460', g: 'NEXT_y' },
      { joint: '458', name: 'MT404', lenses: 'GYRw', autostop: 1, guard: 60, y: '464', g: 'NEXT_y' },
      { joint: '462', name: 'MT406', lenses: 'YGY-Rw', autostop: 1, guard: 60, y: '468', g: 'NEXT_y' },
      { joint: '464', name: '408', lenses: 'YGR', autostop: 1, guard: 60, service: 60, y: '472', g: 'NEXT_yg' },
      { joint: '468', name: 'КС412', lenses: 'YYGRw', autostop: 1, guard: 60, yg: 'NEXT_y' },
      // { joint: '468', name: 'КС474', lenses: 'GRw', autostop: 1, guard: 60, g: 'NEXT_g' },
      // { joint: '470', name: 'КС476', lenses: 'GRw', autostop: 1, guard: 60, g: 'NEXT_yg' },
      // { joint: '472', name: 'КС412', lenses: 'GRYw', autostop: 1, guard: 60, yg: 'NEXT_y' },
      { joint: '474', name: 'КС414', lenses: 'YYR-Yw', autostop: 4, guard: 60, y: '474з' },
    ],
  },
  {
    name: 'Касторская',
    arsDrawBreakpoint: 9,
    arsAllSteps: true,
    tStay: 25,
    K: 1.5,
    modes: {
      0: 'H',
      43: '0',
    },
    joints: [
       { x: 0 - 1, name: '580', limit: 60, },
    ],
    signals: [
    ],
  },
]