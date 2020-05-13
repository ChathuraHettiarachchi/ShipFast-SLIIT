class JsonWebToken
  class << self
    def encode(payload, exp = 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, "this_is_the_key")
    end

    def decode(token)
      body = JWT.decode(token, 'this_is_the_key')[0]
      HashWithIndifferentAccess.new body
    rescue
      nil
    end
  end
end