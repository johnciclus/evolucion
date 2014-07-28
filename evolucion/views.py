from django.shortcuts import render
from django.views import generic

from evolucion.users.models import UserForm
from evolucion.projects.models import Project

class Index(generic.View):
    def get(self, request, *args, **kwargs):
        form = UserForm(auto_id=True)
            
        context = {'user': request.user, 'form': form}

        return render(request, 'home/index.html', context)

class Explore(generic.View):
    def get(self, request, *args, **kwargs):
        form = UserForm(auto_id=True)
        
        projects = Project.objects.all()
               
        context = {}
        context['user']             = request.user
        context['projects']         = projects
        context['form']             = form

        return render(request, 'explore/index.html', context)