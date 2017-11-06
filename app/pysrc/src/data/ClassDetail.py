from peewee import Model, TimeField, CharField, DateTimeField, IntegerField, BooleanField

from base import database


# date,range,student key
class ClassDetail(Model):
    date = DateTimeField(null=False)
    range = TimeField(null=False)
    student = CharField(null=False)
    gradle = CharField(null=False)
    teacher = CharField(null=False)
    teacher_type = CharField(null=False)
    subject = CharField(null=False)
    manager = CharField(null=False)
    class_times = IntegerField(null=False)
    class_type = CharField(null=False)
    additions = CharField(default='')
    finished = BooleanField(default=False)

    class Meta:
        database = database
        indexes = (('date', 'range', 'teacher'), True)
