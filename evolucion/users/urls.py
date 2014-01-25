from django.conf.urls import patterns, include, url
from evolucion.users import views

urlpatterns = patterns('',
    url(r'^sign_up/',  views.sign_up,   name='sign_up'),
    url(r'^sign_in/',  views.sign_in,   name='sign_in'),
    url(r'^edit/',     views.edit,      name='edit'),
    
    url(r'^get_xml/',  views.get_xml,   name='xml'),
    url(r'^get_json/', views.get_json,  name='json'),
    url(r'^get_html/', views.get_html,  name='html'),
)