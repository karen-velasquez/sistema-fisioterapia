from tkinter import Button

from kivy.lang import Builder
from kivy.uix.scrollview import ScrollView
from kivymd.app import MDApp
from kivymd.uix.list import OneLineListItem, MDList
from kivy.uix.screenmanager import ScreenManager, Screen, SlideTransition
import mysql.connector
from mysql.connector import Error

KV = '''
ScrollView:
    MDList:
        id: container
'''

class ListExercise(Screen):
    def __init__(self):
        super.__init__()


        self.sv = ScrollView()
        self.ml = MDList()
        self.sv.add_widget(self.ml)

        if self.conexion.is_connected():
            try:
                # Realizando el SELECT
                cursor = self.conexion.cursor()
                cursor.execute("SELECT * FROM ejercicios")
                resultados = cursor.fetchall()

                # Iterando la lista de resultados
                for fila in resultados:
                    print(fila)
                    self.ml.add_widget(
                        OneLineListItem(text=f"{fila[1]}",
                                        on_press=lambda x, item=fila: print("item number", item))
                    )
            except Error as ex:
                print("Error al intentar la conexion")




    #Conectando a la Base de datos y llenado el list
    #def hola(self):
    def on_start(self):
        if self.conexion.is_connected():
            try:
                #Realizando el SELECT
                cursor = self.conexion.cursor()
                cursor.execute("SELECT * FROM ejercicios")
                resultados = cursor.fetchall()

                #Iterando la lista de resultados
                for fila in resultados:
                    print(fila)
                    self.root.ids.container.add_widget(
                        OneLineListItem(text=f"{fila[1]}",
                                        on_press=lambda x, item=fila: print("item number", item))
                    )
            except Error as ex:
                print("Error al intentar la conexion")


class FirstPage(Button):
    def __init__(self):
        super.__init__()
        self.text = 'hi'
        self.bind(on_press = self.switch)

    def switch(self,item):
        myapp.screen_manager.transition = SlideTransition(direction='left')
        myapp.screen_manager.current = 'Second'


class MyApp(MDApp):
    def build(self):
        try:
            self.conexion = mysql.connector.connect(
                host='localhost',
                port='3306',
                user='root',
                password='root',
                db='sistema_fisioterapia_spring_boot'
            )
        except Error as ex:
            print('Error al tratar de conectar: {0} '.format(ex))


        self.screen_manager = ScreenManager()

        self.listExercise = ListExercise()
        screen = Screen(name = 'listExercise')
        screen.add_widget(self.listExercise)
        self.screen_manager.add_widget(screen)

        return self.screen_manager



myapp = MyApp()
myapp.run()
