import pyttsx
from Queue import Queue
from threading import Thread

q = Queue()

def say_loop():
    engine = pyttsx.init()
    while True:
        engine.say(q.get())
        engine.runAndWait()
        q.task_done()

def another_method():
    t = Thread(target=say_loop)
    t.daemon = True
    t.start()
    for i in range(0, 3):
        q.put('Sally sells seashells by the seashore.')
    print ("end of another method...")

def third_method():
    q.put('Something Something Something')

if __name__=="__main__":
    another_method()
    third_method()
    q.join() # ends the loop when queue is empty