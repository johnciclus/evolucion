import sys
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.core import serializers
from django.views import generic
from django.utils import timezone

from evolucion.projects.models import Project

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
        
        

#def detail(request, pk):
#    project = get_object_or_404(Project, pk=pk)
#    return render(request, 'projects/detail.html', {'project' : project})