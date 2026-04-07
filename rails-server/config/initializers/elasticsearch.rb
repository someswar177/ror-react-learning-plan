# Configure the global Elasticsearch client.
# In docker-compose, the ELASTICSEARCH_URL env var points to the
# elasticsearch service container (http://elasticsearch:9200).
# Falls back to localhost for non-Docker local development.
Elasticsearch::Model.client = Elasticsearch::Client.new(
  url: ENV.fetch("ELASTICSEARCH_URL", "http://localhost:9200"),
  log: Rails.env.development?   # logs every request in dev for learning
)
