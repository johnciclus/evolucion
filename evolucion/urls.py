"""evolucion URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

from evolucion import views
from projects import views as projects_views

urlpatterns = [
        # Root page:
    url(r'^$', views.Index.as_view(), name='home'),
    
    # Explore page:
    url(r'^explore/', views.Explore.as_view(), name='explore'),

    # Features
    url(r'^features/', views.Features.as_view(), name='features'),
                           
    # Include app Users:
    url(r'^user/', include('users.urls', namespace='user')),
    
    # Include app Projects:
    url(r'^projects/', include('projects.urls', namespace='projects')),
        
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # User page
    url(r'^(?P<username>\w+)/$', projects_views.Index.as_view(), name='project_index'), 
        
    # Project editor page
    #url(r'^(?P<username>\w+)/(?P<project_name>[-\w]+)/$', projects.views.Editor.as_view(), name='project_editor'),
]
