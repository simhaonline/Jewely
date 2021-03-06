Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, default: { format: :json } do
    resources :users, only: [:index, :show, :create, :destroy]
    resource :session, only: [:create, :destroy]
    resources :reviews, only: [:create, :show, :update, :destroy]
    resources :products, except: [:edit, :new]  do
      resources :reviews, only: [:index]
    end
    resources :carts, only: [:show]
  end
  root to: 'static_pages#root'
end