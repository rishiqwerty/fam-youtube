# Generated by Django 5.0.1 on 2024-01-23 17:52

from django.db import migrations, models

def insert_api_keys(apps, schema_editor):
    APIKeys = apps.get_model('db_populate', 'APIKeys')
    
    APIKeys.objects.get_or_create(api_keys='AIzaSyAONpP4UI_tDPJ-jIjQvVkGuRkKVE2hggo')
    APIKeys.objects.get_or_create(api_keys='AIzaSyDWFWe2slXJZnqbxXNNaN9byLswFIXiuQY')
    APIKeys.objects.get_or_create(api_keys="AIzaSyDdYNrqSKO1xrcRdTIZZcQZP4Eu7LzKjiU")
    APIKeys.objects.get_or_create(api_keys="AIzaSyDiAYnNh_0fJvfdYsr8BSH_ljf6IdRqXuk")
    APIKeys.objects.get_or_create(api_keys="AIzaSyCU_U1fkBAjidh7-qUFMZHVCnhLKbyOe4I")
    APIKeys.objects.get_or_create(api_keys="AIzaSyDDOOfn9R9wucx7-T5V5NPLyLvVfqg-pQI")

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='APIKeys',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('api_keys', models.CharField(max_length=200)),
            ],
        ),
        migrations.RunPython(insert_api_keys),
    ]
