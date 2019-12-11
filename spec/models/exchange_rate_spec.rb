require 'rails_helper'

RSpec.describe ExchangeRate, type: :model do
  subject { described_class.new }

  it 'is valid with valid attributes' do
    subject.rate = 63
    subject.expiration_date = DateTime.now + 1.hours

    expect(subject).to be_valid
  end

  it 'is not valid without a rate' do
    subject.expiration_date = DateTime.now + 1.hours

    expect(subject).to_not be_valid
  end

  it 'is not valid if a expiration date in the past' do
    subject.rate = 63
    subject.expiration_date = DateTime.now - 1.hours

    expect(subject).to_not be_valid
  end
end