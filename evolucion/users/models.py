from django.db import models
from django.forms import ModelForm

PROFILE_PERMISSIONS = (
            ('view_profile', 'Can view profile'),
)

class User(models.Model):
    name     = models.CharField(max_length=40)
    surname  = models.CharField(max_length=40)
    username = models.CharField(max_length=40)
    email    = models.CharField(max_length=50)
    password = models.CharField(max_length=200)
    
    reg_date = models.DateTimeField('date published')
    
    def __unicode__(self):
        return self.name

class UserForm(ModelForm):
    class Meta:
        model = User

    
