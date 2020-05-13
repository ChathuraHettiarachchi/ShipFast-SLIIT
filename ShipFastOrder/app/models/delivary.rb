class Delivary < ApplicationRecord
  belongs_to :order
  enum status: %i[pending delivered canceled]
end
