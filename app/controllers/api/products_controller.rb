class Api::ProductsController < ApplicationController
    def index
        if params[:search].present?
            @products = Product.all.where('lower(title) LIKE :search
                                           OR lower(description) LIKE :search', search: "%#{params[:search]}%")
        else
            @products = Product.all
        end
    end
    
    def show
        @product = Product.with_attached_photos.find(params[:id])
    end

    def create
        @product = Product.new(product_params)

        if (@product.seller_id)
            @product.seller_username = User.find(@product.seller_id).username
        end

        if @product.save
            render :show
        else
            render json: @product.errors.full_messages, status: 422
        end
    end

    def update
        @product = current_user.products.find(params[:id])

        params[:product][:photosToDeleteIds].split(',').map do |id|
            @product.photos.destroy(id)
        end

        if @product.update(product_params)
            render :show
        else
            render json: @product.errors.full_messages, status: 422
        end
    end

    def destroy
        @product = current_user.products.find(params[:id])
        @product.photos.destroy_all
        
        if @product.destroy
            render :index
        else
            render json: @product.errors.full_messages, status: 422
        end
    end

    private
    def product_params
        params.require(:product).permit(
            :id,
            :title,
            :description,
            :price,
            :seller_id,
            :seller_username,
            photos: [])
    end
end