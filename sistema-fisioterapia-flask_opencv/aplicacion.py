import cv2
import mediapipe as mp
import numpy as np


mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose


#cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

cap = cv2.VideoCapture('C:/Users/asus/Desktop/Videos_Ejercicios/videos/TrenInferior/Fortalecimiento/sentadilla.mp4')



with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while True:
        ret, frame = cap.read()
        
        ancho = frame.shape[1]
        alto = frame.shape[0]
        M = cv2.getRotationMatrix2D((ancho//2,alto//2), 180, 1)
        frame = cv2.warpAffine(frame, M, (ancho,alto)) 
        
        
        # Recolor image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        
        # Make detection
        results = pose.process(image)
        
        # Recolor back to BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        
        
       # image = cv2.resize(image, (200, 200))
            
        # Render detections
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2) 
                                )               
            
           
            
       
        #Text
        # font
        ''' font = cv2.FONT_HERSHEY_SIMPLEX 
        # org
        org = (50, 50)         
        # fontScale
        fontScale = 1          
        # Blue color in BGR
        color = (255, 0, 0)       
        # Line thickness of 2 px
        thickness = 2           
        # Using cv2.putText() method
        image = cv2.putText(image, 'hola' , org, font, 
                        fontScale, color, thickness, cv2.LINE_AA)'''
        
        cv2.imshow("image", image)
            
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        
cap.release()
cv2.destroyAllWindows()
        
        
  
       
       
def sentadilla():
    return 'hola'