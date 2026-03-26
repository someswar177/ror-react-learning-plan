class User < ApplicationRecord
  has_one :cart, dependent: :destroy
end
