from django.http import HttpResponse
from django.shortcuts import render
from evolucion.users.models import UserForm

def sign_up(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            user = form.save()
    else:
        form = UserForm()
        
    context = {'form': form}
    return render(request, '/home/index.html', context)
        

def home(request):
    sign_form = UserForm(auto_id=True)
    context = {'sign_form': sign_form}
    return render(request, 'home/index.html', context)
