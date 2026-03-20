# Навчання ML-моделі для класифікації intent
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split

# Тренувальні дані (приклад)
data = pd.DataFrame({
    'keyword': [
        'як вибрати ноутбук',
        'купити ноутбук',
        'найкращий ноутбук',
        'facebook',
        # ... більше прикладів
    ],
    'intent': [
        'informational',
        'transactional',
        'commercial',
        'navigational',
        # ...
    ]
})

# Векторизація
vectorizer = TfidfVectorizer(ngram_range=(1, 2))
X = vectorizer.fit_transform(data['keyword'])
y = data['intent']

# Навчання
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = MultinomialNB()
model.fit(X_train, y_train)

# Accuracy
print(f"Accuracy: {model.score(X_test, y_test)}")


# Використання
def predict_intent(keyword):
    X_new = vectorizer.transform([keyword])
    return model.predict(X_new)[0]


print(predict_intent("ноутбук для студента відгуки"))
# Output: "commercial"
