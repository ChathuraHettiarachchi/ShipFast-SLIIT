class Api::V1::OrderController < ApplicationController
  def index
    render json: {
        status: true,
        message: 'Orders found',
        content: {
            orders: Order.all
        }
    }, status: :ok
  end

  def create
    order = Order.new(o_params)
    if order.save!
      render json: {
          status: true,
          message: 'Order placed',
          content: {
              order: order
          }
      }, status: :ok
    else
      render json: {
          status: false,
          message: 'Something went wrong'
      }, status: :bad_request
    end
  end

  def order
    orders = Order.where(id: params[:id])
    if orders.count.positive?
      render json: {
          status: true,
          message: 'Order found',
          content: {
              orders: orders.first
          }
      }, status: :ok
    else
      render json: {
          status: false,
          message: 'Invalid order id'
      }, status: :bad_request
    end
  end

  private

  def o_params
    params.permit(:item, :address, :quantity)
  end
end