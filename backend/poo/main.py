from encapsulacion import DatosRobot
from herencia import RobotLimpieza
from polimorfismo import RobotSeguridad

try:

    robot1 = DatosRobot("RoboClean", 80)

    print("Nombre:", robot1.get_nombre())
    print("Bateria:", robot1.get_bateria())

    robot1.set_bateria(90)

    print("Nueva bateria:", robot1.get_bateria())

    limpieza = RobotLimpieza()
    seguridad = RobotSeguridad()

    print(limpieza.realizar_tarea())
    print(seguridad.realizar_tarea())

    bateria = int(input("Ingrese el porcentaje de bateria: "))

    if bateria < 0 or bateria > 100:
        raise ValueError("Porcentaje invalido")

    print("Bateria registrada:", bateria)

except ValueError as e:
    print("Error:", e)