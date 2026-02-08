from django.urls import path

from .views import (
    CSVUploadView,
    SummaryView,
    HistoryView,
    GeneratePDFView
)

urlpatterns = [
    path('upload/', CSVUploadView.as_view(), name="upload"),
    # path("api/", include("equipment.urls")),

    path('summary/', SummaryView.as_view()),
    path('history/', HistoryView.as_view()),
    path('generate-pdf/', GeneratePDFView.as_view()),
]
