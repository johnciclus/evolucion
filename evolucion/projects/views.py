from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.core import serializers
from django.views import generic
from django.template.defaultfilters import slugify
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from evolucion.users.models import EvoUser, UserForm
from evolucion.projects.models import Project, ProjectForm, Prose, ProseForm

import logging, sys

logger = logging.getLogger(__name__)
# print >>sys.stderr, "Text"

class IndexView(generic.View):
    model = Project
    template_name = 'projects/index.html'
    context_object_name = 'projects'

    def get(self, request, *args, **kwargs):
        requested_user = get_object_or_404(EvoUser, username = kwargs['username'])
        projects = requested_user.project_set.all()
        
        context = {}
        context['user'] = request.user
        context['requested_user'] = requested_user
        context['projects'] = projects
       
        if request.user.is_anonymous():
            form = UserForm(auto_id=True)
            context['form'] = form
        
        return render(request, self.template_name, context)
    
class NewView(generic.View):
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

class EditorView(generic.View):
    template_name = 'editor/index.html'
    
    def get(self, request, *args, **kwargs):
        requested_user    = get_object_or_404(EvoUser, username = kwargs['username'])
        requested_project = get_object_or_404(requested_user.project_set, name = kwargs['project_name'])
        
        prose = Prose(title = requested_project.title, description = requested_project.description, project = requested_project)
        prose_form = ProseForm(instance = prose, auto_id = True)
        
        context = {}
        context['user'] = request.user
        context['requested_user'] = requested_user
        context['requested_project'] = requested_project
        context['prose_form'] = prose_form
               
        if request.user.is_anonymous():
            form = UserForm(auto_id=True)
            context['form'] = form
        
        return render(request, self.template_name, context)
   

def create(request):
    #@project = Project.new(project_params)
    #format.js{
    #    render :partial => 'refresh'
    #  }
    return HttpResponse("")

def show(request):
    #@project = Project.find(params[:id])
    #format.html
    return HttpResponse("")
#
#saveProse
#saveInfluence
#saveStockAndFlow
#saveEquations
#saveBehavior

def save(request):
    if request.method == 'POST':
        model = request.POST["model"]
        
        print >>sys.stderr, "---Model---"
        print >>sys.stderr, model
        
        projects = Project.objects.all()
        
        return HttpResponse( serializers.serialize("xml", projects),
                             content_type = 'text/xml; charset=utf8')
        
            
        #title = request.POST["title"]
        #description = request.POST["description"]
        
        
        
        #p = Project(title=title, description=description, pub_date=timezone.now())
        #p.save()
        #latest_projects_list = Project.objects.order_by('-pub_date')[:5]
        #context = {'latest_projects_list': latest_projects_list}
        #return render(request, 'projects/index.html', context)
        #return HttpResponseRedirect('/projects/')
        