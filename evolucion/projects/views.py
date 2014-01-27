import sys
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.core import serializers
from django.views import generic
from django.utils import timezone

from evolucion.projects.models import Project, ProjectManager
from evolucion.users.models import EvoUser, UserForm

import logging, sys

logger = logging.getLogger(__name__)
# print >>sys.stderr, "Groups"

class IndexView(generic.ListView):
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
    
class NewView(generic.edit.CreateView):
    model = Project
    template_name = 'projects/index.html'
    context_object_name = 'projects'

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            
            user = get_object_or_404(EvoUser, pk = request.user.id)
            params = request.POST
            
            print >>sys.stderr, user.id
            print >>sys.stderr, request.POST
            print >>sys.stderr, params
            
            project = Project.objects.create_project(title = params['title'], description = params['description'], keywords = '', model = '', user = user)
            
            return redirect('/'+user.username+'/')
        
            #requested_user = get_object_or_404(EvoUser, username = kwargs['username'])
            #projects = Project.objects.filter(user = requested_user.id)
            
            #context = self.get_context_data(**kwargs)
            #context = {}
            #context['user'] = request.user
            #context['requested_user'] = requested_user
            #context['projects'] = projects
           
            #if request.user.is_anonymous():
            #    form = UserForm(auto_id=True)
            #    context['form'] = form
            
            #return render(request, self.template_name, context)
        else:
            return redirect('/')

class DetailView(generic.DetailView):
    model = Project
    template_name = 'projects/detail.html'
   

def detail(request, username, project_name):
    
    return HttpResponse("<p>"+username+": "+project_name+"</p>")
    #project = get_object_or_404(Project, pk=pk)
    #return render(request, 'projects/detail.html', {'project' : project})


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
        