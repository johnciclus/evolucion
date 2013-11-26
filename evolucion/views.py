from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    context = {}
    return render(request, 'home/index.html', context)
