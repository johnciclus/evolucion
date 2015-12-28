from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.core import serializers
from django.views import generic
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from xml.etree import ElementTree as ET

from users.models import EvoUser, UserForm
from projects.models import Project, ProjectForm, Prose, ProseForm

import logging, sys

logger = logging.getLogger(__name__)
#print >>sys.stderr, "Text"

class Index(generic.View):
    def get(self, request, *args, **kwargs):
        user = request.user
        requested_user = get_object_or_404(EvoUser, username = kwargs['username'])
                
        if user.is_authenticated() and user.username == requested_user.username:
            projects = requested_user.project_set.all()
        else:
            projects = requested_user.project_set.filter(is_public=True)
            
        context = {}
        context['user']             = user
        context['requested_user']   = requested_user
        context['projects']         = projects
       
        if user.is_anonymous():
            form = UserForm(auto_id=True)
            context['form'] = form
            
        return render(request, 'projects/index.html', context)
