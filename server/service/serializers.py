from rest_framework import serializers
from .models import Movie
import json


class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        exclude = []

    def create(self):
        if self.is_valid():
            movie = Movie()
            movie.title = self.validated_data.get('title')
            movie.genre = self.validated_data.get('genre')
            movie.year = self.validated_data.get('year')
            movie.author = self.validated_data.get('author')
            movie.save()

            return {
                'status': 'success',
                'message': 'Successfully Created',
                'movie': {
                    'id': movie.pk,
                    'title': movie.title,
                    'genre': movie.genre,
                    'year': movie.year,
                    'author': movie.author,
                }
            }
        else:
            return {
                'status': 'error',
                'message': self.error_messages
            }

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.genre = validated_data.get('genre', instance.genre)
        instance.year = validated_data.get('year', instance.year)
        instance.author = validated_data.get('author', instance.author)
        
        if validated_data:
            instance.save()

            out = {
                'status': 'success',
                'movie': validated_data,
            }
        else:
            out = {
                'status': 'error'
            }

        return out

    def list(self):
        query_set = Movie.objects.all()
        data = list(query_set.values())
        return data

    def get(self, pk):
        obj = Movie.objects.filter(pk=pk).first()
        if obj:
            out = [
                {
                    'id': obj.pk,
                    'title': obj.title,
                    'genre': obj.genre,
                    'year': obj.year,
                    'author': obj.author,
                }
            ]

        else:
            out = {
                'status': 'error',
                'message': 'No Data Found'
            }

        return out

    def delete(self, pk):
        obj = Movie.objects.filter(pk=pk).first()
        if obj:
            obj.delete()

            return {
                'status': 'success',
                'message': 'Successfully Deleted'
            }
        return {
            'status': 'error',
            'message': 'No Data Found'
        }
