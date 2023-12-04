
const relativeTimeframes = {
	year: {
		regex: /\d+\s?(year(s)?|y)/i,
		scale: 31_536_000
	},
	month: {
		regex: /\d+\s?(mon(th(s)?)?)/i,
		scale: 2_592_000
	},
	week: {
		regex:  /\d+\s?(week(s)?|w)/i,
		scale: 604_800
	},
	day: {
		regex: /\d+\s?(day(s)?|d)/i,
		scale: 86_400
	},
	hour: {
		regex: /\d+\s?(h(ou)?r(s)?|h)/i,
		scale: 3_600
	},
	minute: {
		regex: /\d+\s?(min(ute)?(s)?|m)/i,
		scale: 60
	},
	second: {
		regex: /\d+\s?(sec(onds)?|s)/i,
		scale: 1
	},
};

export class RelativeTime {
	
	_timestring: string;

	constructor(timestring: string) {
		this._timestring = timestring;
	}

	toEpoch() {

		let result = 0;
		let gotMatch = false;
	
		for (const frameid in relativeTimeframes) {
	
			const framectx = relativeTimeframes[frameid as keyof typeof relativeTimeframes];
	
			const expr = this._timestring.match(framectx.regex);
			if (!expr?.[0]) continue;
	
			const numeric = expr[0].match(/^\d+/)?.[0];
			if (!numeric) continue;
	
			const number = parseInt(numeric);
			if (isNaN(number)) continue;
	
			result += number * framectx.scale;
			gotMatch = true;
		}

		if (!gotMatch) throw new Error('Could not convert human readable time to epoch');
	
		return this._timestring.toLowerCase().endsWith('ago') ? (result * -1) : result;
	}

	toTime() {
		return this.toEpoch() * 1000;
	}
}
