class ExchangeRateSerializer < ActiveModel::Serializer
  attributes :id, :rate, :expiration_date
end
