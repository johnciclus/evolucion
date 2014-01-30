from django.conf.urls import patterns, include, url
from django.contrib import admin

from evolucion import views, projects

admin.autodiscover()

urlpatterns = patterns('',
    # Root page:
    url(r'^$', views.IndexView.as_view(), name='home'),
        
    # Include app Users:
    url(r'^user/', include('evolucion.users.urls', namespace='user')),
    
    # Include app Projects:
    url(r'^projects/', include('evolucion.projects.urls', namespace='projects')),
        
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # User page
    url(r'^(?P<username>\w+)/$', projects.views.IndexView.as_view(), name='projects_view'),
        
    # Project editor page
    url(r'^(?P<username>\w+)/(?P<project_name>[-\w]+)/$', projects.views.EditorView.as_view(), name='project_editor'),
)
