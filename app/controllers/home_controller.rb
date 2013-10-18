require 'pusher'

#Should be stored as ENV variables, but this whole thing is a big hackety-hack anyway
Pusher.app_id = '56947'
Pusher.key = '2444194d376d68e127da'
Pusher.secret = '7aa48dddeacdfa7e00ef'

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
  
  def startclock
    Pusher.trigger('my-channel', 'started', {:message => params[:id]})
  end
  
end
