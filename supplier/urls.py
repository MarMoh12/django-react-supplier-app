from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, SupplierEvaluationViewSet

router = DefaultRouter()
router.register('suppliers', SupplierViewSet)
router.register('evaluations', SupplierEvaluationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
