from django.conf.urls import patterns, url

from evolucion.projects import views

urlpatterns = patterns('',
            
    # ex: /projects/new
    url(r'^new/$', views.Create.as_view(), name='new'),
        
    url(r'^save/$', views.Save.as_view(), name='save_project'),
)