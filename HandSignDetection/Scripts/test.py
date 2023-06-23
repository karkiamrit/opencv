# import cv2
# from cvzone.HandTrackingModule import HandDetector
# from cvzone.ClassificationModule import Classifier
# import numpy as np
# import math
# import os

# os.chdir('opencv/HandSignDetection/Scripts')


# cap = cv2.VideoCapture(0)

# detector = HandDetector(maxHands=1)
# classifier = Classifier("Model/keras_model.h5", "Model/labels.txt")

# offset = 20
# imgSize = 400

# folder = "Data/A_to_Z"

# labels = [chr(ord('A') + i) for i in range(26)]

# while True:
#     success, img = cap.read()
#     imgOutput = img.copy()
#     hands, img = detector.findHands(img)
    
#     if hands:
#         hand = hands[0]
#         x, y, w, h = hand['bbox']
        
#         imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
#         imgCrop = img[y-offset:y+h+offset, x-offset:x+w+offset]
#         imgCropShape = imgCrop.shape
        
#         aspectRatio = h / w
#         if aspectRatio > 1:
#             k = imgSize / h
#             wCal = math.ceil(k * w)
#             imgResize = cv2.resize(imgCrop, (wCal, imgSize))
#             imgResizeShape = imgResize.shape
#             wGap = math.ceil((imgSize - wCal) / 2)
#             imgWhite[:, wGap:wCal+wGap] = imgResize
#             prediction, index = classifier.getPrediction(imgWhite, draw=False)
#             print(prediction, index)
#         else:
#             k = imgSize / w
#             hCal = math.ceil(k * h)
#             imgResize = cv2.resize(imgCrop, (imgSize, hCal))
#             imgResizeShape = imgResize.shape
#             hGap = math.ceil((imgSize - hCal) / 2)
#             imgWhite[hGap:hCal+hGap, :] = imgResize
#             prediction, index = classifier.getPrediction(imgWhite, draw=False)
#             print(prediction, index)

#         cv2.putText(imgOutput, labels[index], (x, y-20), cv2.FONT_HERSHEY_COMPLEX, 2, (255, 0, 255), 2)
#         cv2.rectangle(imgOutput, (x, y), (x+w, y+h), (255, 0, 255), 4)
#         cv2.imshow("Image Crop", imgCrop)
#         cv2.imshow("Image White", imgWhite)

#         if prediction == labels[index]:
#             cv2.imwrite(os.path.join(folder, f"{prediction}.jpg"), imgCrop)
        
#     cv2.imshow("Image", imgOutput)
#     cv2.waitKey(1)
#     if cv2.waitKey(1) == ord("q"):
#         break


import cv2
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import math
import os
from gtts import gTTS
import tempfile
import subprocess
import pygame
pygame.mixer.init()

os.chdir('opencv/HandSignDetection/Scripts')

cap = cv2.VideoCapture(0)

detector = HandDetector(maxHands=1)
classifier = Classifier("Model/keras_model.h5", "Model/labels.txt")

offset = 20
imgSize = 400

folder = "Data/A_to_Z"

labels = [chr(ord('A') + i) for i in range(26)]

prev_prediction = ""
previous_text=""

def speak(text):
    global previous_text
    if text != previous_text:
        with tempfile.NamedTemporaryFile(delete=True) as fp:
            tts = gTTS(text=text, lang='en')
            tts.save(f"{fp.name}.mp3")
            pygame.mixer.music.load(f"{fp.name}.mp3")
            pygame.mixer.music.play()
        previous_text = text

while True:
    success, img = cap.read()
    imgOutput = img.copy()
    hands, img = detector.findHands(img)
    
    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']
        
        imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
        imgCrop = img[y-offset:y+h+offset, x-offset:x+w+offset]
        imgCropShape = imgCrop.shape
        
        aspectRatio = h / w
        
        
        if aspectRatio > 1:
            k = imgSize / h
            wCal = math.ceil(k * w)
            if wCal > 0:  # Check if the width is not empty
                imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                imgResizeShape = imgResize.shape
                wGap = math.ceil((imgSize - wCal) / 2)
                imgWhite[:, wGap:wCal+wGap] = imgResize
                prediction, index = classifier.getPrediction(imgWhite, draw=False)
                print(prediction, index)
        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            if hCal > 0:  # Check if the height is not empty
                imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                imgResizeShape = imgResize.shape
                hGap = math.ceil((imgSize - hCal) / 2)
                imgWhite[hGap:hCal+hGap, :] = imgResize
                prediction, index = classifier.getPrediction(imgWhite, draw=False)
                print(prediction, index)
                
        
        
        # if aspectRatio > 1:
        #     k = imgSize / h
        #     wCal = math.ceil(k * w)
        #     imgResize = cv2.resize(imgCrop, (wCal, imgSize))
        #     imgResizeShape = imgResize.shape
        #     wGap = math.ceil((imgSize - wCal) / 2)
        #     imgWhite[:, wGap:wCal+wGap] = imgResize
        #     prediction, index = classifier.getPrediction(imgWhite, draw=False)
        # else:
        #     k = imgSize / w
        #     hCal = math.ceil(k * h)
        #     imgResize = cv2.resize(imgCrop, (imgSize, hCal))
        #     imgResizeShape = imgResize.shape
        #     hGap = math.ceil((imgSize - hCal) / 2)
        #     imgWhite[hGap:hCal+hGap, :] = imgResize
        #     prediction, index = classifier.getPrediction(imgWhite, draw=False)
        

        cv2.putText(imgOutput, labels[index], (x, y-20), cv2.FONT_HERSHEY_COMPLEX, 2, (255, 0, 255), 2)
        cv2.rectangle(imgOutput, (x, y), (x+w, y+h), (255, 0, 255), 4)
        cv2.imshow("Image Crop", imgCrop)
        cv2.imshow("Image White", imgWhite)

        if prediction == prev_prediction:
            continue

        speak(labels[index])
        prev_prediction = prediction

    cv2.imshow("Image", imgOutput)
    cv2.waitKey(1)
    if cv2.waitKey(1) == ord("q"):
        break
