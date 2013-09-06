class ElementInf < ActiveRecord::Base
  
  validates :name,        :presence => true                 
  validates :type_el,     :presence => true
  validates :title,       :presence => true
  validates :description, :presence => false
  validates :units,       :presence => false
  validates :pos_x,       :presence => true
  validates :pos_y,       :presence => true
  
  belongs_to :influence
  has_many :origin_relations,     :foreign_key => 'origin_id',      :class_name => 'RelationInf'
  has_many :destination_relations,:foreign_key => 'destination_id', :class_name => 'RelationInf'
end
