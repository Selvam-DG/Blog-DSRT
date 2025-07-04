from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet

router = DefaultRouter()
router.register(r"posts", BlogPostViewSet, basename='posts')



urlpatterns = router.urls 

