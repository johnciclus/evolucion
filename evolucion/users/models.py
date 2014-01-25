import re
from datetime import datetime

from django import forms
from django.core import validators
from django.db import models
from django.forms import ModelForm
from django.contrib.auth.models import User, UserManager
from django.utils.translation import ugettext_lazy as _


class EvoUser(User):
    profile     = models.TextField(_('profile'))
    
    ## Recoverable
    # t.string   #reset_password_token
    # t.datetime :reset_password_sent_at
    
    ## Trackable
    #t.integer  :sign_in_count, :default => 0, :null => false
    #t.datetime :current_sign_in_at
    #t.datetime :last_sign_in_at
    #t.string   :current_sign_in_ip
    #t.string   :last_sign_in_ip  

    ## Confirmable
    # t.string   :confirmation_token
    # t.datetime :confirmed_at
    # t.datetime :confirmation_sent_at
    # t.string   :unconfirmed_email # Only if using reconfirmable
    
    ## Lockable
    # t.integer  :failed_attempts, :default => 0, :null => false # Only if lock strategy is :failed_attempts
    # t.string   :unlock_token # Only if unlock strategy is :email or :both
    # t.datetime :locked_at
    
    accept_terms= models.BooleanField(_('accept_terms'))
    created_at  = models.DateTimeField(_('created_at'), default=datetime.now)
    updated_at  = models.DateTimeField(_('updated_at'), default=datetime.now)
    
    objects = UserManager()
    
# class User(models.Model):
#     first_name  = models.CharField(_('first_name'), max_length=40)
#     last_name   = models.CharField(_('last_name'), max_length=40)
#     username    = models.CharField(_('username'), max_length=30, unique=True,
#                                    validators=[validators.RegexValidator(re.compile('^[\w.@+-]+$'), _('Enter a valid username.'), 'invalid')])   
#                                     
#     email       = models.EmailField(_('email'), max_length=50, unique=True,
#                                     validators=[validators.validate_email])
#     
#     password    = models.CharField(_('password'), max_length=128)
#     accept_terms= models.BooleanField(_('accept_terms'))
#     
#     last_login = models.DateTimeField(_('last_login'), default=datetime.now)
#     created_at = models.DateTimeField(_('created_at'), default=datetime.now)
#     updated_at = models.DateTimeField(_('updated_at'), default=datetime.now)
#     
#     def __unicode__(self):
#         return self.username
# 

class UserForm(ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = EvoUser