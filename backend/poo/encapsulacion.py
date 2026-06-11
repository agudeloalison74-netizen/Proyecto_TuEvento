class DatosRobot:

    def __init__(self, nombre, bateria):
        self.__nombre = nombre
        self.__bateria = bateria

    def get_nombre(self):
        return self.__nombre

    def get_bateria(self):
        return self.__bateria

    def set_bateria(self, bateria):
        self.__bateria = bateria