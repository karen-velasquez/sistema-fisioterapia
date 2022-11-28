import cv2
import PoseModule as poseModule
import math
import numpy as np
import threading
import pyttsx3
import time



stage = ''
counter = 0
time_exercise = 3.5


'''---------------------------- CONFIGURANDO LA VOZ---------------------------------------------------'''
engine = pyttsx3.init()
voices = engine.getProperty('voices')
# verificando que la voz exista ****REVISAR LUEGO*****
number = 2
if (len(voices) == number):
    number = 0
    print('es mayor')
engine.setProperty('voice', voices[number].id)
# controlando el rate, a higuer rate = mas rapido
engine.setProperty('rate', 150)
'''---------------------------- FINALIZA: CONFIGURANDO LA VOZ---------------------------------------------------'''

'''---------------------------- CONFIGURANDO LA VOZ---------------------------------------------------'''
engine2 = pyttsx3.init()
voices2 = engine2.getProperty('voices')
# verificando que la voz exista ****REVISAR LUEGO*****
number2 = 2
if (len(voices2) == number2):
    number2 = 0
    print('es mayor')
engine2.setProperty('voice', voices2[number2].id)
# controlando el rate, a higuer rate = mas rapido
engine2.setProperty('rate', 150)
'''---------------------------- FINALIZA: CONFIGURANDO LA VOZ---------------------------------------------------'''

'''---------------------------- CONFIGURANDO LA VOZ---------------------------------------------------'''
engine3 = pyttsx3.init()
voices3 = engine3.getProperty('voices')
# verificando que la voz exista ****REVISAR LUEGO*****
number3 = 2
if (len(voices3) == number3):
    number3 = 0
    print('es mayor')
engine3.setProperty('voice', voices3[number3].id)
# controlando el rate, a higuer rate = mas rapido
engine3.setProperty('rate', 150)
'''---------------------------- FINALIZA: CONFIGURANDO LA VOZ---------------------------------------------------'''




'''---------------------------- DIBUJANDO LA IMAGEN QUE SALDRA ---------------------------------------------------'''
'''FUNCION QUE DIBUJA SOBRE EL CV2'''
def draw_cv2(image):
    global counter, stage
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


'''FUNCION QUE DIBUJA LOS LANDMARKS'''
def draw_landmark(results, mp_drawing, mp_pose, image ):
    # Render detections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                    mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))

'''---------------------------- FINALIZA: DIBUJANDO LA IMAGEN QUE SALDRA ---------------------------------------------------'''








'''---------------------------- DIBUJANDO LOS ERRORES ---------------------------------------------------'''
'''FUNCION QUE DIBUJA SOBRE EL CV2'''
def draw_cv2_error(texto_error, image):
    cv2.rectangle(image, (100, 200), (600, 400), (245, 117, 16), -1)
                # Rep data
    cv2.putText(image, texto_error, (120, 270),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.4, (255, 255, 255), 3, cv2.LINE_AA)


'''FUNCION QUE DIBUJA SOBRE EL CV2'''
def draw_cv2_error_flexion(texto_error, image):
    cv2.rectangle(image, (100, 200), (600, 400), (245, 117, 16), -1)
                # Rep data
    cv2.putText(image, texto_error, (120, 270),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.4, (255, 255, 255), 3, cv2.LINE_AA)


'''FUNCION QUE DIBUJA SOBRE EL CV2'''
def draw_cv2_error_time(texto_error, image):
    cv2.rectangle(image, (100, 200), (600, 400), (245, 117, 16), -1)
                # Rep data
    cv2.putText(image, texto_error, (120, 270),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.4, (255, 255, 255), 3, cv2.LINE_AA)
    time.sleep(2)



'''FUNCION QUE DIBUJA LOS LANDMARKS'''
def draw_landmark_2(results, mp_drawing, mp_pose, image ):
    # Render detections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                    mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2))

'''---------------------------- FINALIZA: DIBUJANDO LOS ERRORES ---------------------------------------------------'''










'''---------------------------- CALCULANDO LOS ANGULOS NECESARIOS ---------------------------------------------------'''
#******** Funcion para calcular el angulo entre tres puntos**************
def calculate_angle(a, b, c):
    a = np.array(a)  # First
    b = np.array(b)  # Mid
    c = np.array(c)  # End

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle
    '''a = np.array(a)  # First
    b = np.array(b)  # Mid
    c = np.array(c)  # End

    angle = math.degrees(math.atan2(c[1] - b[1] , c[0] - b[0]) -
                         math.atan2(a[1] - b[1] , a[0] - b[0]))
    if angle < 0:
        angle += 360
    return angle'''



#**************** CALCULANDO EL ANGULO DEL BRAZO IZQUIERDO ******************************
def leftArmAngle(landmarks, mp_pose):
    '''Obteniendo los puntos------'''
    left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
    left_elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
    left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                  landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

    if (landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].visibility > 0.90
        and landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].visibility > 0.90):
        return calculate_angle(left_shoulder, left_elbow, left_wrist)

    else:
        return 0

