from django.conf.urls import patterns, include, url
from django.contrib import admin
#from manifesto.views import ManifestView

admin.autodiscover()

urlpatterns = patterns('',
    # Root page:
    url(r'^$', 'evolucion.views.home', name='home'),
        
    # Include app Users:
    url(r'^users/', include('evolucion.users.urls', namespace='users')),
    
    # Include app Projects:
    url(r'^projects/', include('evolucion.projects.urls', namespace='projects')),
    
    # Include app Editor:
    url(r'^editor/', include('evolucion.editor.urls', namespace='editor')),
    
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # User page
    url(r'^(?P<username>\w+)/$', 'evolucion.users.views.profile_view', name='profile_view'),
)
