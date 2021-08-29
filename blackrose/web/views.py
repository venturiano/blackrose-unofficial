from django.shortcuts import render, redirect
from django.views.generic.base import TemplateView
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.urls import reverse
from .forms import CustomUserCreationForm


def signup(request):
    if request.method == 'POST':
        f = CustomUserCreationForm(request.POST)
        print(f.is_valid())
        print(f)
        if f.is_valid():
            f.save()
            username = f.cleaned_data.get('username')
            print('username')
            raw_password = f.cleaned_data.get('password1')
            print('raw_password')
            user = authenticate(username=username, password=raw_password)
            print(user)
            a=login(request, user)
            print(a)
            return HttpResponseRedirect(reverse('web:mainmenuview'))
    else:
        f = CustomUserCreationForm()
        return render(request, 'registration/register.html', {'form': f})


class MainMenuView(TemplateView):
    template_name='web/mainmenu.html'


class MainView(TemplateView):
    template_name='web/main.html'
    
    def get_context_data(self, **kwargs):
       context = super(MainView, self).get_context_data(**kwargs)
       context['players_range'] = range(1,4+1) 
       return context


@login_required
def createGameView(request):
    print('creating new game')
    return redirect('/web/main/1/1/')
    
