import cv2
import mediapipe as mp
import numpy as np
import pyttsx3
import threading
import time

from BD.conexion import DAO

from AudioCommSys import text_to_speech







#Configurando la voz
engine = pyttsx3.init()
voices = engine.getProperty('voices')

#verificando que la voz exista REVISAR LUEGO
number = 2
if(len(voices) == number):
    number = 0
    print('es mayor')
engine.setProperty('voice', voices[number].id)
#controlando el rate, a higuer rate = mas rapido
engine.setProperty('rate',150)



# M = cv2.getRotationMatrix2D((ancho//2,alto//2), 180, 1)
# frame = cv2.warpAffine(frame, M, (ancho,alto))


mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

start_time1 = None
end_time1 = None

# cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
#'C:/Users/asus/Desktop/Videos_Ejercicios/videos_grals/TrenInferior/Elongacion/flexionrodilla.mp4'
#'C:/Users/asus/Desktop/Videos_Ejercicios/videos_grals/TrenInferior/Fortalecimiento/sentadilla.mp4'
#'C:/Users/asus/Desktop/Videos_Ejercicios/videos_grals/TrenSuperior/Elongacion/extensionarribatras.mp4'
string = 'C:/Users/asus/Desktop/Videos_Ejercicios/videos_grals/TrenSuperior/Fortalecimiento/remosdorsales.mp4'
cap = cv2.VideoCapture(string)


# cap = cv2.VideoCapture(0)

# Curl counter variables
counter = 0
stage = None
feedback = ''



def ejecutar():
    dao = DAO()
    cursos = dao.listar()
    print(cursos)

def threadexample1():
    global start_time1, end_time1

    # EL LOOP
    #start_time1 = time.thread_time()
    start_time1 = time.process_time()
    print("{:.6f}".format(start_time1))
    time.sleep(2)
   # end_time1 = time.thread_time()
    end_time1 = time.process_time()
    # threadTarget.join()
    print("{:.6f}".format(end_time1))

    print("The time spent in thread is {}".format(end_time1 - start_time1))

def calculate_angle(a, b, c):
    a = np.array(a)  # First
    b = np.array(b)  # Mid
    c = np.array(c)  # End

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle

def text_to_speech2():
    engine.say(feedback)
    engine.runAndWait()


''' ------------------------------DESDE AQUI SE CALCULARAN TODO LOS ANGULOS-----------------------------'''

''' *******************************************TREN INFERIOR-*****************************************************'''

'''++++++++++++++++++++++++++ELONGACION++++++++++++++++++++++'''
def extension_rodilla_agarrar_punta (landmarks):
    list_threads = []
    global counter
    global stage
    global engine
    global feedback
    # Obteniendo las coordenadas
    left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
    left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

    # Calculando el angulo de los tres puntos enviados
    angle = calculate_angle(left_hip, left_knee, left_ankle)

    #postura inicial
    if angle > 170 and angle<180:
        stage = "postura inicial"
    else:
        stage = 'ya no posicicon inivial'


    #retornando el angulo
    return angle



def extension_tobillo_bandas (landmarks):
    list_threads = []
    global counter
    global stage
    global engine
    global feedback
    # Obteniendo las coordenadas
    left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                       landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
    left_foot_index = [landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y]

    # Calculando el angulo de los tres puntos enviados
    angle = calculate_angle(left_knee, left_ankle, left_foot_index)

    #postura inicial
    if angle > 90 and angle<100:
        stage = "postura inicial"
    else:
        #postura final
        if angle > 120 and angle < 140:
            stage = "ya no postura inicial"


    #camara: totalmente de costado.

    #retornando el angulo
    return angle




