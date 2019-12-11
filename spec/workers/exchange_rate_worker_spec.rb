require 'rails_helper'

describe ExchangeRateWorker do
  let(:actual_rate) { ExchangeRateParser.dollar }
  let(:worker_rate) { ExchangeRateWorker.new }

  after do
    Timecop.return
  end

  it 'should update the exchange rate' do
    _ = create(:exchange_rate, expiration_date: DateTime.now + 30.seconds)
    Timecop.freeze(Time.zone.now + 1.minutes)
    worker_rate.perform
    expect(ExchangeRate.first.rate).to eq(actual_rate.to_f)
  end

  it 'should not update the exchange rate' do
    _ = create(:exchange_rate, expiration_date: DateTime.now + 1.hours)
    Timecop.freeze(Time.zone.now + 1.minutes)
    worker_rate.perform
    expect(ExchangeRate.first.rate).not_to eq(actual_rate.to_f)
  end
end
