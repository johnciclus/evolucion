from django.conf.urls import patterns, url
import views

urlpatterns = [
    url(r'^sign_up/$',  views.sign_up,              name='sign_up'),
    url(r'^sign_in/$',  views.sign_in,              name='sign_in'),
    url(r'^logout/$',   views.user_logout,          name='logout'),
    
    url(r'^edit/$',     views.UserEdit.as_view(),   name='edit'),
    url(r'^update/$',   views.UserEdit.as_view(),   name='update'),
    
    
    url(r'^get_xml/$',  views.get_xml,              name='xml'),
    url(r'^get_json/$', views.get_json,             name='json'),
    url(r'^get_html/$', views.get_html,             name='html'),
]