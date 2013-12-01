class Influence < ActiveRecord::Base  
  validates :width,     :presence => true
  validates :height,    :presence => true
  
  belongs_to :project
  has_many :element_infs,   :dependent => :destroy
  has_many :relation_infs,  :dependent => :destroy
end
