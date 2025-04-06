from django.contrib import admin
from .models import Supplier
from .models import SupplierEvaluation

# Register your models here.
admin.site.register(Supplier)
admin.site.register(SupplierEvaluation)