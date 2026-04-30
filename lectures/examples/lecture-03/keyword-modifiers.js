const detectIntentByModifiers = (keyword) => {
    const kw = keyword.toLowerCase()

    const patterns = {
        informational: /як|що|чому|коли|де|хто|гід|інструкція|tutorial|приклад|пояснення/,
        navigational: /логін|вхід|сайт|офіційний|\.com|\.ua/,
        commercial: /найкращ|топ|огляд|відгук|порівня|vs|або|рекоменд/,
        transactional: /купи|замов|ціна|вартість|знижк|доставк|онлайн|магазин|придба/,
    }

    const matches = {}
    for (const [intent, pattern] of Object.entries(patterns)) {
        matches[intent] = pattern.test(kw)
    }

    return matches
}

// Приклад
console.log(detectIntentByModifiers("як вибрати ноутбук"))
// { informational: true, navigational: false, commercial: false, transactional: false }

console.log(detectIntentByModifiers("купити ноутбук київ доставка"))
// { informational: false, navigational: false, commercial: false, transactional: true }
