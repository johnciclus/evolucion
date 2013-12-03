from django.conf.urls import patterns, url

from evolucion.editor import views

urlpatterns = patterns('',
        
    # ex: /editor/
    url(r'^$', views.IndexView.as_view(), name='index'),
    
)