from kivymd.app import MDApp
import APIRequest as request

# Inicializando
endpoint = 'http://localhost:5000/'
token = ''
class AppAPIRequest():

    def __init__(self):
        pass

    # Redireciona para o dashboard
    def calllogin(self, username, password):
        #Llamando el endpoint
        global endpoint

        token = request.APIRequest.gettoken(self, username, password, endpoint)

        if(token != 500 and token != 0 and token!=''):
            MDApp.get_running_app().root.current = 'listExercise'
            return token
        else:
            print('Hubo problemas en la autenticacion')


    #Funcion para obtener el token para conectarnos
    def callbackregister(self, *args):
        MDApp.get_running_app().root.current = 'login'




