import hourglass from '$lib/assets/svgs/hourglass.svg';
import setting from '$lib/assets/svgs/settings.svg';
import theme from '$lib/assets/svgs/theme.svg';

export const navigation = {
	items: [
		{
			slug: 'prayertimes',
			title: 'Prayer Times',
			descrtiption: 'Change the prayertime source.',
            icon : hourglass,
		},
		{
			slug: 'settings',
			title: 'Settings',
			descrtiption: 'Change the general settings.',
            icon : setting,
		},
		{
			slug: 'theme',
			title: 'Theme',
			descrtiption: 'Edit the apperance of the screen.',
            icon : theme,
		}
	]
};