def flexion_rodilla (landmarks):
    list_threads = []
    global counter
    global stage
    global engine
    global feedback
    # Obteniendo las coordenadas

    left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
    left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

    # Calculando el angulo de los tres puntos enviados
    angle = calculate_angle(left_hip, left_knee, left_ankle)

    #CAMARA: HAY QUE POSICIONAR NO TOTALMENTE DE COSTADO AUNQUE DA MAS O MENOS, SI NO UN POCO INCLINAOD
    #postura inicial
    if angle > 170 and angle<180:
        stage = "postura inicial"
    else:
        #postura final
        if angle > 10 and angle < 20:
            stage = "ya no postura inicial"


    #camara: totalmente de costado.
    #retornando el angulo
    return angle

'''+++++++++++++++++++++++++++++++++FORTALECIMIENTO++++++++++++++++++++++++++++'''
def elevacion_tobillo(landmarks):
    list_threads = []
    global counter
    global stage
    global engine
    global feedback
    # Obteniendo las coordenadas

    #ESTE ES DE LAS RODILLAS
    left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
    left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

    #VER EL OTRO ANGULOOO DEL TOBILLO
    # Obteniendo las coordenadas
    left_foot_index = [landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y]



    # Calculando el angulo de los tres puntos enviados
    angle = calculate_angle(left_hip, left_knee, left_ankle)


    #ANGULO DEL TOBILLOOOO
    second_angle = calculate_angle(left_knee, left_ankle, left_foot_index)

    #postura inicial
    if angle > 170 and angle<180 and second_angle>110 and second_angle<130:
        stage = "postura inicial"
    else:
        if second_angle>150 and second_angle<160:
            stage = 'no postura'

    #camara: totalmente de costado.
    #retornando el angulo
    return second_angle




def sentadilla_1(landmarks):
    list_threads = []
    global counter
    global stage
    global engine
    global feedback
    # Obteniendo las coordenadas

    #ESTE ES DE LAS RODILLAS
    left_hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y]
    left_knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
    left_ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

    #VER EL OTRO ANGULOOO DEL TOBILLO


    # Calculando el angulo de los tres puntos enviados
    angle = calculate_angle(left_hip, left_knee, left_ankle)

    #postura inicial
    if angle > 170 and angle<180:
        stage = "postura inicial"
    else:
        if angle>120 and angle<130:
            stage = 'no postura'

    #camara: totalmente de costado.
    #retornando el angulo
    return angle




''' ------------------------------DESDE AQUI SE CALCULARAN TODO LOS ANGULOS-----------------------------'''

''' *******************************************TREN SUPERIOR-*****************************************************'''

'''+++++++++++++++++++++++++++++++++++++++++++++++++ ELONGACION ++++++++++++++++++++++++++++++++++++'''

def ejercicio_cobra(landmarks):
    list_threads = []
    global counter
    global stage
    global engine
    global feedback
    # Obteniendo las coordenadas

    #ESTE ES DE LAS RODILLAS
    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]



    # Calculando el angulo de los tres puntos enviados
    angle = calculate_angle(left_shoulder, left_elbow, left_wrist)

    #postura inicial
    if angle > 40 and angle<50:
        stage = "postura inicial"
    else:
        if angle>150 and angle<170:
            stage = 'no postura'

    #camara: totalmente de costado.
    #retornando el angulo
    return angle



def extension_arriba_atras(landmarks):
    list_threads = []
    global counter
    global stage
    global engine
    global feedback
    # Obteniendo las coordenadas

    #ESTE ES DE LAS RODILLAS
    right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
    right_elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
             landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
    right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,
             landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]



    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

    # Calculando el angulo de los tres puntos enviados
    second_angle = calculate_angle(right_shoulder, right_elbow, right_wrist)

    angle = calculate_angle(left_shoulder, left_elbow, left_wrist)

    #postura inicial
    if angle > 90:
        stage = "postura inicial"
    else:
        if angle<90 and angle>30:
            stage = 'no postura'

    #camara: totalmente de costado.
    #retornando el angulo
    return angle





