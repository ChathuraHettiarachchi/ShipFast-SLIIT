class Order < ApplicationRecord
  has_many :delivaries, dependent: :destroy
end
