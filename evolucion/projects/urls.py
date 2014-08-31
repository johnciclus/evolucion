from django.conf.urls import patterns, url

from evolucion.projects import views

urlpatterns = patterns('',
    url(r'^$', views.Index.as_view(), name='index'),
    
    url(r'^new/$', views.Create.as_view(), name='new'),
        
    url(r'^save/$', views.Save.as_view(), name='save_project'),
    
    # Fork
    url(r'^fork/$', views.Fork.as_view(), name='fork_project'),
    
    # Delete
    url(r'^delete/$', views.Delete.as_view(), name='delete_project'),
)