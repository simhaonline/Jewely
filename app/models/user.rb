class User < ApplicationRecord

  validates :username, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: { message: 'Password can\'t be blank' }
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token

  attr_reader :password

  has_many :products,
    foreign_key: :seller_id,
    class_name: 'Product'

  has_one :cart,
    foreign_key: :customer_id,
    class_name: 'Cart'

  has_many :cart_products,
    through: :cart,
    source: :product

  has_many :reviews,
    foreign_key: :author_id,
    class_name: 'Review'
    
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end  
end
