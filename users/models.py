from __future__ import unicode_literals

import re

from django import forms
from django.core import validators
from django.db import models
from django.forms import ModelForm
from django.contrib.auth.models import User, UserManager
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

class EvoUser(User):
    occupation  = models.TextField(_('occupation'), max_length=200)
    
    accept_terms= models.BooleanField(_('accept terms'))
    created_at  = models.DateTimeField(_('created at'), default=timezone.now)
    updated_at  = models.DateTimeField(_('updated at'), default=timezone.now)
    
    objects = UserManager()
    
    ## Recoverable
    # t.string   #reset_password_token
    # t. :reset_password_sent_at
    
    ## Trackable
    #t.integer  :sign_in_count, :default => 0, :null => false
    #t. :current_sign_in_at
    #t. :last_sign_in_at
    #t.string   :current_sign_in_ip
    #t.string   :last_sign_in_ip  

    ## Confirmable
    # t.string   :confirmation_token
    # t. :confirmed_at
    # t. :confirmation_sent_at
    # t.string   :unconfirmed_email # Only if using reconfirmable
    
    ## Lockable
    # t.integer  :failed_attempts, :default => 0, :null => false # Only if lock strategy is :failed_attempts
    # t.string   :unlock_token # Only if unlock strategy is :email or :both
    # t. :locked_at
    
    
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
#     last_login  = models.DateTimeField(_('last_login'), default=timezone.now)
#     created_at  = models.DateTimeField(_('created_at'), default=timezone.now)
#     updated_at  = models.DateTimeField(_('updated_at'), default=timezone.now)
#     
#     def __str__(self):
#         return self.username
# 

class UserForm(ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = EvoUser
        fields = '__all__'