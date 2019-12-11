module API
  class ExchangeRatesController < ApplicationController
    def index
      render json: ExchangeRate.first, status: :ok
    end

    def update
      exchange_rate = ExchangeRate.find(params[:id])
      exchange_rate.update!(exchange_rate_params)
      
      render json:  exchange_rate, status: :ok
    end

    private

    def exchange_rate_params
      params.require(:exchange_rate).permit(:rate, :expiration_date)
    end
  end
end
