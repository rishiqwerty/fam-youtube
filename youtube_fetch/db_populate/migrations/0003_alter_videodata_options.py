# Generated by Django 5.0.1 on 2024-01-25 06:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('db_populate', '0002_videodata'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='videodata',
            options={'ordering': ['-published_time']},
        ),
    ]
