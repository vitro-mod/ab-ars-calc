let spSch = {
  name: 'Спартак',
  trackLength: 2267,
  tStay: 25,
  curves: {
    0: 0,
    189: -500,
    457: 0,
    611: -500,
    871: 0,
    1307: 600,
    1393: 0,
    1498: -600,
    1641: 0,
    1828: 500,
    2131: 0
  },
  slopes: {
    0: -3,
    148: -3,
    624: -25,
    944: 3,
    1178: 40,
    1997: 3
  },
  modes: {
    0: 'H',
    203: '0',
    661: 'P',
    944: '0',
    1165: 'H',
    1972: '0',
    2148: 'T',
  },
  joints: [
    { x: 89, name: '449с', limit: 40 },
    { x: 152, name: '445' },
    { x: 215, name: '445а', point: true },
    { x: 276, name: '445б', point: true },
    { x: 351, name: '445в', point: true },
    { x: 451, name: '445г' },
    { x: 551, name: '445д', point: true },
    { x: 651, name: '445е' },
    { x: 751, name: '441', point: true },
    { x: 851, name: '441а' },
    { x: 951, name: '439', point: true },
    { x: 1051, name: '439а' },
    { x: 1190, name: '439б', point: true },
    { x: 1326, name: '437' },
    { x: 1438, name: '437а', point: true },
    { x: 1550, name: '435' },
    { x: 1687.5, name: '435а', point: true },
    { x: 1825, name: '433' },
    { x: 1900, name: '433а', point: true },
    { x: 1975, name: '431' },
    { x: 2051, name: '431а' },
    { x: 2112, name: '429', limit: 80 },
    { x: 2174.5, name: '427', limit: 80 },
    { x: 2237.5, name: '425', point: true, limit: 60 },
    { x: 2300, name: '423', point: true, limit: 60 },
    { x: 2362.5, name: '423с', vks: 'min', limit: 40 },
    { x: 2425, name: '421', limit: 0 },
    { x: 2487.5, name: '421а', limit: 0 },
    { x: 2737.5, name: '419', limit: 0 },
  ],
  signals: [
    { x: 89, name: '445М', lenses: 'YYGR', autostop: 3, y: '445е', g: 'NEXT_y', guard: 35 },
    { x: 451, name: '441', lenses: 'YYGR', autostop: 3, y: '441а', g: 'NEXT_y', guard: 80 },
    { x: 651, name: '439', lenses: 'YYGR', autostop: 3, y: '439б', g: 'NEXT_y', guard: 80 },
    { x: 1051, name: '437', lenses: 'YYGR', autostop: 3, y: '437а', g: 'NEXT_y', guard: 80 },
    { x: 1326, name: '435', lenses: 'YYGR', autostop: 3, y: '435а', g: 'NEXT_y', guard: 80 },
    { x: 1550, name: '433М', lenses: 'YYGR', autostop: 3, y: '433а', g: 'NEXT_y', guard: 80 },
    { x: 1825, name: '431', lenses: 'YYGR', autostop: 3, y: '431а', g: 'NEXT_y', guard: 80, shift: 20 },
    { x: 1975, name: '429М', lenses: 'YYGR', autostop: 1, left: true, y: '429', yg: 'NEXT_y', g: 'NEXT_yg', guard: 75, shift: 20 },
    { x: 2051, name: '427', lenses: 'YYGR', autostop: 1, left: true, y: '427', yg: 'NEXT_y', g: 'NEXT_g', guard: 65, shift: 20 },
    { x: 2112, name: '425', lenses: 'YYGR', autostop: 1, left: true, y: '425', g: 'NEXT_yg', guard: 65, shift: 20 },
    { x: 2174.5, name: '423', lenses: 'YYGR', autostop: 1, left: true, yg: '423с', guard: 65, shift: 20 },
    { x: 2362.5, name: '421', lenses: 'x', autostop: 3, guard: 35 },
  ],
}

let schOp = {
  name: 'Щукинская',
  trackLength: 1000,
  tStay: 25,
  curves: {
    0: 0,
  },
  slopes: {
    0: 3,
  },
  modes: {
    0: 'H',
    304: '0',
  }
}