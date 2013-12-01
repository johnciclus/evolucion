class RelationInf < ActiveRecord::Base
  validates :origin,      :presence => true
  validates :destination, :presence => true                 
  validates :type_rel,    :presence => true
  validates :description, :presence => false
  validates :po_x,        :presence => true
  validates :po_y,        :presence => true
  validates :pco_x,       :presence => true
  validates :pco_y,       :presence => true
  validates :pd_x,        :presence => true
  validates :pd_y,        :presence => true
  validates :pcd_x,       :presence => true
  validates :pcd_y,       :presence => true
  
  belongs_to :influence
  belongs_to :origin,     :class_name => 'ElementInf'
  belongs_to :destination,:class_name => 'ElementInf'
end
