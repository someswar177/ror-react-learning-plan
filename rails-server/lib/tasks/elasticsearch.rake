# lib/tasks/elasticsearch.rake
#
# Rake tasks for managing Elasticsearch indexes.
# Run inside the api container:
#   docker compose exec api bin/rails elasticsearch:reindex
#
namespace :elasticsearch do
  desc "Create the Elasticsearch index and import all Products"
  task reindex: :environment do
    # 1. Delete the old index if it exists (clean slate)
    if Product.__elasticsearch__.index_exists?
      puts "→ Deleting existing 'products' index..."
      Product.__elasticsearch__.delete_index!
    end

    # 2. Create a fresh index with the mappings defined in the model
    puts "→ Creating 'products' index with mappings..."
    Product.__elasticsearch__.create_index!

    # 3. Bulk-import every Product record from Postgres into ES
    puts "→ Importing #{Product.count} products..."
    Product.import

    puts "✓ Done! All products are now indexed in Elasticsearch."
  end
end
