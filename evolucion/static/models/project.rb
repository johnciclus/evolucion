class Project < ActiveRecord::Base
                    
  validates :title,       :presence => true
  validates :description, :presence => true
  validates :author,      :presence => true
  validates :keywords,    :presence => true
  validates :model,       :presence => true
  
  has_one :prose,       :dependent => :destroy
  has_one :influence,   :dependent => :destroy
  has_one :stockandflow,:dependent => :destroy
  has_one :equation,    :dependent => :destroy
  has_one :behavior,    :dependent => :destroy
end
