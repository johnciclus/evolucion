from django.contrib import admin
from evolucion.projects.models import Project, Prose
    
class ProseInline(admin.TabularInline):
    model = Prose

class ProjectAdmin(admin.ModelAdmin):
    fieldsets = [
         (None, {'fields': ['title', 'description'] }),
         ('Date information', {'fields': ['created_at', 'updated_at'], 'classes': ['collapse']}),
    ]
    inlines = [ProseInline]
    
    search_fields = ['title']
    list_filter = ['created_at']
    list_display = ('title', 'created_at')
    date_hierarchy = 'created_at'
    
admin.site.register(Project, ProjectAdmin)