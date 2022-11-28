from kivy.app import App
from kivy.uix.boxlayout import BoxLayout

#import uix components
from kivy.uix.image import Image
from kivy.uix.button import Button

#import other kivy stuff
from kivy.clock import Clock
from kivy.graphics.texture import Texture

import cv2
import mediapipe as mp
import numpy as np

import index as exercise


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
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_pose = mp.solutions.pose

        while True:
            self.load_video()
        #Clock.schedule_interval(self.load_video, 1.0/60.0)
        return layout


    def load_video(self, *args):
        ret,frame = self.capture.read()
        #Frame initialize
        '''exerciseInstance = exercise.SimulateTargetExercices()
        frame = exerciseInstance.la_prueba(frame)'''
        #frame = exercise.Exercises.pose_estimation(self, self.capture, self.mp_pose)


        #flip horizontal and convert to image
        buffer = cv2.flip(frame, 0).tostring()
        texture = Texture.create(size=(frame.shape[1], frame.shape[0]), colorfmt='bgr')
        texture.blit_buffer(buffer, colorfmt = 'bgr', bufferfmt = 'ubyte')
        self.image.texture = texture



MainApp().run()