'''---------------------------- FINALIZA: CALCULANDO LOS ANGULOS NECESARIOS ---------------------------------------------------'''




def thread_timer():
    global time_exercise
    # EL LOOP
    start_time1 = time.process_time()
    time.sleep(2)
    end_time1 = time.process_time()
    time_exercise = end_time1 - start_time1

    print("The time spent in thread is {}".format(end_time1 - start_time1))





'''---------------------------- FEEDBACK DE LOS EJERCICIOS - FORTALECIMIENTO - TREN INFERIOR ---------------------------------------------------'''
#Convirtiendo el texto en voz
def text_to_speech(feedback):
    engine.say(feedback)
    engine.runAndWait()

#Convirtiendo el texto en voz
def text_to_speech2(feedback):
    engine2.say(feedback)
    engine2.runAndWait()

#Convirtiendo el texto en voz
def text_to_speech3(feedback):
    engine3.say(feedback)
    engine3.runAndWait()


#Ejercicio de la sentadilla
def sentadilla(landmarks, mp_pose, image):
    #Ingresando al global stage para modificarlo
    global stage, counter, time_exercise


    #creando la lista de hilos
    list_threads = []

    #Obteniendo el angulo
    left_arm_angle = leftArmAngle(landmarks, mp_pose)
    if left_arm_angle != 0:
        if left_arm_angle > 160:
            stage = "inicial"
        if left_arm_angle > 80 and left_arm_angle < 90 and stage == "inicial":

            if time_exercise<1.8:
                time_exercise = 0.0
                feedback = 'Hazlo mas lento!!!'
                threading.Thread(target=draw_cv2_error_time, args=(feedback, image,)).start()
                #threading.Thread(target=text_to_speech2, args=(feedback,)).start()
            else:
                counter = counter + 1
                stage = "final"
                print(time_exercise)
                threading.Thread(target=text_to_speech2, args=(counter,)).start()
            #Abriendo el hilo que mide el tiempo entre los contadores
            threading.Thread(target=thread_timer, args=()).start()



        elif left_arm_angle < 70:
            feedback = "Estas flexionando mucho tu brazo"
            # Abriendo el hilo que dara la retroalimentacion
            '''print('el angulo de error\n')
            print(left_arm_angle)'''
            '''speaker_thread_2 = threading.Thread(target=text_to_speech2, args=(feedback,)).start()
                    list_threads.append(speaker_thread_2)
                    speaker_thread_2.start()'''
            '''----CREANDO UN HILO QUE EL CV2---'''
            target_thread_draw = threading.Thread(
                target=draw_cv2_error_flexion, args=(feedback, image,)
            )
            list_threads.append(target_thread_draw)
            target_thread_draw.start()

        '''print('\nlos otros angulos\n')
        print(left_arm_angle)'''

    else:
        feedback = 'NO SE VE TU BRAZO'
        '''----CREANDO UN HILO QUE EL CV2---'''
        target_thread_draw = threading.Thread(
            target=draw_cv2_error, args=(feedback, image,)
        )
        list_threads.append(target_thread_draw)
        target_thread_draw.start()


        #threading.Thread(target=text_to_speech3, args=(feedback,)).start()
        '''speaker_thread_3 = threading.Thread(
            target=text_to_speech3, args=(feedback,), kwargs={}
        )
        list_threads.append(speaker_thread_3)
        speaker_thread_3.start()
'''


'''---------------------------- FINALIZA: FEEDBACK DE LOS EJERCICIOS - FORTALECIMIENTO - TREN INFERIOR ---------------------------------------------------'''














'''---------------------------------- OBTENIENDO EL PROCESAMIENTO DE POSES-----------------------------------------------------------'''




def pose_estimation_sentadilla(image, mp_drawing, mp_pose, results):
    list_threads = []
    # Extract landmarks
    try:
        landmarks = results.pose_landmarks.landmark
        #left_leg_angle(landmarks, mp_pose)
        '''----CREANDO UN CALCULE LOS ANGULOS CORPORALES----'''
        target_thread_draw = threading.Thread(
            target=sentadilla, args=(landmarks, mp_pose, image), kwargs={}
        )
        list_threads.append(target_thread_draw)
        target_thread_draw.start()

        '''angle = sentadilla(landmarks, mp_pose)
        print(angle)

            # Visualize angle
        cv2.putText(image, str('hklj'),
                    (100, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                    )'''
    except:
        pass


    '''----CREANDO UN HILO QUE EL CV2---'''
    target_thread_draw = threading.Thread(
            target=draw_cv2, args=(image,)
        )
    list_threads.append(target_thread_draw)
    target_thread_draw.start()

    '''----CREANDO UN HILO QUE DIBUJE LOS PUNTOS----'''
    target_thread_landmark = threading.Thread(
        target=draw_landmark, args=(results, mp_drawing, mp_pose, image, )
    )
    list_threads.append(target_thread_landmark)
    target_thread_landmark.start()

    return image

