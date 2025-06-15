import spacy

nlp = spacy.load("en_core_web_sm")

# Predefined set of known categories
KNOWN_CATEGORIES = {"laptop", "phone", "headphone", "watch", "tv"}

def extract_keywords(text):
    doc = nlp(text.lower())

    product = None
    category = None
    brand = None
    color = None
    price = None

    for token in doc:
        if token.text in KNOWN_CATEGORIES and not category:
            category = token.text

        if token.pos_ == "NOUN" and not product:
            product = token.text

        if token.ent_type_ == "ORG" and not brand:
            brand = token.text

        if token.pos_ == "ADJ" and not color:
            color = token.text

        if token.like_num and not price:
            price = token.text

    return {
        "product": product,
        "category": category,
        "brand": brand,
        "color": color,
        "price": price
    }
