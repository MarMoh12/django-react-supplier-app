from rest_framework import serializers
from .models import Supplier, SupplierEvaluation

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class SupplierEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplierEvaluation
        fields = '__all__'
