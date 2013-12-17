import re
from datetime import datetime

from django import forms
from django.core import validators
from django.db import models
from django.forms import ModelForm

from django.utils.translation import ugettext_lazy as _


class User(models.Model):
    first_name  = models.CharField(_('first_name'), max_length=40)
    last_name   = models.CharField(_('last_name'), max_length=40)
    username    = models.CharField(_('username'), max_length=30, unique=True,
                                   validators=[validators.RegexValidator(re.compile('^[\w.@+-]+$'), _('Enter a valid username.'), 'invalid')])
                                   #help_text=_('Required. 30 characters or fewer. Letters, numbers and @/./+/-/_ characters'),
                                    
    email       = models.EmailField(_('email'), max_length=50, unique=True)
    password    = models.CharField(_('password'), max_length=128)
    accept_terms= models.BooleanField()
    
    last_login = models.DateTimeField(_('last_login'), default=datetime.now)
    created_at = models.DateTimeField(_('created_at'), default=datetime.now)
    updated_at = models.DateTimeField(_('updated_at'), default=datetime.now)
    
    def __unicode__(self):
        return self.username

class UserForm(ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = User

    
