from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Supplier, SupplierEvaluation
from .serializers import SupplierSerializer, SupplierEvaluationSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class SupplierEvaluationViewSet(viewsets.ModelViewSet):
    queryset = SupplierEvaluation.objects.all()
    serializer_class = SupplierEvaluationSerializer
