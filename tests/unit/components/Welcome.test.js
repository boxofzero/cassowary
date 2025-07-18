import { mountSuspended } from '@nuxt/test-utils/runtime';
import { it, expect, describe } from 'vitest';
import Welcome from '~/components/home/Welcome.vue';

describe('Welcome', () => {
	it('display Welcome component and content', async () => {
		const component = await mountSuspended(Welcome);
		expect(component.html()).toContain(
			'Cassowary is a planner for Wuthering Waves'
		);
	});
});
