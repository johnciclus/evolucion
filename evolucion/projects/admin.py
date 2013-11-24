from django.contrib import admin
from evolucion.projects.models import Project, Prose

admin.site.register([Project, Prose])