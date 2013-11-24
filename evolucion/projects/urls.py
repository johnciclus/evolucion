from django.conf.urls import patterns, url

from evolucion.projects import views

urlpatterns = patterns('',
    # ex: /projects/
    url(r'^$', views.index, name='index'),
    
    # ex: /projects/5/
    url(r'^(?P<project_id>\d+)/$', views.detail, name='detail'),
)