require 'pusher'

#Should be stored as ENV variables, but this whole thing is a big hackety-hack anyway
Pusher.app_id = '56947'
Pusher.key = '29c6481be676d3fec47c'
Pusher.secret = '34034da5469fb9dce511'

class HomeController < ApplicationController
  
  def index
    #Since we have only a few kanji, this isn't too painful
    @kanji = Kanji.all.shuffle.first
  end
  
  def play
  end
  
  def clock
    Pusher.trigger('my-channel', 'my-event', {:message => params[:id]})
  end
  
end
