import sys
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.core import serializers
from django.views import generic
from django.utils import timezone
from django.contrib.auth.models import User

from evolucion.projects.models import Project
from evolucion.users.models import UserForm

import logging, sys

logger = logging.getLogger(__name__)
# print >>sys.stderr, "Groups"



class IndexView(generic.ListView):
    template_name = 'projects/index.html'
    context_object_name = 'latest_projects_list'
    def get_queryset(self):
        return Project.objects.order_by('-pub_date')[:5]

class DetailView(generic.DetailView):
    model = Project
    template_name = 'projects/detail.html'

def index(request, username):
    user = User.objects.get(username=username)
    
    context = {'user': request.user, 'requested_user': user}
    
    if request.user.is_anonymous():
        sign_form = UserForm(auto_id=True)
        context['sign_form'] = sign_form
        
    return render(request, 'projects/view.html', context)

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
        