from abc import ABC, abstractmethod

class Robot(ABC):

    @abstractmethod
    def realizar_tarea(self):
        pass