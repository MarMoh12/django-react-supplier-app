from django.db import models

class Supplier(models.Model):
    name = models.CharField(max_length=255)
    # Optional: contact = models.CharField(max_length=255), etc.

class SupplierEvaluation(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    evaluation_score = models.IntegerField()
    evaluation_date = models.DateField()
    comments = models.TextField()
