require 'rails_helper'

RSpec.describe ExternalUserService do
  it "fetches users from external API", :vcr do
    response = ExternalUserService.fetch_users

    expect(response).to include("Leanne Graham")
  end
end