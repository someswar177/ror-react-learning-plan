require 'vcr'
require 'webmock/rspec'
require 'rails_helper'


VCR.configure do |config|
  config.cassette_library_dir = "spec/vcr_cassettes"
  config.hook_into :webmock

  # optional but good
  config.configure_rspec_metadata!
end