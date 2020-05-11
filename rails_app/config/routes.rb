Rails.application.routes.draw do
  root 'startup#index'
  post '/signup', to: 'signup#create'
end
