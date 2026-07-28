export async function disablingAds(page) {
    await page.route('**/*', (route) => {
        const url = route.request().url();
        const blocklist = [
            'google-analytics.com',
            'googletagmanager.com',
            'doubleclick.net',
            'facebook.com',
            'hotjar.com'
        ];

        if (blocklist.some(domain => url.includes(domain))) {
            return route.abort();
        }
        return route.continue();
    });
}