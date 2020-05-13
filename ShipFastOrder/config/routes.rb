Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'orders', to: 'order#index'
      post 'order', to: 'order#create'
      get 'order/:id', to: 'order#order'
    end
  end
end
