var lines = lines || {};
lines['novosib2'] = lines['novosib2'] || {};
lines['novosib2']['1'] = [
  {
    name: 'Золотая Нива',
    trackLength: 1740,
    arsDrawBreakpoint: 7,
    arsAllSteps: true,
    tStay: 30,
    K: 1,
	curves: {
		0: 0,
		95: 80,
		221: 0,
		394: 160,
		648: 0,
		861: 162,
		1115: 0,
		1309: 160,
		1563: 0,
	},
	slopes: {
		0: 0,
		649: 19,
		863: 0,
		1115: 26,
		1309: 0,
		1563: 17,
		1672: 0,
	},
	modes: {
		0: 'H',
		500: '0',
		1000: 'H',
		1155: '0',
		1657: 'T',
	},
  joints: [
    { x: 0, name: '279' },
    { x: 62.5, name: '311', limit: 60 },
    { x: 62.5 + 62.5, name: '313', limit: 70, later: { 40: 1 } },
    { x: 62.5 + 62.5 + 62.5, name: '315' },
    { x: 258, name: '317' },
    { x: 258 + 90, name: '319' },
    { x: 258 + 90 + 1387.5 - 62.5 - 87.5 - 87.5 - 150 - 175 - 275 - 275, name: '365' },
    { x: 258 + 90 + 1387.5 - 62.5 - 87.5 - 87.5 - 150 - 175 - 275, name: '367', later: { 80: 3 } },
    { x: 258 + 90 + 1387.5 - 62.5 - 87.5 - 87.5 - 150 - 175, name: '369', later: { 70: 2 } },
    { x: 258 + 90 + 1387.5 - 62.5 - 87.5 - 87.5 - 150, name: '371', later: { 60: 1, 80: 2 } },
    { x: 258 + 90 + 1387.5 - 62.5 - 87.5 - 87.5, name: '373', later: { 70: 1 } },
    { x: 258 + 90 + 1387.5 - 62.5 - 87.5, name: '375', limit: 70 },
    { x: 258 + 90 + 1387.5 - 62.5, name: '377', limit: 70 },
    { x: 258 + 90 + 1387.5, name: '379', limit: 60 },
    { x: 258 + 90 + 1387.5 + 62.5, name: '411', limit: 60 },
    { x: 258 + 90 + 1387.5 + 62.5 + 62.5, name: '413', limit: 0 },
    { x: 258 + 90 + 1387.5 + 62.5 + 62.5 + 62.5, name: '415', limit: 0 },
    { x: 258 + 90 + 1387.5 + 62.5 + 62.5 + 62.5 + 100, name: '415', limit: 0 },
  ],
  signals: [
    { joint: '311', name: 'ЗН-311', lenses: 'BYG-Rw' },
    { joint: '317', name: 'ЗН-321', lenses: 'WBY-GRw', left: true },
    { joint: '373', name: 'БР-361', lenses: 'BYG-Rw', left: true },
    { joint: '411', name: 'БР-411м', lenses: 'WBY-YYG-Rw' },
  ],
  },
  {
    name: 'Березовая роща',
    trackLength: 1120,
    arsDrawBreakpoint: 9,
    arsAllSteps: true,
    tStay: 30,
    K: 1,
    curves: {
		0: 0,
		140: 80,
		266: 0,
		325: 132,
		428: 0,
		732: -300,
		772: 0,
		837: -87,
		1029: 0,
    },
    slopes: {
		0: 0,
		430: 24,
		578: 30,
		733: 20,
		818: 6,
		967: 9,
		1049: 0,
    },
    modes: {
		0: 'H',
		115: '0',
		350: 'H',
		685: '0',
		1039: 'T',
    },
    joints: [
    ],
    signals: [
    ],
  },
  {
    name: 'Маршала Покрышкина',
    trackLength: 1156,
    arsAllSteps: true,
    arsDrawBreakpoint: 8,
    tStay: 30,
    K: 1,
    curves: {
		0: 0,
		116: -160,
		370: 0,
		716: -80,
		843: 0,
    },
    slopes: {
		0: 0,
		194: 3,
		484: 4, 
		539: 2,
		608: 4,
		708: 17,
		909: 32,
    },
    modes: {
		0: 'H',
		175: '0',
		775: 'H',
		940: '0',
		1102: 'T',
    },
    joints: [
    ],
    signals: [
    ],
  },
  {
    name: 'Сибирская',
    trackLength: 1617,
    arsAllSteps: true,
    arsDrawBreakpoint: 12,
    tStay: 30,
    K: 1,
    curves: {
		0: 0,
		78: -85,
		210: 0,
		550: -160,
		803: 0,
		1103: -85,
		1233: 0,
		1271: -144,
		1291: 0,
		1401: 144,
		1421: 0,
    },
    slopes: {
		0: 0,
		68: 3,
		150: -5,
		211: 0,
		550: 4,
		803: 0,
		823: 4,
		979: 0,
		1086: 8,
		1232: 0,
		1307: -4,
		1378: -12,
		1463: 0,
    },
    modes: {
		0: 'H',
		300: '0',
		680: 'H',
		740: '0',
		1200: 'H',
		1250: '0',
		1504: 'T',
		
    },
    joints: [
    ],
    signals: [
    ],
  },
  {
    name: 'Пл. Гарина-Михайловского',
    trackLength: 81,
    arsAllSteps: true,
    arsDrawBreakpoint: 8,
    tStay: 30,
    K: 1,
    curves: {
		0: 0,
    },
    slopes: {
		0: 0,
    },
    modes: {
    },
    joints: [
    ],
    signals: [
    ],
  },
]