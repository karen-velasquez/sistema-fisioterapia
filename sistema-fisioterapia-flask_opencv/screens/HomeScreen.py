import kivy
from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.gridlayout import GridLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivymd.app import MDApp
from kivy.lang import Builder

class MyApp(MDApp):
    #Inicializando infinite.keywords
    def build(self):
        #Llamando al constructor grid layout
        self.theme_cls.theme_style = 'Dark'
        self.theme_cls.primary_palette = 'BlueGray'
        return Builder.load_file('login.kv')




MyApp().run()