from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Dataset
import tempfile
import csv

class DatasetModelTest(TestCase):
    def test_dataset_creation(self):
        dataset = Dataset.objects.create(filename="test.csv")
        self.assertEqual(dataset.filename, "test.csv")


class CSVUploadAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_csv_upload(self):
        # Create temporary CSV file
        temp_file = tempfile.NamedTemporaryFile(mode='w+', suffix='.csv', delete=False)
        writer = csv.writer(temp_file)
        writer.writerow(["Equipment Name", "Type", "Flowrate", "Pressure", "Temperature"])
        writer.writerow(["Pump A", "Pump", 120, 5.2, 80])
        temp_file.seek(0)

        with open(temp_file.name, 'rb') as csv_file:
            response = self.client.post(
                "/api/upload/",
                {"file": csv_file},
                format="multipart"
            )

        self.assertEqual(response.status_code, 200)
        self.assertIn("summary", response.data)
        self.assertEqual(Dataset.objects.count(), 1)
