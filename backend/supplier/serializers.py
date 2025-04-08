from rest_framework import serializers
from .models import Supplier, SupplierEvaluation

# Serializer für das Supplier-Modell
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'  # Alle Felder des Supplier-Modells sollen serialisiert werden

# Serializer für das SupplierEvaluation-Modell
class SupplierEvaluationSerializer(serializers.ModelSerializer):
    # Der Supplier wird als verschachteltes Objekt angezeigt (nur lesbar)
    supplier = SupplierSerializer(read_only=True)
    
    # Der supplier_id wird als Primärschlüssel-Feld hinzugefügt (nur schreibbar)
    supplier_id = serializers.PrimaryKeyRelatedField(
        queryset=Supplier.objects.all(),  # Die Supplier-Daten werden aus der Supplier-Datenbank geladen
        source='supplier',  # Das Feld 'supplier' wird als Quelle für das 'supplier_id' verwendet
        write_only=True  # Nur beim Erstellen oder Bearbeiten des Evaluationsobjekts verwendbar
    )

    class Meta:
        model = SupplierEvaluation
        fields = ['id', 'supplier', 'supplier_id', 'evaluation_score', 'evaluation_date', 'comments']
        # Die Felder, die in der Serialisierung enthalten sein sollen, werden hier festgelegt
