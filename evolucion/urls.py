from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    # Root page:
    url(r'^$', 'evolucion.views.home', name='home'),
    
    # Include app Projects:
    url(r'^projects/', include('evolucion.projects.urls', namespace='projects')),
    
    # Include app Editor:
    url(r'^editor/', include('evolucion.editor.urls', namespace='editor')),
    
    # Include app Users:
    url(r'^users/', include('evolucion.users.urls', namespace='users')),
    
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    
)
