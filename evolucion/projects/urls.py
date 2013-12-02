from django.conf.urls import patterns, url

from evolucion.projects import views

urlpatterns = patterns('',
        
    # ex: /projects/
    url(r'^$', views.IndexView.as_view(), name='index'),
    
    # ex: /projects/5/
    url(r'^(?P<pk>\d+)/$', views.DetailView.as_view(), name='detail'),
    
    url(r'^save/$', views.save, name='save'),
)