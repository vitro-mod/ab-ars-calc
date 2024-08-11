var lines = lines || {};
lines['novosib2'] = lines['novosib2'] || {};
lines['novosib2']['2'] = [
	{
		name: 'Пл. Гарина-Михайловского',
		trackLength: 1531,
		arsAllSteps: true,
		arsDrawBreakpoint: 8,
		tStay: 30,
		K: 1,
		curves: {
			0: 0,
			170: -144,
			190: 0,
			303: 144,
			323: 0,
			363: 85,
			491: 0,
			548: -144,
			568: 0,
			578: 144,
			598: 0,
			765: 170,
			1030: 0,
			1332: 70,
			1387: 90,
			1458: 0,
		},
		slopes: {
			0: 0,
			133: 7,
			246: 5,
			302: 0,
			361: -8,
			489: -2,
			526: 0,
			546: -4,
			604: -6,
			692: 0,
			762: -5,
			1015: 0,
			1310: 6,
			1392: -10,
			1455: 0,
		},
		modes: {
			0: 'H',
			46: '0',
			140: 'H',
			270: '0',
			1080: 'H',
			1160: '0',
			1433: 'T',
		},
		joints: [
			{ x: -3, name: '780', limit: 0 },
			{ x: 59.5, name: '612', limit: 60, later: { 60: 3 } },
			{ x: 134.5, name: '614', limit: 70, later: { 40: 1 } },
			{ x: 134.5 + 75, name: '616', limit: 70, later: { 40: 1 } },
			{ x: 1317.3 - 75 - 150 - 250 - 250 - 250, name: '618', later: { 70: 1 } },
			{ x: 1317.3 - 75 - 150 - 250 - 250, name: '666', later: { 80: 3 } },
			{ x: 1317.3 - 75 - 150 - 250, name: '668', later: { 70: 2 } },
			{ x: 1317.3 - 75 - 150, name: '670', later: { 60: 1, 80: 2 } },
			{ x: 1317.3 - 75, name: '672', later: { 70: 1 } },
			{ x: 1317.3, name: '674' },
			{ x: 0.4 + 1531 - 75 - 75, name: '676', limit: 70 },
			{ x: 0.4 + 1531 - 75, name: '678', limit: 70 },
			{ x: 0.4 + 1531 - 12.5, name: '680', limit: 60 },
			// { x: 0.4 + 1531, name: '680' },
			{ x: 0.4 + 1531 + 75 - 12.5, name: '512', limit: 40 },
			{ x: 0.4 + 1531 + 75 + 75 - 25, name: '514', limit: 0 },
			{ x: 0.4 + 1531 + 75 + 75 - 25 + 75, name: '516', limit: 0 },
			{ x: 0.4 + 1531 + 75 + 75 - 25 + 75 + 62.5, name: '518', limit: 0 },
		],
		signals: [
			{ joint: '612', name: 'ГМ-612м', lenses: 'WBY-GRw' },
			{ joint: '614', name: 'Вм', lenses: 'WB-Rw', left: true, back: true },
			{ joint: '668', name: '652', lenses: 'YGR' },
			{ joint: '512', name: '512м', lenses: 'YGR' },
			{ joint: '672', name: 'СБ-662', lenses: 'BYG-Rw' },
			{ joint: '678', name: 'Д', lenses: 'WB-Rw', left: true, back: true },
		],
		switches: [
			{ x: 134.5 - 7, name: '2', left: true, trailing: true },
			{ x: 1317.3 - 7, name: '2', left: true, trailing: true },
		],
	},
	{
		name: 'Сибирская',
		trackLength: 1093,
		arsDrawBreakpoint: 8,
		arsAllSteps: true,
		tStay: 30,
		K: 1,
		curves: {
			0: 0,
			292: 80,
			419: 0,
			741: 160,
			995: 0,
		},
		slopes: {
			0: 0,
			68: -31,
			292: -15,
			418: 0,
			464: -4,
			994: 0,
		},
		modes: {
			0: 'H',
			50: '0',
			760: 'H',
			800: '0',
			993: 'T',
		},
		joints: [
			{ x: 0.4 - 12.5, name: '680', limit: 40 },
			{ x: 0.4 + 75 - 12.5, name: '512', limit: 60, later: { 60: 2 } },
			{ x: 0.4 + 75 - 12.5 + 62.5, name: '514', limit: 70 },
			{ x: 0.4 + 75 - 12.5 + 62.5 + 75, name: '516', limit: 70 },
			{ x: 1093 + 69.9 - 75 - 75 - 87.5 - 87.5 - 175 - 175 - 225, name: '568', limit: 70 },
			{ x: 1093 + 69.9 - 75 - 75 - 87.5 - 87.5 - 175 - 175, name: '570', later: { 70: 2 } },
			{ x: 1093 + 69.9 - 75 - 75 - 87.5 - 87.5 - 175, name: '572', later: { 60: 1 } },
			{ x: 1093 + 69.9 - 75 - 75 - 87.5 - 87.5, name: '574' },
			{ x: 1093 + 69.9 - 75 - 75 - 87.5, name: '576', limit: 70 },
			{ x: 1093 + 69.9 - 75 - 75, name: '578', limit: 70 },
			{ x: 1093 + 69.9 - 75, name: '580', limit: 60 },
			{ x: 1093 + 69.9, name: '412', limit: 40 },
			{ x: 1093 + 69.9 + 75, name: '414', limit: 0 },
			{ x: 1093 + 69.9 + 75 + 75, name: '416', limit: 0 },
		],
		signals: [
			{ joint: '512', name: '512м', lenses: 'YGR' },
			{ joint: '412', name: '412', lenses: 'YGR' },
		],
	},
	{
		name: 'Маршала Покрышкина',
		trackLength: 1112,
		arsAllSteps: true,
		arsDrawBreakpoint: 9,
		tStay: 30,
		K: 1,
		curves: {
			0: 0,
			67: 87,
			257: 0,
			292: 277,
			330: 0,
			651: -132,
			747: 0,
			827: -80,
			956: 0,
		},
		slopes: {
			0: 0,
			67: -9,
			198: -3,
			257: -22,
			349: -30,
			481: -24,
			651: 0,
		},
		modes: {
			0: 'H',
			79: '0',
			640: 'T',
			655: '0',
			1032: 'T',
		},
		joints: [
			{ x: 69.9 - 75, name: '580' },
			{ x: 69.9, name: '412', limit: 60, later: { 60: 3 } },
			{ x: 69.9 + 75, name: '414', limit: 70, later: { 40: 1 } },
			{ x: 69.9 + 75 + 75, name: '416', limit: 70, later: { 40: 1 } },
			{ x: 977.2 - 7.3 - 75 - 125 - 150 - 250, name: '468', later: { 80: 2 } },
			{ x: 977.2 - 7.3 - 75 - 125 - 150, name: '470', later: { 70: 1 } },
			{ x: 977.2 - 7.3 - 75 - 125, name: '472' },
			{ x: 977.2 - 7.3 - 75, name: '474' },
			{ x: 977.2 - 7.3, name: '476' },
			// { x: 977.2, name: 'СРР №2' },
			{ x: -4.6 + 1112 - 75 + 12.5, name: '478', limit: 70 },
			{ x: -4.6 + 1112 + 12.5, name: '480', limit: 60 },
			{ x: -4.6 + 1112 + 12.5 + 75, name: '312', limit: 40 },
			{ x: -4.6 + 1112 + 12.5 + 75 + 75, name: '314', limit: 0 },
			{ x: -4.6 + 1112 + 12.5 + 75 + 75 + 75, name: '316', limit: 0 },
		],
		signals: [
			{ joint: '412', name: '412', lenses: 'YGR' },
			{ joint: '470', name: 'БР-452', lenses: 'BYG-Rw' },
			{ joint: '470', name: 'ОП2', lenses: 'R', row: 1, back: true },
			{ joint: '476', name: 'БР-462', lenses: 'WBYY-YGRw' },
			{ joint: '478', name: 'Д', lenses: 'BW-Rw', left: true, back: true },
			{ joint: '312', name: '312', lenses: 'YGR' },
		],
		switches: [
			{ x: 977.2 + 7, name: '2', left: true },
		],
	},
	{
		name: 'Березовая роща',
		trackLength: 1849,
		arsAllSteps: true,
		arsDrawBreakpoint: 8,
		tStay: 30,
		K: 1,
		curves: {
			0: 0,
			192: -160,
			446: 0,
			673: -160,
			927: 0,
			1179: -160,
			1433: 0,
			1628: -80,
			1754: 0,
		},
		slopes: {
			0: 0,
			448: -24,
			647: 0,
			928: -17,
			1162: 0,
		},
		modes: {
			0: 'H',
			140: '0',
			1380: 'T',
			1420: '0',
			1820: 'T',
		},
		joints: [
			{ x: -4.6 + 12.5, name: '480', limit: 0 },
			{ x: -4.6 + 12.5 + 75, name: '312', limit: 60, later: { 60: 3 } },
			{ x: -4.6 + 12.5 + 75 + 75, name: '314', limit: 70, later: { 40: 1 } },
			{ x: -4.6 + 12.5 + 75 + 75 + 75, name: '316', limit: 70, later: { 40: 1 } },
			{ x: 1482.9 - 150 - 150 - 275 - 275 - 275, name: '362', limit: 80 },
			{ x: 1482.9 - 150 - 150 - 275 - 275, name: '364', limit: 80 },
			{ x: 1482.9 - 150 - 150 - 275, name: '366', limit: 80 },
			{ x: 1482.9 - 150 - 150, name: '368', limit: 80, later: { 80: 2 } },
			{ x: 1482.9 - 150, name: '370', limit: 80, later: { 70: 2 } },
			{ x: 1482.9, name: '372', limit: 80 },
			{ x: 1845.4 - 75 - 75 - 75, name: '374', limit: 70 },
			{ x: 1845.4 - 75 - 75, name: '376', limit: 60 },
			{ x: 1845.4 - 75, name: '378', limit: 40 },
			{ x: 1845.4, name: '380', limit: 0 },
			{ x: 1845.4 + 75, name: '212', limit: 0 },
		],
		signals: [
			{ joint: '312', name: '312', lenses: 'YGR' },
			{ joint: '372', name: 'ЗН-352', lenses: 'WBYY-YzRw' },
			{ joint: '368', name: 'ЗН-342', lenses: 'BYGRw' },
			{ joint: '368', name: 'ОП2', lenses: 'R', row: 1, back: true },
		],
		switches: [
			{ x: 1482.9 + 7, name: '2', left: true },
		],
	},
	{
		name: 'Золотая Нива',
		trackLength: 64,
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