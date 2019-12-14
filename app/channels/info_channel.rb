class InfoChannel < ApplicationCable::Channel
  def subscribed
    stream_for 'info_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
