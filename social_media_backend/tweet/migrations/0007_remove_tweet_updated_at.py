# Generated by Django 4.2.1 on 2023-06-20 11:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tweet', '0006_remove_tweet_likes_tweet_likes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tweet',
            name='updated_at',
        ),
    ]