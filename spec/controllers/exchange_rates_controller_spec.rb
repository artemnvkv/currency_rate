require 'rails_helper'

RSpec.describe API::ExchangeRatesController, type: :controller do
  let!(:exchange_rate) { create(:exchange_rate) }

  context 'GET #index' do
    it 'has a 200 status code' do
      get :index
      expect(response.status).to eq(200)
    end

    it 'should return the array of the exchange rates' do
      get :index
      result = JSON.parse(response.body)

      expect(result['rate']).to eq(exchange_rate.rate)
      expect(result['expiration_date']).to eq(exchange_rate.expiration_date)
    end
  end

  context 'PUT #update' do
    it 'should return the object of the exchange rate' do
      date = DateTime.now + 1.hours
      patch :update,
            params: {
              id: exchange_rate.id,
              exchange_rate:
                  FactoryBot.attributes_for(
                    :exchange_rate,
                    rate: 12.1,
                    expiration_date: date
                  ),
              format: :json
            }
      result = JSON.parse(response.body)

      expect(result['rate']).to eq(12.1)
      expect(DateTime.parse(result['expiration_date']).to_i).to eq(date.to_i)
    end
  end
end
