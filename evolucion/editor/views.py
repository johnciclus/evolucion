from django.views import generic
from django.shortcuts import render
from evolucion.projects.models import ProseForm 

def index(request):
    prose_form = ProseForm(auto_id=True)
    context = {'prose_form': prose_form}
    return render(request, 'editor/index.html', context)