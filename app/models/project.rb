class Project < ActiveRecord::Base
  include ActiveModel::ForbiddenAttributesProtection
                   
  validates :title,       :presence => true
  validates :description, :presence => true
  validates :author,      :presence => true
  validates :keywords,    :presence => true
  
end
