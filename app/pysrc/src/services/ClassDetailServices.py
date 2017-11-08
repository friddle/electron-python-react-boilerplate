# encoding:utf-8

from data.ClassDetail import ClassDetail;
from data.base import database
from peewee import fn


class ClassDetailServices:
    def __init__(self):
        if not ClassDetail.table_exists():
            database.create_tables([ClassDetail])
        ClassDetail.delete().execute()

    def SelectClass(self, begin_date, end_date, select_maps):
        if type(select_maps) is str: select_maps = eval(select_maps)
        if type(begin_date) is str:
            begin_date = eval(begin_date)
        class_select = ClassDetail.select()
        if begin_date is not None:
            class_select = class_select.where(ClassDetail.date > begin_date).where(ClassDetail.date < end_date)
        if select_maps is not None:
            for key in select_maps.keys():
                class_select = class_select.where(getattr(ClassDetail, key) == select_maps[key])
        class_select = list(class_select)
        return class_select

    def SelectAttrByType(self, type_name):
        attrs = list(ClassDetail.select(getattr(ClassDetail, type_name)).distinct())
        attrs = map(lambda attr: attr._data[type_name], attrs)
        if type_name == 'date':
            attrs = map(lambda attr: str(attr), attrs)
        return attrs

    def SelectClassCount(self, begin_date, end_date, select_maps):
        if type(select_maps) is str: select_maps = eval(select_maps)
        if type(begin_date) is str:
            begin_date = eval(begin_date)
        class_select = ClassDetail.select(fn.SUM(ClassDetail.class_times).alias('result'))
        if begin_date is not None:
            class_select = class_select.where(ClassDetail.date > begin_date).where(ClassDetail.date < end_date)
        if select_maps is not None:
            for key in select_maps.keys():
                class_select = class_select.where(getattr(ClassDetail, key) == select_maps[key])
        class_select = class_select.scalar()
        return class_select

    def SumByTypeAndSubject(self):
        subjects = self.SelectAttrByType("subject")
        teacher_types = self.SelectAttrByType("teacher_type")
        teacher_values = []
        for subject in subjects:
            total_count = self.SelectClassCount(None, None, {"subject": subject})
            for teacher_type in teacher_types:
                teacher_count = self.SelectClassCount(None, None, {"subject": subject, "teacher_type": teacher_type})
                if teacher_count==None:teacher_count=0
                teacher_values.append({"subject": subject,
                                       "teacher_type": teacher_type,
                                       "count": teacher_count,
                                       "percent": teacher_count / float(total_count)})

        return teacher_values

    def emptyTables(self):
        ClassDetail.delete().execute()
