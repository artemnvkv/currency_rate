class CreateExchangeRates < ActiveRecord::Migration[6.0]
  def change
    create_table :exchange_rates do |t|
      t.float :rate
      t.datetime :expiration_date

      t.timestamps
    end
  end
end
