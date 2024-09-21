from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone_number', 'role')
    search_fields = ('full_name', 'email')  # Optional: add a search bar for these fields
    list_filter = ('role',)  # Optional: filter users by role
    ordering = ('-id',)  # Optional: order by ID descending

    # Optional: you can customize the form used in the admin if needed
    # def get_form(self, request, obj=None, **kwargs):
    #     form = super().get_form(request, obj, **kwargs)
    #     # Customize form if necessary
    #     return form
