import { setup, $fetch, createPage, url } from '@nuxt/test-utils/e2e';
import { test, expect, describe } from 'vitest';

describe('app,', async () => {
	await setup();

	test('contains Welcome text with playwright', async () => {
		const page = await createPage();
		await page.goto(url('/'), { waitUntil: 'hydration' });
		const text = await page.textContent('p');
		expect(text).toContain('Cassowary is a planner for Wuthering Waves');
	});
});
