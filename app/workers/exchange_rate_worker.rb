class ExchangeRateWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { hourly }

  def perform
    rate = ExchangeRateParser.dollar
    exchange_rate = ExchangeRate.first
    exchange_rate ||= ExchangeRate.new
    if exchange_rate.expiration_date.nil? || exchange_rate.expiration_date < DateTime.now && exchange_rate.rate != rate
      exchange_rate.update!(rate: rate, expiration_date: nil)
    end

    ActionCable.server.broadcast 'info:info_channel', content: ExchangeRateSerializer.new(exchange_rate)
  end
end
