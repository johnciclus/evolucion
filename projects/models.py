from __future__ import unicode_literals

from django.db import models
from django.forms import ModelForm
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from users.models import EvoUser

class Project(models.Model):
        name        = models.SlugField(_('name'), max_length=50)
        title       = models.CharField(_('title'), max_length=50)
        description = models.TextField(_('description')) 
        keywords    = models.CharField(_('keywords'), max_length=200, null=True, blank=True)
        is_public   = models.BooleanField(_('is public'))
        model       = models.TextField(_('model'), null=True, blank=True)
        hits        = models.IntegerField(_('hits'), default=0)
        stars       = models.FloatField(_('stars'), default=0)
        created_at  = models.DateTimeField(_('created at'), default=timezone.now)
        updated_at  = models.DateTimeField(_('updated at'), default=timezone.now)
        
        user        = models.ForeignKey(EvoUser)
        base_on     = models.ForeignKey('self', null = True)
    
        class Meta:
            unique_together = ("user", "name")
    
        def __str__(self):
            return self.title
        
class ProjectForm(ModelForm):
    class Meta:
        model = Project
        fields = ('name', 'title', 'description', 'keywords', 'is_public', 'model', 'user', 'base_on')
    
class Prose(models.Model):
    title       = models.CharField(_('prose title'), max_length=200)
    description = models.TextField(_('prose description'), max_length=2000)
    keywords    = models.CharField(_('prose keywords'), max_length=200)
    model       = models.TextField(_('model'), null=True, blank=True)
    created_at  = models.DateTimeField(_('created at'), default=timezone.now)
    updated_at  = models.DateTimeField(_('updated at'), default=timezone.now)
    
    project = models.OneToOneField(Project, primary_key=True)
    
    def __str__(self):
        return self.title

class ProseForm(ModelForm):
    class Meta:
        model  = Prose
        fields = ('title', 'description', 'keywords', 'model', 'project')
        
class Influences(models.Model):
    model       = models.TextField(_('model'), null=True, blank=True)
    concepts    = models.IntegerField(_('concepts'), default=0)
    cycles      = models.IntegerField(_('cycles'), default=0)
    clones      = models.IntegerField(_('clones'), default=0)
    material    = models.IntegerField(_('material'), default=0)
    information = models.IntegerField(_('information'), default=0)
    sector      = models.IntegerField(_('sector'), default=0)
            
    created_at  = models.DateTimeField(_('created at'), default=timezone.now)
    updated_at  = models.DateTimeField(_('updated at'), default=timezone.now)
    
    project = models.OneToOneField(Project, primary_key=True)
    
    def __str__(self):
        return self
    
class StockAndFlow(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    #width
    #height
    #model
    
    created_at  = models.DateTimeField(_('created at'), default=timezone.now)
    updated_at  = models.DateTimeField(_('updated at'), default=timezone.now)
    
    def __str__(self):
        return self

class Equations(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    #width
    #height
    #model
    
    created_at  = models.DateTimeField(_('created at'), default=timezone.now)
    updated_at  = models.DateTimeField(_('updated at'), default=timezone.now)
    
    def __str__(self):
        return self

class Behaviors(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    #width
    #height
    #model
    
    created_at  = models.DateTimeField(_('created at'), default=timezone.now)
    updated_at  = models.DateTimeField(_('updated at'), default=timezone.now)
    
    def __str__(self):
        return self

class ElementInf(models.Model):
    influences = models.ForeignKey(Influences)
    
    #t.string :name,       :null => false            
    #t.string :type_el,    :null => false
    #t.string :title,      :null => false
    #t.string :description
    #t.string :units
    #t.integer :pos_x,     :null => false
    #t.integer :pos_y,     :null => false
    
    #t.references :influence, :null => false
    #t.timestamps
    def __str__(self):
        return self
    
class RelationInf(models.Model):
    influences = models.ForeignKey(Influences)
    
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
    def __str__(self):
        return self

class SectorInf(models.Model):
    influences = models.OneToOneField(Influences, primary_key=True)
      
    def __str__(self):
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
    def __str__(self):
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
    def __str__(self):
        return self
    
class SectorSaf(models.Model):
    stock_and_flow = models.OneToOneField(StockAndFlow, primary_key=True)
      
    def __str__(self):
        return self