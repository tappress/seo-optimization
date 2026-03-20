// Алгоритм визначення intent через SERP
const analyzeIntent = async (keyword) => {
    const serp = await getSERP(keyword)

    const signals = {
        informational: 0,
        navigational: 0,
        commercial: 0,
        transactional: 0,
    }

    // Аналізуємо TOP-10
    serp.organicResults.slice(0, 10).forEach(result => {
        const url = result.url.toLowerCase()
        const title = result.title.toLowerCase()

        // Informational signals
        if (url.includes('/blog/') || url.includes('/guide/') ||
            title.includes('як') || title.includes('що таке')) {
            signals.informational++
        }

        // Navigational signals
        if (result.position === 1 && result.sitelinks) {
            signals.navigational += 3
        }

        // Commercial signals
        if (title.includes('найкращ') || title.includes('топ') ||
            title.includes('огляд') || title.includes('порівняння')) {
            signals.commercial++
        }

        // Transactional signals
        if (url.includes('/product/') || url.includes('/buy/') ||
            title.includes('купити') || title.includes('ціна')) {
            signals.transactional++
        }
    })

    // Аналізуємо SERP Features
    if (serp.featuredSnippet) signals.informational += 2
    if (serp.peopleAlsoAsk) signals.informational += 1
    if (serp.shoppingAds) signals.transactional += 2
    if (serp.localPack) signals.transactional += 1

    // Визначаємо домінуючий intent
    const dominant = Object.keys(signals).reduce((a, b) =>
        signals[a] > signals[b] ? a : b,
    )

    return {
        primary: dominant,
        scores: signals,
        mixed: Object.values(signals).filter(v => v > 2).length > 1,
    }
}

// Приклад використання
const result = await analyzeIntent("ноутбук для програміста")
console.log(result)
// {
//   primary: "commercial",
//   scores: { informational: 3, commercial: 7, transactional: 2 },
//   mixed: true
// }
