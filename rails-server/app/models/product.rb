class Product < ApplicationRecord
  # ──────────────────────────────────────────────────────────
  # Elasticsearch integration
  # ──────────────────────────────────────────────────────────
  include Elasticsearch::Model            # adds .search, .mappings, .import, etc.
  include Elasticsearch::Model::Callbacks # auto-indexes on create/update/destroy

  # Index name — defaults to the model's table name ("products"),
  # but you can customize it with: index_name "my_products"

  # ── Index Settings & Mappings ───────────────────────────
  # This tells Elasticsearch HOW to store and analyze each field.
  #
  # • "text" fields are analyzed (tokenized, lowercased) → good for full-text search
  # • "keyword" sub-field stores the exact untouched value → good for sorting/aggregations
  # • "float" is a numeric type → supports range queries (<=, >=)
  #
  settings index: { number_of_shards: 1 } do
    mappings dynamic: false do
      indexes :name,        type: :text, analyzer: :standard, fields: { raw: { type: :keyword } }
      indexes :description, type: :text, analyzer: :standard
      indexes :price,       type: :float
    end
  end

  # Only send these attributes to Elasticsearch (not timestamps, etc.)
  def as_indexed_json(options = {})
    as_json(only: %i[name description price])
  end

  # ── Search Method using Elasticsearch Query DSL ─────────
  # This is where we write raw Elasticsearch queries.
  #
  # Query DSL breakdown:
  #   bool  → combines multiple conditions (must, filter, should)
  #   must  → the document MUST match these (affects relevance score)
  #   filter → the document MUST match, but does NOT affect score (faster)
  #
  #   multi_match → searches a query string across multiple fields
  #     • "best_fields" type  → picks the single best-matching field's score
  #     • "fuzziness: auto"   → tolerates typos (e.g. "laptp" → "laptop")
  #
  #   range → numeric/date comparison (gte = >=, lte = <=)
  #
  def self.search_with_filters(query: nil, max_price: nil)
    # Build the bool query dynamically
    must_clauses   = []
    filter_clauses = []

    # Full-text search across name + description
    if query.present?
      must_clauses << {
        multi_match: {
          query: query,
          fields: %w[name^3 description],   # name is boosted 3x
          type: :best_fields,
          fuzziness: :auto                   # allows typo tolerance
        }
      }
    end

    # Price ceiling filter (doesn't affect relevance score)
    if max_price.present?
      filter_clauses << {
        range: { price: { lte: max_price } }
      }
    end

    # If no search criteria at all, match everything
    if must_clauses.empty? && filter_clauses.empty?
      must_clauses << { match_all: {} }
    end

    # Execute the query via the Elasticsearch client
    __elasticsearch__.search(
      query: {
        bool: {
          must:   must_clauses,
          filter: filter_clauses
        }
      }
    )
  end
end

