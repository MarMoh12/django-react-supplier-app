from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Supplier, SupplierEvaluation
from .serializers import SupplierSerializer, SupplierEvaluationSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']                  # z. B. ?search=volkwagen
    ordering_fields = ['name']                # z. B. ?ordering=name oder ?ordering=-name

class SupplierEvaluationViewSet(viewsets.ModelViewSet):
    queryset = SupplierEvaluation.objects.all()
    serializer_class = SupplierEvaluationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['supplier']
    search_fields = ['comments', 'supplier__name']
    ordering_fields = ['evaluation_score', 'evaluation_date']
