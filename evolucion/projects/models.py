from datetime import datetime

from django.db import models
from django.forms import ModelForm
from django.utils.translation import ugettext_lazy as _

from evolucion.users.models import EvoUser

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=300)
    #keywords
    #model
    pub_date = models.DateTimeField('date published')
    user = models.ForeignKey(EvoUser)
    
    #has_one :prose,       :dependent => :destroy
    #has_one :influence,   :dependent => :destroy
    #has_one :stockandflow,:dependent => :destroy
    #has_one :equation,    :dependent => :destroy
    #has_one :behavior,    :dependent => :destroy
    
    def __unicode__(self):
        return self.title

class Prose(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    title = models.CharField(_('prose title'), max_length=200)
    description = models.TextField(_('prose description'), max_length=2000)
    #model
    
    created_at  = models.DateTimeField(_('created_at'), default=datetime.now)
    updated_at  = models.DateTimeField(_('updated_at'), default=datetime.now)
    
    def __unicode__(self):
        return self.title

class ProseForm(ModelForm):
    class Meta:
        model = Prose
        
class Influences(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    #width
    #height
    #model
    #has_many :element_infs,   :dependent => :destroy
    #has_many :relation_infs,  :dependent => :destroy
    
    
    created_at  = models.DateTimeField(_('created_at'), default=datetime.now)
    updated_at  = models.DateTimeField(_('updated_at'), default=datetime.now)
    
    def __unicode__(self):
        return self
    
class StockAndFlow(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    #width
    #height
    #model
    
    created_at  = models.DateTimeField(_('created_at'), default=datetime.now)
    updated_at  = models.DateTimeField(_('updated_at'), default=datetime.now)
    
    def __unicode__(self):
        return self

class Stockandflow(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    #width
    #height
    #model
    
    created_at  = models.DateTimeField(_('created_at'), default=datetime.now)
    updated_at  = models.DateTimeField(_('updated_at'), default=datetime.now)
    
    def __unicode__(self):
        return self


class Equations(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    #width
    #height
    #model
    
    created_at  = models.DateTimeField(_('created_at'), default=datetime.now)
    updated_at  = models.DateTimeField(_('updated_at'), default=datetime.now)
    
    def __unicode__(self):
        return self

class Behaviors(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    #width
    #height
    #model
    
    created_at  = models.DateTimeField(_('created_at'), default=datetime.now)
    updated_at  = models.DateTimeField(_('updated_at'), default=datetime.now)
    
    def __unicode__(self):
        return self

class ElementInf(models.Model):
    influences = models.OneToOneField(Influences, primary_key=True)
      #t.string :name,       :null => false            
      #t.string :type_el,    :null => false
      #t.string :title,      :null => false
      #t.string :description
      #t.string :units
      #t.integer :pos_x,     :null => false
      #t.integer :pos_y,     :null => false
      
      #t.references :influence, :null => false
      #t.timestamps
    def __unicode__(self):
        return self
    
class RelationInf(models.Model):
    influences = models.OneToOneField(Influences, primary_key=True)
      #t.string  :type_rel,      :null => false
      #t.string  :description
      #t.float   :po_x,          :null => false
      #t.float   :po_y,          :null => false
      #t.float   :pco_x,         :null => false
      #t.float   :pco_y,         :null => false
      #t.float   :pd_x,          :null => false
      #t.float   :pd_y,          :null => false
      #t.float   :pcd_x,         :null => false
      #t.float   :pcd_y,         :null => false
      # 
      #t.references :origin,     :null => false
      #t.references :destination,:null => false
      #t.references :influence,  :null => false
      #t.timestamps
      
      #belongs_to :origin,     :class_name => 'ElementInf'
      #belongs_to :destination,:class_name => 'ElementInf'
      
      #has_many :origin_relations,     :foreign_key => 'origin_id',      :class_name => 'RelationInf'
      #has_many :destination_relations,:foreign_key => 'destination_id', :class_name => 'RelationInf'
    def __unicode__(self):
        return self

class SectorInf(models.Model):
    influences = models.OneToOneField(Influences, primary_key=True)
      
    def __unicode__(self):
        return self

class ElementSaf(models.Model):
    influences = models.OneToOneField(StockAndFlow, primary_key=True)
      #t.string :name,       :null => false            
      #t.string :type_el,    :null => false
      #t.string :title,      :null => false
      #t.string :description
      #t.string :units
      #t.integer :pos_x,     :null => false
      #t.integer :pos_y,     :null => false
      
      #t.references :influence, :null => false
      #t.timestamps
    def __unicode__(self):
        return self
    
class RelationSaf(models.Model):
    stock_and_flow = models.OneToOneField(StockAndFlow, primary_key=True)
      #t.string  :type_rel,      :null => false
      #t.string  :description
      #t.float   :po_x,          :null => false
      #t.float   :po_y,          :null => false
      #t.float   :pco_x,         :null => false
      #t.float   :pco_y,         :null => false
      #t.float   :pd_x,          :null => false
      #t.float   :pd_y,          :null => false
      #t.float   :pcd_x,         :null => false
      #t.float   :pcd_y,         :null => false
      # 
      #t.references :origin,     :null => false
      #t.references :destination,:null => false
      #t.references :influence,  :null => false
      #t.timestamps
      
      #has_many :origin_relations,     :foreign_key => 'origin_id',      :class_name => 'RelationInf'
      #has_many :destination_relations,:foreign_key => 'destination_id', :class_name => 'RelationInf'
    def __unicode__(self):
        return self
    
class SectorSaf(models.Model):
    stock_and_flow = models.OneToOneField(StockAndFlow, primary_key=True)
      
    def __unicode__(self):
        return self