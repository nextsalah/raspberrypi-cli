import clock from '$lib/assets/svgs/clock.svg';
import setting from '$lib/assets/svgs/settings.svg';
import theme from '$lib/assets/svgs/theme.svg';

export const navigation = {
	items: [
		{
			slug: 'prayertimes',
			title: 'Prayertimes',
			descrtiption: 'Change the current prayertimes',
            icon : clock,
		},
		{
			slug: 'settings',
			title: 'Settings',
			descrtiption: 'Change general settings',
            icon : setting,
		},
		{
			slug: 'theme',
			title: 'Theme',
			descrtiption: 'Edit the apperance of the screen',
            icon : theme,
		}
	]
};
