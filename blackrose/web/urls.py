from django.conf.urls import url, include
from django.urls import path
from .views import *
from django.contrib.auth.decorators import login_required

app_name = "web"

urlpatterns = [
    path(r'signup/', signup, name ='signup'),
    path(r'mainmenu/', login_required(MainMenuView.as_view()), name ='mainmenuview'),
    path(r'creategame/', createGameView, name ='creategameview'),
    path(r'main/<int:match_id>/<int:player_id>/', login_required(MainView.as_view()), name ='mainview')

]
