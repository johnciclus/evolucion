from django.conf.urls import patterns, include, url
from evolucion.users import views

urlpatterns = patterns('',
    url(r'^signup/', views.sign_up_in),
)