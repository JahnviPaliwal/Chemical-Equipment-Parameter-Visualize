import os
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny

from .models import Dataset
from reportlab.pdfgen import canvas

from .utils import analyze_csv


class CSVUploadView(APIView):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        file_path = os.path.join(settings.MEDIA_ROOT, file.name)

        with open(file_path, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        # Save dataset
        dataset = Dataset.objects.create(filename=file.name)

        # Keep only last 5 uploads
        datasets = Dataset.objects.order_by("-uploaded_at")
        if datasets.count() > 5:
            for ds in datasets[5:]:
                ds.delete()

        # Analyze CSV
        data, summary = analyze_csv(file_path)

        # 🔥 AUTO-GENERATE PDF HERE
        pdf_filename = f"{dataset.id}_report.pdf"
        pdf_path = os.path.join(settings.MEDIA_ROOT, pdf_filename)

        c = canvas.Canvas(pdf_path)
        c.setFont("Helvetica", 12)
        c.drawString(50, 800, f"Chemical Equipment Analysis Report")
        c.drawString(50, 780, f"Dataset: {dataset.filename}")

        y = 740
        for key, value in summary.items():
            c.drawString(50, y, f"{key}: {value}")
            y -= 22

        c.save()

        return Response({
            "message": "File uploaded successfully",
            "summary": summary,
            "data": data,
            "pdf": pdf_filename
        })


class SummaryView(APIView):
    def get(self, request):
        latest = Dataset.objects.order_by("-uploaded_at").first()
        if not latest:
            return Response({"error": "No data available"}, status=404)

        file_path = os.path.join(settings.MEDIA_ROOT, latest.filename)
        _, summary = analyze_csv(file_path)

        return Response(summary)


# class HistoryView(APIView):
#     def get(self, request):
#         datasets = Dataset.objects.order_by("-uploaded_at")[:5]
#         serializer = DatasetSerializer(datasets, many=True)
#         return Response(serializer.data)

class HistoryView(APIView):
    def get(self, request):
        datasets = Dataset.objects.order_by('-uploaded_at')[:5]
        response_data = []

        for ds in datasets:
            pdf_filename = f"{ds.id}_report.pdf"

            response_data.append({
                "id": ds.id,
                "filename": ds.filename,
                "uploaded_at": ds.uploaded_at,
                "pdf": pdf_filename,
            })

        return Response(response_data)



class GeneratePDFView(APIView):
    def get(self, request, dataset_id=None):
        if dataset_id:
            dataset = Dataset.objects.filter(id=dataset_id).first()
        else:
            dataset = Dataset.objects.order_by("-uploaded_at").first()

        if not dataset:
            return Response({"error": "No data available"}, status=404)

        pdf_filename = f"{dataset.id}_report.pdf"
        pdf_path = os.path.join(settings.MEDIA_ROOT, "reports", pdf_filename)

        if not os.path.exists(pdf_path):
            return Response({"error": "Report not found"}, status=404)

        return Response({
            "message": "Report ready",
            "pdf": pdf_filename
        })
