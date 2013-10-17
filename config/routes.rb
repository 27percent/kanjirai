Kanjirai::Application.routes.draw do
  resources :answers


  resources :kanjis
  
  root :to => "home#index"
  get 'play', to: 'home#play'
  post 'clock/:id', to: 'home#clock'
  
end
