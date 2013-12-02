import sys
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from datetime import datetime
from evolucion.projects.models import Project

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
        title = request.POST["title"]
        description = request.POST["description"]
        
        print request.POST
        
        p = Project(title=title, description=description, pub_date=datetime.today())
        p.save()
        latest_projects_list = Project.objects.order_by('-pub_date')[:5]
        context = {'latest_projects_list': latest_projects_list}
        return render(request, 'projects/index.html', context)

#def detail(request, pk):
#    project = get_object_or_404(Project, pk=pk)
#    return render(request, 'projects/detail.html', {'project' : project})