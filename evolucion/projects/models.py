from django.db import models
from django.forms import ModelForm

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=300)
    pub_date = models.DateTimeField('date published')
    def __unicode__(self):
        return self.title

class Prose(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=2000)
    def __unicode__(self):
        return self.title

class ProseForm(ModelForm):
    class Meta:
        model = Prose
    