from django import template
from django.utils.translation import ugettext
from django.utils.html import conditional_escape

register = template.Library()

@register.filter(name='id') 
def id(field): 
    return conditional_escape(field.auto_id)

@register.filter(name='value') 
def value(field): 
    return field.value()
    
@register.filter(name='verbosename') 
def verbosename(field): 
    return conditional_escape(field.label)

@register.filter(name='maxlength')
def maxlength(field): 
    widget = field.field.widget
    return widget.attrs['maxlength']

@register.filter(name='addcss')
def addcss(field, css):
   return field.as_widget(attrs={"class":css})

@register.filter(name='addplaceholder')
def addplaceholder(field, placeholder):
   return field.as_widget(attrs={"placeholder":placeholder})

@register.filter(name='addcssplaceholder')
def addcssplaceholder(field, cssplaceholder):
   if cssplaceholder is None:
        return False
   arg_list = [arg.strip() for arg in cssplaceholder.split(',')] 
   return field.as_widget(attrs={'class':arg_list[0], 'placeholder': arg_list[1]})

