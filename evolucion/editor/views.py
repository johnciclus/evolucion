from django.views import generic
from django.shortcuts import render

class IndexView(generic.ListView):
    template_name = 'editor/index.html'
    context_object_name = ''
    def get_queryset(self):
        return ''
    
def index(request):
    return render(request, 'editor/index.html', {})