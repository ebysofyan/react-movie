from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^movie/create$', views.MovieCreateView.as_view(), name='create'),
    url(r'^movie/update/(?P<movie_pk>\w+)$',
        views.MovieUpdateView.as_view(), name='update'),
    url(r'^movie/list$', views.MovieListView.as_view(), name='list'),
    url(r'^movie/get/(?P<movie_pk>\w+)$',
        views.MovieGetView.as_view(), name='get'),
    url(r'^movie/delete/(?P<movie_pk>\w+)$',
        views.MovieDeleteView.as_view(), name='delete'),
]
