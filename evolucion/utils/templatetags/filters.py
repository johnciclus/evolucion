from django import template

register = template.Library()

@register.filter(name='addcss')
def addcss(field, css):
   return field.as_widget(attrs={"class":css})

@register.filter(name='addplaceholder')
def addplaceholder(field, placeholder):
   return field.as_widget(attrs={"placeholder":placeholder})

@register.filter(name='addcssplaceholder')
def addcssplaceholder(field, css):
   return field.as_widget(attrs={'class':css, 'placeholder':field.name})

