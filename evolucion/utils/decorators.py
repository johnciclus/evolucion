import json

from django.http import HttpResponse, HttpResponseBadRequest
from django.conf import settings

class AjaxError(Exception): pass

def ajax_view(f):
    """Return a valid ajax response"""

    def vista(request, *args, **kwargs):

        if not settings.DEBUG and not request.is_ajax():
            return HttpResponseBadRequest()

        try:
            res = f(request, *args, **kwargs)
            error = None
        except AjaxError, e:
            res = None
            error = str(e)
        except Exception, e:
            res = None

            if settings.DEBUG:
                error = 'Internal Error'
            else:
                error = str(e)

        return HttpResponse(
            json.dumps({
                'error': error,
                'response': res
            }),
            content_type = 'application/json; charset=utf8'
        )

    return vista