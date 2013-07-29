class User < ActiveRecord::Base

  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i

  validates :username,      :presence => true,  :uniqueness   => true,  :length => { :in => 4..25 }
  validates :name,          :presence => true
  validates :lastname,      :presence => true
  validates :email,         :presence => true,  :uniqueness   => true,  :format => EMAIL_REGEX
  validates :occupation,    :presence => true
  validates :organization,  :presence => true
  validates :city,          :presence => true
  validates :state,         :presence => true
  validates :country,       :presence => true
  validates :usertype_id,   :presence => true
  validates :password,      :presence => true,  :confirmation => true
  validates_length_of :password, :in => 6..20,  :on => :create
    
  belongs_to :usertype

end
