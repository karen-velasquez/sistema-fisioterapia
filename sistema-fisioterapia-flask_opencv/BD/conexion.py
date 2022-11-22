import mysql.connector
from mysql.connector import Error

class DAO():

    def __init__(self):
        try:
            self.conexion = mysql.connector.connect(
                host='localhost',
                port='3306',
                user='root',
                password='root',
                db ='sistema_fisioterapia_spring_boot'
            )
        except Error as ex:
            print('Error al tratar de conectar: {0} '.format(ex))

    def listar(self):
        if self.conexion.is_connected():
            try:
                cursor = self.conexion.cursor()
                cursor.execute("SELECT * FROM ejercicios")
                resultados = cursor.fetchall()
                for fila in resultados:
                    print('holi')
                    print(fila[0])
                    print(fila[1])
                return resultados

            except Error as ex:
                print("Error al intentar la conexion")

def main():
    dao = DAO()
    dao.listar()

if __name__ == "__main__":
    main()
