from kivymd.app import MDApp
from kivy.lang.builder import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
import AppAPIRequest as function
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.layout import  Layout
#import uix components
from kivy.uix.image import Image
from kivy.uix.button import Button
from kivy.graphics.texture import Texture
import cv2

import sys

sys.path.append("..")
import ExerciseModule as exercise



#import other kivy stuff
from kivy.clock import Clock


token = ''
class MenuScreen(Screen):
    def login(self, username, password):
        global token
        token = ''
        if(username != '' and password != ''):
            token = function.AppAPIRequest.calllogin(self, username, password)
            print(username + '----' + password)
        else:
            print('Por favor llenar las casillas')



class VideoScreen(Screen):
    def on_enter(self):
        print('holaaaaaaaaa')
        #eliminando cualquier elemento que este en el layout
        self.removeAllBoxLayout()

        #Creando la instancia donde estara la camara
        self.image = Image(size_hint=(1, .8))
        layout = self.ids.boxvideo
        layout.add_widget(self.image)


        self.capture = cv2.VideoCapture(0)
        Clock.schedule_interval(self.load_video, 1.0 / 60.0)
        return layout

    def load_video(self, *args):
        ret, frame = self.capture.read()
        # Frame initialize

        exerciseInstance = exercise.SimulateTargetExercices
        frame = exerciseInstance.la_prueba(self,frame)

        # flip horizontal and convert to image
        buffer = cv2.flip(frame, 0).tostring()
        texture = Texture.create(size=(frame.shape[1], frame.shape[0]), colorfmt='bgr')
        texture.blit_buffer(buffer, colorfmt='bgr', bufferfmt='ubyte')
        self.image.texture = texture


    def removeAllBoxLayout(self):
        rows = [i for i in self.ids.boxvideo.children]
        print("------------")
        for row1 in rows:
            #Eliminando el label que esta dentro
            self.ids.boxvideo.remove_widget(row1)



class ListExerciseScreen(Screen):
    pass





# Create the screen manager
sm = ScreenManager()
sm.add_widget(MenuScreen(name='menu'))
sm.add_widget(VideoScreen(name='video'))
sm.add_widget(ListExerciseScreen(name='listExercise'))


class DemoApp(MDApp):

    def build(self):
        screen = Builder.load_file('ScreensApp.kv')
        return screen




DemoApp().run()