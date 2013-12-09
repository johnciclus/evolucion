from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=300)
    pub_date = models.DateTimeField('date published')
    def __unicode__(self):
        return self.title

class Prose(models.Model):
    project = models.OneToOneField(Project, primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    def __unicode__(self):
        return self.title