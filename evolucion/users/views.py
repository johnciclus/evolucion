from django.core.context_processors import csrf
from django.shortcuts import HttpResponse, render, render_to_response, redirect, RequestContext
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from evolucion.users.models import UserForm
from datetime import datetime
from django.utils.translation import ugettext_lazy as _
from django.contrib import messages

import logging, sys


logger = logging.getLogger(__name__)


def loginview(request):
    c = {}
    c.update(csrf(request))
    return render_to_response('login.html', c)

def auth_and_login(request, onsuccess='/', onfail='/login/'):
    user = authenticate(username=request.POST['email'], password=request.POST['password'])
    if user is not None:
        login(request, user)
        return redirect(onsuccess)
    else:
        return redirect(onfail)  

def create_user(username, email, password):
    user = User(username=username, email=email)
    user.set_password(password)
    user.save()
    return user

def user_exists(username):
    user_count = User.objects.filter(username=username).count()
    if user_count == 0:
        return False
    return True

def sign_up(request):
    if request.method == 'POST':
        params = request.POST.copy()
        params['created_at'] = datetime.now()
        params['updated_at'] = datetime.now()
        params['last_login'] = datetime.now()
        sign_form = UserForm(params)
        
        if sign_form.is_valid():
            user = sign_form.save()
            context = {'sign_form': sign_form}
        else:
            cd = sign_form.cleaned_data
            form_errors = sign_form.errors
            sign_form = UserForm(auto_id=True)
            context = {'sign_form': sign_form, 'form_errors': form_errors}
    else:
        sign_form = UserForm(auto_id=True)
        context = {'sign_form': sign_form}
        
    return render(request, 'home/index.html', context)

def sign_up_in(request):
    user = UserForm(request.POST)
    if user.is_valid():
        usr = user.save()
        return redirect("/valid/")
    else:
        return redirect("/login/")

    #if not user_exists(user['email']): 
    #    user = create_user(username=post['email'], email=post['email'], password=post['password'])
    #    return auth_and_login(request)
    #else:
    #    return redirect("/login/")      #return redirect("/login/")
        
@login_required(login_url='/login/')
def secured(request):
    return render_to_response("secure.html")