module API
  class ExchangeRatesController < ApplicationController
    def index
      ExchangeRateWorker.perform_async
      render json: ExchangeRate.first, status: :ok
    end

    def update
      exchange_rate = ExchangeRate.find(params[:id])
      exchange_rate.update!(exchange_rate_params)
      ActionCable.server.broadcast 'info:info_channel', content: ExchangeRateSerializer.new(exchange_rate)

      now = exchange_rate.expiration_date.to_i - DateTime.current.to_i
      ExchangeRateWorker.perform_in(now.seconds)
      render json: exchange_rate, status: :ok
    end

    private

    def exchange_rate_params
      params.require(:exchange_rate).permit(:rate, :expiration_date)
    end
  end
end
