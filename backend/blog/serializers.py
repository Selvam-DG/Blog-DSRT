from rest_framework import serializers
from .models import BlogPost, Comment, Like

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only= True)
    class Meta:
        model = Comment
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Like
        fields = '__all__'

        
class BlogPostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    comments = CommentSerializer(many = True, read_only= True)
    likes_count = serializers.SerializerMethodField()
    class Meta:
        model = BlogPost
        fields = "__all__"
    def get_likes_count(self, object):
        return object.likes.count()

