class Book < ApplicationRecord
  belongs_to :user, dependent: :destroy
end
