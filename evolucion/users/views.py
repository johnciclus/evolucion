from datetime import datetime

from django.http import HttpResponse
from django.core.context_processors import csrf
from django.core import serializers
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect
from django.utils.translation import ugettext_lazy as _
from evolucion.users.models import UserForm
from evolucion.utils.decorators import ajax_view, AjaxError

import logging, sys

logger = logging.getLogger(__name__)
# print >>sys.stderr, "Groups"
# c.update(csrf(request))

def get_xml(request):
    users = User.objects.all()
    return HttpResponse(
        serializers.serialize("xml", users),
        content_type = 'text/xml; charset=utf8')

def get_html(request):
    html  = render(request, 'layouts/_footer.html', {})
    return html

@ajax_view
def get_json(request):
    user  = User.objects.get(pk=1)
    return user.username

def sign_up(request):
    if request.method == 'POST':
        params = request.POST.copy()

        params['password'] = make_password(params['password'])
        params['created_at'] = datetime.now()
        params['updated_at'] = datetime.now()
        params['date_joined'] = datetime.now()
        params['last_login'] = datetime.now()

        sign_form = UserForm(params)
        
        if sign_form.is_valid():
            user = sign_form.save()
            form_msg = _("the user was successfully registered")
            return render(request, 'layouts/_signUpSuccess.html', {'form_msg': form_msg})
        else:
            form_errors = sign_form.errors
#           form_cleaned = sign_form.cleaned_data
            return render(request, 'layouts/_signUpErrors.html', {'form_errors': form_errors})
    else:
        sign_form = UserForm(auto_id=True)
        context = {'sign_form': sign_form}
        return render(request, 'home/index.html', context)

def sign_in(request):
    if request.method == 'POST':
        params = request.POST.copy()
        user = authenticate(username=params['username'], password=params['password'])
                
        if user is not None:
            user.is_active = True
            user.save()
            print >>sys.stderr, user.is_active
            if user.is_active:
                login(request, user)
                print >>sys.stderr, "request.user"
                print >>sys.stderr, dir(request.user)
                print >>sys.stderr, "request.user.is_authenticated()"
                print >>sys.stderr, request.user.is_authenticated()
                form_msg = _("welcome to Evolucion Web")
                #return render(request, 'layouts/_signInSuccess.html', {'form_msg': form_msg})
                return redirect('/editor/')
            else:
                form_msg = _("the user is not active")
                return render(request, 'layouts/_signInErrors.html', {'form_msg': form_msg})
            
        else:
            form_msg = _("the username or password is not correct.")
            return render(request, 'layouts/_signInErrors.html', {'form_msg': form_msg})