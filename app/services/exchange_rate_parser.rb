require 'net/http'
require 'rexml/document'

class ExchangeRateParser
  def self.dollar
    url = 'http://www.cbr.ru/scripts/XML_daily.asp'

    response = Net::HTTP.get_response(URI.parse(url))
    doc = REXML::Document.new(response.body)

    doc.each_element('//Valute[@ID="R01235"]') do |exchange_tag|
      return exchange_tag.get_text('Value').to_s.gsub(',', '.')
    end
  end
end
