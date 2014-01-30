from django.shortcuts import render
from django.views import generic

from evolucion.users.models import UserForm

class IndexView(generic.View):
    def get(self, request, *args, **kwargs):
        form = UserForm(auto_id=True)
            
        context = {'user': request.user, 'form': form}

        return render(request, 'home/index.html', context)
