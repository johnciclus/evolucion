from datetime import datetime

from django.http import HttpResponse
from django.core.context_processors import csrf
from django.core import serializers
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _
from django.views import generic

from evolucion.users.models import EvoUser, UserForm
from evolucion.utils.decorators import ajax_view, AjaxError

import logging, sys

logger = logging.getLogger(__name__)
# print >>sys.stderr, "Groups"
# c.update(csrf(request))

class UserEdit(generic.edit.FormView):
    template_name   = 'users/edit.html'
    form_class      = UserForm
    success_url     = '/user/edit/'
    
    def get(self, request, *args, **kwargs):
        user = request.user
        form = UserForm(auto_id=True, instance=user)
        
        context = self.get_context_data(**kwargs)
        context['user'] = request.user
        context['form'] = form
        
        return render(request, self.template_name, context)
    
    #def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        # form.send_email()
        # return super(UserEdit, self).form_valid(form)

def edit(request):
    user = request.user
    context = {}
    
    if user.is_anonymous():
        form = UserForm(auto_id=True)
        context['form'] = form
            
    return render(request, 'users/edit.html', context)

def get_xml(request):
    users = EvoUser.objects.all()
    return HttpResponse(
        serializers.serialize("xml", users),
        content_type = 'text/xml; charset=utf8')

def get_html(request):
    html  = render(request, 'layouts/_footer.html', {})
    return html

@ajax_view
def get_json(request):
    user  = EvoUser.objects.get(pk=1)
    return user.username

def sign_up(request):
    if request.method == 'POST':
        params = request.POST.copy()

        params['password'] = make_password(params['password'])
        params['created_at'] = datetime.now()
        params['updated_at'] = datetime.now()
        params['date_joined'] = datetime.now()
        params['last_login'] = datetime.now()

        form = UserForm(params)
        
        if form.is_valid():
            user = form.save()
            form_msg = _("the user was successfully registered")
            return render(request, 'users/_sign_up_success.html', {'form_msg': form_msg})
        else:
            form_errors = form.errors
#           form_cleaned = form.cleaned_data
            return render(request, 'users/_sign_up_errors.html', {'form_errors': form_errors})
    else:
        form = UserForm(auto_id=True)
        context = {'form': form}
        return render(request, 'home/index.html', context)

def sign_in(request):
    if request.method == 'POST':
        params = request.POST.copy()
        user = authenticate(username=params['username'], password=params['password'])
                
        if user is not None:
            #user.is_active = True
            #user.save()
            print >>sys.stderr, user.is_active
            if user.is_active:
                login(request, user)
                print >>sys.stderr, "request.user"
                print >>sys.stderr, dir(request.user)
                print >>sys.stderr, request.user.__class__.__name__
                print >>sys.stderr, "request.user.is_authenticated()"
                print >>sys.stderr, request.user.is_authenticated()
                form_msg = _("welcome to Evolucion Web")
                return render(request, 'users/_sign_in_success.html', {'form_msg': form_msg})
            else:
                form_msg = _("the user is not active")
                return render(request, 'users/_sign_in_errors.html', {'form_msg': form_msg})
            
        else:
            form_msg = _("the username or password is not correct.")
            return render(request, 'users/_sign_in_errors.html', {'form_msg': form_msg})