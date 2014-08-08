from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.core import serializers
from django.views import generic
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from xml.etree import ElementTree as ET

from evolucion.users.models import EvoUser, UserForm
from evolucion.projects.models import Project, ProjectForm, Prose, ProseForm

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
    
class Create(generic.View):
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            user = get_object_or_404(EvoUser, pk = request.user.id)
            params = request.POST.copy()
            
            params['name']      = slugify(params['title']) or '-'
            params['user']      = user
                        
            form = ProjectForm(data = params, auto_id=True)
                        
            context = {}
            context['user'] = user
            
            if form.is_valid():
                project = form.save() 
                context['project'] = project
                context['form_msg'] = _("the project was successfully registered")
                return render(request, 'projects/_new_success.html', context)
            else:
                form_errors = form.errors
                form_cleaned = form.cleaned_data
                return render(request, 'projects/_new_errors.html', {'form_errors': form_errors}) 
        else:
            return redirect('/')

class Editor(generic.View):
    template_name = 'editor/index.html'
    
    def get(self, request, *args, **kwargs):
        requested_user  = get_object_or_404(EvoUser, username = kwargs['username'])
        project         = get_object_or_404(requested_user.project_set, name = kwargs['project_name'])
        
        try:
            prose = project.prose
        except Prose.DoesNotExist:
            prose = None        
        
        if prose is None:
            prose = Prose(title = project.title, description = project.description, project = project)
        
        prose_form = ProseForm(instance = prose, auto_id = True)
        
        #return HttpResponse( serializers.serialize("xml", projects),
        #                     content_type = 'text/xml; charset=utf8')
        
        context = {}
        context['user']              = request.user
        context['requested_user']    = requested_user
        context['project']           = project
        context['prose_form']        = prose_form
               
        if request.user.is_anonymous():
            form = UserForm(auto_id=True)
            context['form'] = form
        
        return render(request, self.template_name, context)
   
class Save(generic.View):
    def post(self, request, *args, **kwargs):
        context = {}
        
        model = request.POST['model']
        
        model_xml   = ET.fromstring(model.encode('utf-8'))
        user_name   = model_xml.attrib['user_name']
        project_name= model_xml.attrib['project_name']
        
        user  = get_object_or_404(EvoUser, username = user_name)
        project = user.project_set.get(name = project_name)
        
        project.model = model
        
        try:
            project.full_clean()
            project.save()
        except ValidationError as e:
            pass
        
        self.SaveProse(project, model_xml.find('prose'))
        
        return render(request, 'projects/_confirmation.html', context)

    def SaveProse(self, project, prose_xml):
        prose, created      = Prose.objects.get_or_create(project = project)
        prose.title         = prose_xml.find('title').text
        prose.description   = prose_xml.find('description').text
        prose.model         = ET.tostring(prose_xml)
        
        try:
            prose.full_clean()
            prose.save()
        except ValidationError as e:
            pass

    def saveInfluence():    
        context = {}
        return render(request, 'projects/_confirmation.html', context)
    
    def saveStockAndFlow():
        context = {}
        return render(request, 'projects/_confirmation.html', context)
    
    def saveEquations():
        context = {}
        return render(request, 'projects/_confirmation.html', context)
    
    def saveBehavior():
        context = {}
        return render(request, 'projects/_confirmation.html', context)        