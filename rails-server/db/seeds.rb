# db/seeds.rb
# Seed the database with sample products for Elasticsearch testing.

products = [
  { name: "MacBook Pro 16-inch",       description: "Apple laptop with M3 Max chip, 36GB RAM, 1TB SSD. Perfect for developers and creative professionals.",  price: 249_900.0 },
  { name: "Dell XPS 15",               description: "Premium Windows ultrabook with Intel i9, 32GB RAM, OLED display. Great for programming and design.",    price: 179_900.0 },
  { name: "Sony WH-1000XM5",           description: "Industry-leading noise cancelling wireless headphones with exceptional sound quality.",                  price: 29_990.0 },
  { name: "Logitech MX Master 3S",     description: "Advanced wireless mouse with ergonomic design, perfect for productivity and coding.",                    price: 8_995.0 },
  { name: "Samsung Galaxy S24 Ultra",   description: "Flagship smartphone with AI features, 200MP camera, titanium frame, and S Pen.",                        price: 134_999.0 },
  { name: "Apple iPhone 15 Pro Max",    description: "Premium smartphone with A17 Pro chip, titanium design, and advanced camera system.",                     price: 159_900.0 },
  { name: "Mechanical Keyboard K8 Pro", description: "Wireless mechanical keyboard with hot-swappable switches, RGB backlight for developers.",               price: 9_499.0 },
  { name: "LG UltraWide Monitor 34",   description: "34-inch curved ultrawide monitor, 3440x1440 resolution, ideal for multitasking and coding.",             price: 44_999.0 },
  { name: "Raspberry Pi 5",            description: "Single board computer great for learning programming, IoT projects, and home automation.",               price: 5_500.0 },
  { name: "Arduino Starter Kit",       description: "Electronics starter kit for beginners to learn embedded programming and hardware projects.",              price: 3_200.0 },
  { name: "Standing Desk Pro",         description: "Electric height-adjustable standing desk with memory presets, perfect for ergonomic home office setup.",   price: 35_000.0 },
  { name: "Herman Miller Aeron Chair", description: "Ergonomic office chair designed for all-day comfort during long programming sessions.",                  price: 129_000.0 },
  { name: "USB-C Hub Multiport",       description: "7-in-1 USB-C hub with HDMI, SD card reader, USB 3.0 ports. Essential laptop accessory.",                  price: 2_499.0 },
  { name: "Portable SSD 2TB",          description: "Samsung T7 portable solid state drive, fast transfer speeds for backups and data storage.",               price: 15_999.0 },
  { name: "Webcam HD 4K",              description: "High definition 4K webcam with auto-focus and noise-cancelling microphone for video calls.",              price: 12_999.0 },
]

products.each do |attrs|
  Product.find_or_create_by!(name: attrs[:name]) do |p|
    p.description = attrs[:description]
    p.price       = attrs[:price]
  end
end

puts "✓ Seeded #{Product.count} products."

