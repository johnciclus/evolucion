from django.conf.urls import patterns, include, url
from evolucion.users import views

urlpatterns = patterns('',
    url(r'^sign_up/', views.sign_up, name='sign_up'),
)