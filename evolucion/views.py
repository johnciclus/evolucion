from django.shortcuts import render
from evolucion.users.models import UserForm
import logging, sys

logger = logging.getLogger(__name__)

def home(request):
    sign_form = UserForm(auto_id=True)

    context = {'user': request.user, 'sign_form': sign_form}
    
    print >>sys.stderr, "Sessions Variable"
    print >>sys.stderr, request.session.__class__.__name__
    print >>sys.stderr, dir(request.session)
    print >>sys.stderr, "User"
    print >>sys.stderr, request.user
    return render(request, 'home/index.html', context)
