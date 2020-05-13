class Api::V1::DeliveryController < ApplicationController
  def status
    orders = Order.where(id: params[:id])
    if orders.count.positive?
      deliveries = Delivary.where(order_id: params[:id])
      if deliveries.count.positive?
        render json: {
            status: true,
            message: 'Information found',
            content: {
                delivery: deliveries.first
            }
        }, status: :ok
      else
        d = Delivary.new()
        d.status = 'pending'
        d.order_id = params[:id]
        d.save

        render json: {
            status: true,
            message: 'Information found',
            content: {
                delivery: d
            }
        }, status: :ok
      end
    else
      render json: {
          status: false,
          message: 'Invalid order id to retrieve delivery information'
      }, status: :bad_request
    end
  end

  def cancel
    deliveries = Delivary.where(order_id:  params[:id])
    if deliveries.count.positive?
      deliveries.first.status = 'canceled'
      deliveries.first.save
      render json: {
          status: true,
          message: 'Delivery status updated',
          content: {
              delivery: deliveries.first
          }
      }, status: :ok
    else
      render json: {
          status: false,
          message: 'Invalid order id'
      }, status: :bad_request
    end
  end
end