'''+++++++++++++++++++++++++++++++++++++++++++++++++ FORTALECIMIENTO ++++++++++++++++++++++++++++++++++++'''
def remos_dorsales(landmarks):
    list_threads = []
    global counter
    global stage
    global engine
    global feedback
    # Obteniendo las coordenadas

    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

    angle = calculate_angle(left_shoulder, left_elbow, left_wrist)

    #postura inicial
    if angle > 120 and angle<180:
        stage = "postura inicial"
    else:
        if angle<90 and angle>70:
            stage = 'no postura'

    #camara: totalmente de costado.
    #retornando el angulo
    return angle









def sentadilla(landmarks):
    list_threads = []

    global counter
    global stage
    global engine
    global feedback
    # Obteniendo las coordenadas
    shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
             landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

    # Calculando el angulo de los tres puntos enviados
    angle = calculate_angle(shoulder, elbow, wrist)



    # El contador de Curls
    if angle > 160:
        stage = "down"
    if angle < 90 and stage == 'down':
        if(angle>80):
            feedback = "Estas flexionando mucho tu brazo"
        stage = "up"
        counter += 1

        # Inicializando el hilo
        speaker_thread = threading.Thread(
            target=text_to_speech2, args= (), kwargs={}
        )
        list_threads.append(speaker_thread)
        speaker_thread.start()
        print(counter)

        target_thread= threading.Thread(
            target=threadexample1, args=(), kwargs={}
        )
        list_threads.append(target_thread)
        target_thread.start()
    #retornando el angulo
    return angle












