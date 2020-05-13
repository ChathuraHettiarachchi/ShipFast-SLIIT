class Delivary < ActiveRecord::Base
  belongs_to :order
  enum status: %i[pending delivered canceled]
end
