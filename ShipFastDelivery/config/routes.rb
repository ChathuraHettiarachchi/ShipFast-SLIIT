Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'delivery/:id', to: 'delivery#status'
      post 'delivery/:id', to: 'delivery#cancel'
    end
  end
end
