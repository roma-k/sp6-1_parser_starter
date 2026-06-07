// @todo: напишите здесь код парсера


function parsePage() {
    const lang = document.documentElement.lang || '';
    const [title, trash] = document.title.trim().split('—'),
    keywords = document.querySelector('meta[name="keywords"]')?.content.split(',').map(item => item.trim()) || [],
    description = document.querySelector('meta[name="description"]')?.content || '';


    function ogTag(proprty) {
           return document.querySelector(`meta[property="${proprty}"]`)?.content || '';
    }


    return {
        meta: {
            lang: document.documentElement.lang || 'NO',
            title: title.trim(),
            keywords: keywords,
            description: description.trim(),
            openGraph: {
                title: ogTag('og:title'),
                image: ogTag('og:image'),
                type: ogTag('og:type'),
            }
        },
        product: {},
        suggested: [],
        reviews: []
    };
}

window.parsePage = parsePage;