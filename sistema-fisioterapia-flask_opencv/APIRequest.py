import requests  #Importamos la librería requests

print("SOLICITANDO INFORMACION DE INTERNET")
print("espere....")
URL = 'http://localhost:5000/asignado/listar' #configuramos la url

#solicitamos la información y guardamos la respuesta en data.
data = requests.get(URL)
if(data.status_code==0):
            print('No hay conexion con el servidor')

data = data.json() #convertimos la respuesta en dict

for element in data: #iteramos sobre data
    print("----------------------------")
    print(element) #Accedemos a sus valores



r = requests.post('http://localhost:5000/generate-token',
                  json={
                        "username":"karen123",
                        "password":"123"
                    })
print(r.status_code)
data = r.json()
token = ''
if(r.status_code==200):
    print('El usuario si existe')
    token = data['token']
    print(data['token'])  # Accedemos a sus valores


else:
    if(r.status_code==500):
        print('El usuario no existe')
    else:
        if(r.status_code==0):
            print('No hay conexion con el servidor')


endpoint = "http://localhost:5000/ejercicio/listar"
#data = {"ip": "1.1.2.3"}
headers = {"Authorization": "Bearer "+str(token)}
print(headers)


request = requests.get(endpoint,headers=headers).json()
print('holi')
print(request)