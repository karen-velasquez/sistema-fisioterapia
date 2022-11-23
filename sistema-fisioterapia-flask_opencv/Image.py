from kivy.app import App
from kivy.uix.boxlayout import BoxLayout

#import uix components
from kivy.uix.image import Image
from kivy.uix.button import Button
from kivy.uix.label import Label

#import other kivy stuff
from kivy.clock import Clock
from kivy.graphics.texture import Texture
from kivy.logger import Logger

import ExerciseModule as exercise



import cv2
import kivy
kivy.require('2.1.0')

class MainApp(App):

    def build(self):
        self.image = Image(size_hint=(1, .8))
        layout = BoxLayout(orientation='horizontal')
        layout.add_widget(self.image)
        layout.add_widget(Button(
            text = 'CLICK HERE',
            pos_hint={'center_x': .5, 'center_y': .5},
            size_hint=(None, None)
        ))
        self.capture = cv2.VideoCapture(0)
        '''while True:
            self.load_video()'''
        Clock.schedule_interval(self.load_video, 1.0/60.0)
        return layout


    def load_video(self, *args):
        ret,frame = self.capture.read()
        #Frame initialize
       # exerciseInstance = exercise.SimulateTargetExercices()
        #frame = exerciseInstance.squats2(frame)

        #flip horizontal and convert to image
        buffer = cv2.flip(frame, 0).tostring()
        texture = Texture.create(size=(frame.shape[1], frame.shape[0]), colorfmt='bgr')
        texture.blit_buffer(buffer, colorfmt = 'bgr', bufferfmt = 'ubyte')
        self.image.texture = texture



MainApp().run()