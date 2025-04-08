from rest_framework import serializers
from .models import Supplier, SupplierEvaluation

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class SupplierEvaluationSerializer(serializers.ModelSerializer):
    supplier = SupplierSerializer(read_only=True)
    supplier_id = serializers.PrimaryKeyRelatedField(
        queryset=Supplier.objects.all(),
        source='supplier',
        write_only=True
    )

    class Meta:
        model = SupplierEvaluation
        fields = ['id', 'supplier', 'supplier_id', 'evaluation_score', 'evaluation_date', 'comments']
