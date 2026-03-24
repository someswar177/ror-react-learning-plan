require 'net/http'
require 'uri'

class ExternalUserService
  def self.fetch_users
    url = URI("https://jsonplaceholder.typicode.com/users")
    response = Net::HTTP.get(url)
    response
  end
end