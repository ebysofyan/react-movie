from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from .models import Movie
# Create your views here.


class MovieCreateView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = serializers.MovieSerializer(data=request.data)
        if serializer.is_valid():
            result = serializer.create()
            if result['status'] == 'success':
                return Response(result, status=status.HTTP_201_CREATED)
            else:
                return Response(result, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieUpdateView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = serializers.MovieSerializer(data=request.data)
        if serializer.is_valid():
            movie = get_object_or_404(Movie, pk=kwargs.get('movie_pk'))
            result = serializer.update(movie, request.data)

            if result['status'] == 'success':
                return Response(result, status=status.HTTP_201_CREATED)
            else:
                return Response(result, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovieListView(APIView):

    def get(self, request, *args, **kwargs):
        serializer = serializers.MovieSerializer()
        return Response(serializer.list(), status=status.HTTP_200_OK)


class MovieGetView(APIView):

    def get(self, request, *args, **kwargs):
        serializer = serializers.MovieSerializer()

        pk = kwargs.get('movie_pk')
        return Response(serializer.get(pk=pk), status=status.HTTP_200_OK)


class MovieDeleteView(APIView):

    def get(self, request, **kwargs):
        serializer = serializers.MovieSerializer()

        pk = kwargs.get('movie_pk')
        return Response(serializer.delete(pk=pk), status=status.HTTP_200_OK)
