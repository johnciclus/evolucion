from django.http import HttpResponse
from django.shortcuts import render
from evolucion.projects.models import Project

def index(request):
    latest_projects_list = Project.objects.order_by('-pub_date')[:5]
    context = {'latest_projects_list': latest_projects_list}
    return render(request, 'projects/index.html', context)

def detail(request, project_id):
    return HttpResponse("You're looking at project %s." % project_id)