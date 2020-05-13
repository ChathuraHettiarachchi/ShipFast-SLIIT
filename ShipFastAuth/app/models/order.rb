class Order < ActiveRecord::Base
  has_many :delivaries, dependent: :destroy
end
