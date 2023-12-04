import { RelativeTime } from "./mod.ts";

Deno.test(function test_1 () {
	const rt = new RelativeTime('2 days 1hr');
	if (rt.toEpoch() !== 176_400) throw new Error('Mismatch');
});

Deno.test(function test_2 () {
	const rt = new RelativeTime('2 days 1 hr');
	if (rt.toEpoch() !== 176_400) throw new Error('Mismatch');
});

Deno.test(function test_3 () {
	const rt = new RelativeTime('1 month');
	console.log(rt.toEpoch())
	if (rt.toEpoch() !== 2_768_400) throw new Error('Mismatch');
});