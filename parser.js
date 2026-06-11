// @todo: напишите здесь код парсера


function parsePage() {

// ====== КУЧА ПЕРЕМЕННЫХ, КОТОРЫЕ НУЖНО ВЫТАЩИТЬ ИЗ ДОКУМЕНТА ======

    const lang = document.documentElement.lang || '';
    const [title, trash] = document.title.trim().split('—'),
        keywords = document.querySelector('meta[name="keywords"]')?.content.split(',').map(item => item.trim()) || [],
        description = document.querySelector('meta[name="description"]')?.content || '',
        productId = document.querySelector('.product').dataset.id.trim() || '',
        prodName = document.querySelector('h1.title').textContent.trim() || '',
        isLiked = document.querySelector('.like').classList.contains('active') || false;
        prodPrice = parseInt(document.querySelector('.price').firstChild.textContent.trim().replace(/\D/g, '')) || '',
        prodOldPrice = parseInt(document.querySelector('.price').firstElementChild.textContent.trim().replace(/\D/g, '')) || '',
        discountPercent = prodOldPrice && prodPrice ? ((prodOldPrice - prodPrice) / prodOldPrice * 100).toFixed(2) + '%' : '0%',
        prodPropertiesNodeList = document.querySelectorAll('.properties li'),
        prodDescription = document.querySelector('.description').innerHTML.trim() || '',
        prevImgNodeList = document.querySelectorAll('nav img');
        
        
   
// ====== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

    function ogTag(proprty) {
        return document.querySelector(`meta[property="${proprty}"]`)?.content.trim() || '';
    }

    function currency (price) { 
            switch (price) {
                case '₽':
                    return 'RUB';
                case '$':
                    return 'USD';
                case '€':
                    return 'EUR';
                default:
                    return '';
            }
        }

    function getObjFromNodeList(nodeList) {
        const prodProperties = {};
        nodeList.forEach(item => {
            prodProperties[item.firstElementChild.textContent.trim()] = item.lastElementChild.textContent.trim();
        });
        return prodProperties
    }

    function getImagesFromNodeList(nodeList) {
        const images = [];
        [...nodeList].map(item => {
            images.push({
                preview: item.src.trim(),
                full : item.dataset.src.trim(),
                alt : item.alt.trim(),
            })
        })
        return images
    }

    return {
        meta: {
            lang: lang || '',
            title: title.trim(),
            keywords: keywords,
            description: description.trim(),
            openGraph: {
                title: ogTag('og:title'),
                image: ogTag('og:image'),
                type: ogTag('og:type'),
            }
        },
        product: {
            id: productId,
            name: prodName,
            isLiked: isLiked,
            //todo ДОБАВИТЬ ТЕГИ ИЗ КАРТОЧКИ
            price: prodPrice,
            oldPrice: prodOldPrice,
            discount: prodOldPrice && prodPrice ? prodOldPrice - prodPrice : 0,
            discountPercent: discountPercent,
            currency : currency(document.querySelector('.price').firstChild.textContent.trim()[0]),
            properties : getObjFromNodeList(prodPropertiesNodeList),
            description : prodDescription,
            images : getImagesFromNodeList(prevImgNodeList),
        },
        suggested: [],
        reviews: []
    };
}

window.parsePage = parsePage;




// {
//   "meta": {
//     "title": "About Vite",
//     "description": "Explore Vite - A modern development tool for faster and efficient web applications. Learn about features, suggested products, and reviews.",
//     "keywords": [
//       "Vite",
//       " modern development tool",
//       " web development",
//       " UI design",
//       " UX design",
//       " prototyping",
//       " reviews"
//     ],
//     "language": "en",
//     "opengraph": {
//       "title": "About Vite",
//       "image": "./assets/logo.svg",
//       "type": "website"
//     }
//   },
//   "product": {
//     "id": "product1",
//     "name": "About Vite",
//     "isLiked": false,
//     "tags": {
//       "category": [
//         "tag1"
//       ],
//       "discount": [
//         "tag3"
//       ],
//       "label": [
//         "tag2"
//       ]
//     },
// \\    "price": 50,
// \\    "oldPrice": 80,
// \\    "discount": 30,
// \\    "discountPercent": "37.50%",
// \\    "currency": "RUB",
// \\     "properties": {
// ..    "key1": "value1",
// ..    "key2": "value2",
// ..    "key3": "value3"
//     },
// \\  "description": "<h3>Title</h3>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>\n                <p>Answer the freaquently asked question in a simple sentence, a longish paragraph, or even in a list.</p>",
// \\  "images": [
//       {
//         "preview": "https://placehold.co/92x66?text=1",
//         "full": "https://placehold.co/600?text=1",
//         "alt": "slide1"
//       },
//       {
//         "preview": "https://placehold.co/92x66?text=2",
//         "full": "https://placehold.co/600?text=2",
//         "alt": "slide2"
//       },
//       {
//         "preview": "https://placehold.co/92x66?text=3",
//         "full": "https://placehold.co/600?text=3",
//         "alt": "slide3"
//       },
//       {
//         "preview": "https://placehold.co/92x66?text=4",
//         "full": "https://placehold.co/600?text=4",
//         "alt": "slide4"
//       },
//       {
//         "preview": "https://placehold.co/92x66?text=5",
//         "full": "https://placehold.co/600?text=5",
//         "alt": "slide5"
//       }
//     ]
//   },
// \\"suggested": [
//     {
//       "name": "test title",
//       "description": "desc about product",
//       "image": "https://placehold.co/240x300?text=A",
//       "price": "34123",
//       "currency": "RUB"
//     },
//     {
//       "name": "test title",
//       "description": "desc about product",
//       "image": "https://placehold.co/240x300?text=A",
//       "price": "34123",
//       "currency": "RUB"
//     },
//     {
//       "name": "test title",
//       "description": "desc about product",
//       "image": "https://placehold.co/240x300?text=A",
//       "price": "34123",
//       "currency": "RUB"
//     },
//     {
//       "name": "test title",
//       "description": "desc about product",
//       "image": "https://placehold.co/240x300?text=A",
//       "price": "34123",
//       "currency": "RUB"
//     }
//   ],
//   "reviews": [
//     {
//       "rating": 2,
//       "author": {
//         "avatar": "https://placehold.co/48/424242/white.svg?text=1",
//         "name": "author"
//       },
//       "title": "title",
//       "description": "desc",
//       "date": "date"
//     },
//     {
//       "rating": 4,
//       "author": {
//         "avatar": "https://placehold.co/48/424242/white.svg?text=1",
//         "name": "author"
//       },
//       "title": "title",
//       "description": "desc",
//       "date": "date"
//     },
//     {
//       "rating": 3,
//       "author": {
//         "avatar": "https://placehold.co/48/424242/white.svg?text=1",
//         "name": "author"
//       },
//       "title": "title",
//       "description": "desc",
//       "date": "date"
//     }
//   ]
// } 