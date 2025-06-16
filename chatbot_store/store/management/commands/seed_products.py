from django.core.management.base import BaseCommand
from store.models import Category, Product
from faker import Faker
import random

class Command(BaseCommand):
    help = "Seed the database with mock electronics product data"

    def handle(self, *args, **kwargs):
        fake = Faker()

        catalog = {
            "Smartphones": [
                "iPhone 14", "iPhone 13", "Samsung Galaxy S23", "Galaxy A54", "Google Pixel 8", "Pixel 7a",
                "OnePlus 12", "OnePlus Nord CE 3", "Xiaomi Mi 13", "Redmi Note 12 Pro",
                "Motorola Edge 40", "Moto G73", "Realme GT Neo 5", "Realme Narzo 60", "Asus ROG Phone 7",
                "Vivo X100", "Vivo V29", "Oppo Reno10 Pro", "Lava Blaze 5G", "Infinix Zero 5G"
            ],
            "Laptops": [
                "MacBook Pro M2", "MacBook Air M2", "Dell XPS 13", "Dell Inspiron 16", "HP Spectre x360",
                "HP Envy x360", "Lenovo ThinkPad X1", "Lenovo Yoga Slim 7", "Asus ROG Zephyrus G14",
                "Asus Vivobook S15", "Acer Swift 5", "Acer Nitro 5", "Surface Laptop 5", "MSI Stealth 15M",
                "LG Gram 17", "Samsung Galaxy Book 3", "Honor MagicBook", "Infinix InBook X2"
            ],
            "Headphones": [
                "Sony WH-1000XM5", "Sony WH-CH720N", "AirPods Max", "AirPods Pro 2", "Bose QC 45",
                "Bose 700", "JBL Tune 760NC", "JBL Live 660NC", "Beats Studio Pro", "Beats Fit Pro",
                "Sennheiser Momentum 4", "Sennheiser HD 450BT", "Crusher Evo", "Anker Soundcore Q35",
                "Marshall Major IV", "Shure AONIC 50", "boAt Nirvana 751", "Noise Defy ANC"
            ],
            "Smartwatches": [
                "Apple Watch Series 9", "Apple Watch SE", "Galaxy Watch 6", "Galaxy Watch 5 Pro",
                "Garmin Venu 3", "Garmin Forerunner 265", "Fitbit Versa 4", "Fitbit Charge 6",
                "Amazfit GTR 4", "Amazfit Bip 5", "Fossil Gen 6", "Fossil Hybrid HR", "OnePlus Watch 2",
                "ColorFit Pro 4", "boAt Xtend Pro", "Fire-Boltt Quantum", "Noise ColorFit Icon 2"
            ],
            "TVs": [
                "Sony Bravia X80L", "Sony Bravia XR", "Samsung Crystal 4K", "Samsung Neo QLED",
                "LG OLED C3", "LG NanoCell 80", "TCL QLED 55C845", "TCL 4K HDR", "Mi 5X Smart TV",
                "Redmi Fire TV", "Vu GloLED", "Hisense U7H", "OnePlus TV Y1S Pro", "Motorola Revou 2",
                "Realme Smart TV 4K", "Nokia Smart TV", "Infinix X3", "Thomson Oath Pro Max"
            ]
        }

        total_created = 0

        for category_name, product_names in catalog.items():
            category, _ = Category.objects.get_or_create(name=category_name)

            for name in product_names:
                Product.objects.create(
                    name=name,
                    description=fake.sentence(nb_words=12),
                    image='products/default.jpg',  # Placeholder path
                    price=round(random.uniform(5000.0, 150000.0), 2),
                    stock=random.randint(10, 50),
                    category=category
                )
                total_created += 1

        self.stdout.write(self.style.SUCCESS(
            f"✅ Successfully created {total_created} unique products across {len(catalog)} categories."
        ))