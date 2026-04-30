const res = await fetch('https://serpapi.com/search.json?q=iphone+15&api_key=KEY')
const data = await res.json()

const results = data.organic_results

const titles = results.map(r => r.title.toLowerCase())

if (titles.some(t => t.includes('buy') || t.includes('price'))) {
    intent = 'transactional'
} else if (titles.some(t => t.includes('review') || t.includes('best'))) {
    intent = 'commercial'
} else {
    intent = 'informational'
}
