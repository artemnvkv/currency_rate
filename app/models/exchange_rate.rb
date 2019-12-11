class ExchangeRate < ApplicationRecord
  validates :rate, presence: true
  validate :date_cannot_be_in_the_past

  def date_cannot_be_in_the_past
    return unless expiration_date.present? && expiration_date < DateTime.now

    errors.add(:expiration_date, "can't be in the past")
  end
end
