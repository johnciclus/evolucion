from django.shortcuts import render
from evolucion.users.models import UserForm
#import logging

#logger = logging.getLogger(__name__)
        
def home(request):
    sign_form = UserForm(auto_id=True)
    context = {'sign_form': sign_form}
    return render(request, 'home/index.html', context)
