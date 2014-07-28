import os
import sys
import site

sys.path.append('/www/evolucion')
sys.path.append('/www/evolucion/evolucion')

os.environ['DJANGO_SETTINGS_MODULE'] = 'evolucion.settings'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