## Setup mediapipe instance
with mp_pose.Pose(
        static_image_mode=False,
        min_detection_confidence=0.7,
        smooth_landmarks=True,
        min_tracking_confidence=0.7) as pose:
    while True:

        ret, frame = cap.read()

        # Recolor image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False

        # Make detection
        results = pose.process(image)

        # Recolor back to BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # Extract landmarks
        try:
            landmarks = results.pose_landmarks.landmark


            angle = remos_dorsales(landmarks)

            # Visualize angle
            cv2.putText(image, str(angle),
                        (100, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                        )




        except:
            pass

        #if (counter == 1):
         #   ejecutar()

        # Render curl counter
        # Setup status box
        cv2.rectangle(image, (0, 0), (225, 73), (245, 117, 16), -1)
        # Rep data
        cv2.putText(image, 'REPS', (15, 12),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(image, str(counter),
                    (10, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)
        # Stage data
        cv2.putText(image, 'STAGE', (65, 12),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1, cv2.LINE_AA)
        cv2.putText(image, stage,
                    (60, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 2, cv2.LINE_AA)
        # Render detections
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                  mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                  mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))

        cv2.imshow('Mediapipe Feed', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

        #if(counter == 4):
        #    mp_drawing.plot_landmarks(results.pose_world_landmarks)


        #print("Este es el angulo "+str(angle))

    cap.release()
    cv2.destroyAllWindows()







'''rom flask import Flask, jsonify
from flask import render_template
from flask import Response
from flask_cors import CORS,cross_origin
import cv2
import mediapipe as mp
import numpy as np'''

'''
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

app = Flask(__name__)
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

CORS(app, support_credentials=True)

#global variable
x = 0
print(x)


def generate():
    global x 
    
    x = 0
    
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while True:
            ret, frame = cap.read()
            
            # Recolor image to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
        
            # Make detection
            results = pose.process(image)
        
            # Recolor back to BGR
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                    mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2) 
                                    )               
            
           
            
            x = x + 1
            #Text
            # font
            font = cv2.FONT_HERSHEY_SIMPLEX 
            # org
            org = (50, 50)         
            # fontScale
            fontScale = 1          
            # Blue color in BGR
            color = (255, 0, 0)       
            # Line thickness of 2 px
            thickness = 2           
            # Using cv2.putText() method
            image = cv2.putText(image, str(x) , org, font, 
                            fontScale, color, thickness, cv2.LINE_AA)
           
           
            
            (flag, encodedImage) = cv2.imencode(".jpg", image) 
            if not flag:
                continue
            yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                bytearray(encodedImage) + b'\r\n')
  
  
        
  
def valor():
    global x 
    return jsonify({
            'valor': x
        })      
      
      
      
       
       
def generate2():
    global x 
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while True:
            ret, frame = cap.read()
            
            # Recolor image to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
        
            # Make detection
            results = pose.process(image)
        
            # Recolor back to BGR
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            # Render detections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                    mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2) 
                                    )               
            

            #Text
            # font
            font = cv2.FONT_HERSHEY_SIMPLEX 
            # org
            org = (50, 50)         
            # fontScale
            fontScale = 1          
            # Blue color in BGR
            color = (255, 0, 0)       
            # Line thickness of 2 px
            thickness = 2           
            # Using cv2.putText() method
            image = cv2.putText(image, str(x) , org, font, 
                            fontScale, color, thickness, cv2.LINE_AA)
           
           
            
            (flag, encodedImage) = cv2.imencode(".jpg", image) 
            if not flag:
                continue
            yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
                bytearray(encodedImage) + b'\r\n')       
       
       
       
              
              
               
@app.route("/")
def index():
     return render_template("index.html")
 
@app.route("/video_feed")
def video_feed():
     return Response(generate(),
          mimetype = "multipart/x-mixed-replace; boundary=frame")
     
@app.route("/video_feed2")
def video_feed2():
     return Response(generate2(),
          mimetype = "multipart/x-mixed-replace; boundary=frame")
     
     
@app.route('/valor', methods=['GET'])    
def valor():
    global x 
    response = jsonify({
            'valor': x
        })
    
    return response
     
if __name__ == "__main__":
     app.run(debug=False)
cap.release()'''





'''import cv2
import mediapipe as mp
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

"""while cap.isOpened():
mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), """
'''
'''cap = cv2.VideoCapture("images/videos/curl2.mp4")'''
'''cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)'''


'''-------- Funcion para calcular angulos -----------'''
'''def calculate_angle(a,b,c):
    a = np.array(a) # First
    b = np.array(b) # Mid
    c = np.array(c) # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle >180.0:
        angle = 360-angle
        
    return angle '''
'''-------- Fin Funcion para calcular angulos -----------'''



## Setup mediapipe instance


# Curl counter variables
'''counter = 0 
stage = None

## Setup mediapipe instance
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret, frame = cap.read()
        
        # Recolor image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
      
        # Make detection
        results = pose.process(image)
    
        # Recolor back to BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        # Extract landmarks
        try:
            landmarks = results.pose_landmarks.landmark
            
            # Get coordinates
            shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
            wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
            
            # Calculate angle
            angle = calculate_angle(shoulder, elbow, wrist)
            
            # Visualize angle
            cv2.putText(image, str(angle), 
                           tuple(np.multiply(elbow, [640, 480]).astype(int)), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                                )
            
            # Curl counter logic
            if angle > 160:
                stage = "down"
            if angle < 30 and stage =='down':
                stage="up"
                counter +=1
                print(counter)
                       
        except:
            pass
        
        # Render curl counter
        # Setup status box
        cv2.rectangle(image, (0,0), (225,73), (245,117,16), -1)
        
        # Rep data
        cv2.putText(image, 'REPS', (15,12), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 1, cv2.LINE_AA)
        cv2.putText(image, str(counter), 
                    (10,60), 
                    cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)
        
        # Stage data
        cv2.putText(image, 'STAGE', (65,12), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 1, cv2.LINE_AA)
        cv2.putText(image, stage, 
                    (60,60), 
                    cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)
        
        
        # Render detections
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2) 
                                 )               
        
        cv2.imshow('Mediapipe Feed', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
 









"""
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
face_detector = cv2.CascadeClassifier(cv2.data.haarcascades + 
                                    "haarcascade_frontalface_default.xml")


while True:
    ret, frame = cap.read()
    if ret:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_detector.detectMultiScale(gray, 1.3, 5)
        for(x, y, w, h) in faces:
            cv2.rectangle(frame,(x,y), (x + w, y + h),(0, 255, 0))
        cv2.imshow("Frame", frame)
        
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break
        
cap.release()
cv2.destroyAllWindows()"""'''