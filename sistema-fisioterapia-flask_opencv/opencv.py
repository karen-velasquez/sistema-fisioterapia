import threading
from functools import partial
import cv2
import time
import mediapipe as mp
import ModuleExercise as exercise
from kivy.app import App
from kivy.clock import Clock
from kivy.graphics.texture import Texture
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
from datetime import datetime



camera = 0


class MainScreen(Screen):
    pass


class Manager(ScreenManager):
    pass


Builder.load_string('''
<MainScreen>:
    name: "Test"

    FloatLayout:
        Label:
            text: "Webcam from OpenCV?"
            pos_hint: {"x":0.0, "y":0.8}
            size_hint: 1.0, 0.2
            
        Button:
        
            text: 'VIDEO 0'
            on_press: 
                app.tipoVideo(0)
            pos_hint: {"x":0.0, "y":0.8}
            size_hint: 0.3, 0.2
            
        Button:
            text: 'VIDEO 1'
            on_press: app.tipoVideo(1)
            pos_hint: {"x":0.6, "y":0.8}
            size_hint: 0.3, 0.2

        Image:
            # this is where the video will show
            # the id allows easy access
            id: vid
            size_hint: 1, 0.6
            allow_stretch: True  # allow the video image to be scaled
            keep_ratio: True  # keep the aspect ratio so people don't look squashed
            pos_hint: {'center_x':0.5, 'top':0.8}

        Button:
            text: 'Stop Video'
            pos_hint: {"x":0.0, "y":0.0}
            size_hint: 1.0, 0.2
            font_size: 50
            on_release: app.stop_vid()
''')


class Main(App):
    def build(self):
        self.list_threads = []
        # start the camera access code on a separate thread
        # if this was done on the main thread, GUI would stop
        # daemon=True means kill this thread when app stops
        '''target_thread_camera = threading.Thread(
            target=self.doit(), args=(True), kwargs={}
        )
        self.list_threads.append(target_thread_camera)
        target_thread_camera.start()'''

        threading.Thread(target=self.doit, daemon=True).start()

        sm = ScreenManager()
        self.main_screen = MainScreen()
        sm.add_widget(self.main_screen)
        return sm

    def doit(self):
        global camera
        # this code is run in a separate thread
        self.do_vid = True  # flag to stop loop

        # make a window for use by cv2
        # flags allow resizing without regard to aspect ratio
        '''cv2.namedWindow('Hidden', cv2.WINDOW_NORMAL | cv2.WINDOW_FREERATIO)

        # resize the window to (0,0) to make it invisible
        cv2.resizeWindow('Hidden', 0, 0)'''
        cam = cv2.VideoCapture(camera)
        mp_pose = mp.solutions.pose
        mp_drawing = mp.solutions.drawing_utils

        with mp_pose.Pose(
                static_image_mode=False,
                min_detection_confidence=0.7,
                smooth_landmarks=True,
                min_tracking_confidence=0.7) as pose:
            # start processing loop
            while (self.do_vid):
                list_threads = []
                ret, frame = cam.read()

                '''frame = exercise.pose_estimation(frame, pose, mp_drawing, mp_pose)'''

                '''target_thread_frame = threading.Thread(
                    target=self.display_frame, args=()
                )
                list_threads.append(target_thread_frame)
                target_thread_frame.start()'''

                # ...
                # more code
                # ...

                # send this frame to the kivy Image Widget
                # Must use Clock.schedule_once to get this bit of code
                # to run back on the main thread (required for GUI operations)
                # the partial function just says to call the specified method with the provided argument (Clock adds a time argument)
                # display the current video frame in the kivy Image widget

                '''Clock.schedule_interval(self.load_video, 1.0 / 60.0)'''
                '''print("ESTOY DENTRO EL HILO")
                now = datetime.now()
                current_time = now.strftime("%H:%M:%S")
                print("Current Time =", current_time)

                print(time)'''
                Clock.schedule_once(partial(self.display_frame, frame))


                '''cv2.imshow('Hidden', frame)
                cv2.waitKey(1)'''
            cam.release()
            cv2.destroyAllWindows()

    def stop_vid(self):
        # stop the video capture loop
        self.do_vid = False
        time.sleep(2)
        '''self.main_screen.ids.vid.clear_widgets()'''



    def tipoVideo(self, number):
        # stop the video capture loop
        self.stop_vid()

        global camera
        camera = int(number)
        if(self.do_vid == False):
            threading.Thread(target=self.doit, daemon=True).start()
            print("EL NUMERO ESCOGIDO "+str(number))




    def display_frame(self, frame, dt):
        # display the current video frame in the kivy Image widget

        # create a Texture the correct size and format for the frame
        texture = Texture.create(size=(frame.shape[1], frame.shape[0]), colorfmt='bgr')

        # copy the frame data into the texture
        texture.blit_buffer(frame.tobytes(order=None), colorfmt='bgr', bufferfmt='ubyte')

        # flip the texture (otherwise the video is upside down
        texture.flip_vertical()

        # actually put the texture in the kivy Image widget
        self.main_screen.ids.vid.texture = texture


if __name__ == '__main__':
    Main().run()