from django.contrib import admin
from evolucion.projects.models import Project, Prose
    
class ProseInline(admin.TabularInline):
    model = Prose

class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
         (None, {'fields': ['title', 'description'] }),
         ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ProseInline]
    
    search_fields = ['title']
    list_filter = ['pub_date']
    list_display = ('title', 'pub_date')
    date_hierarchy = 'pub_date'
    
admin.site.register(Project, ProjectAdmin)