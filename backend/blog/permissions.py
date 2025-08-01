from rest_framework.permissions import BasePermission

class IsOwnerorReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.method in ('GET', 'HEAD')