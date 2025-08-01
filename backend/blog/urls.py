from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, CommentViewSet, LikeViewSet

router = DefaultRouter()
router.register(r"blogPosts", BlogPostViewSet, basename='posts')
router.register(r"comments", CommentViewSet, basename='comments')
router.register(r"likes", LikeViewSet, basename='likes')


urlpatterns = router.urls 

