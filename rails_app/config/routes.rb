Rails.application.routes.draw do
  root 'startup#index'
  post '/signup', to: 'signup#create'
  post '/startup', to: 'startup#startup'
  get '/status', to: 'status#status'
  get '/maps', to: 'maps#index'
end
