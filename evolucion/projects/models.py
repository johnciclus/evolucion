from django.db import models

# Create your models here.

class Project(models.Model):
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

class Prose(models.Model):
    project = models.ForeignKey(Project)
    title = models.CharField(max_length=200)
    description = models.TextField()