from rest_framework import viewsets, filters
from .models import Supplier, SupplierEvaluation
from .serializers import SupplierSerializer, SupplierEvaluationSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']                  # z. B. ?search=acme
    ordering_fields = ['name']                # z. B. ?ordering=name oder ?ordering=-name

class SupplierEvaluationViewSet(viewsets.ModelViewSet):
    queryset = SupplierEvaluation.objects.all()
    serializer_class = SupplierEvaluationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['comments', 'supplier__name']   # z. B. ?search=zuverlässig
    ordering_fields = ['evaluation_score', 'evaluation_date']  # z. B. ?ordering=-evaluation_score
