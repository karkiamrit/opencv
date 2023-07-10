# from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# from cvzone.HandTrackingModule import HandDetector
# from cvzone.ClassificationModule import Classifier
# import cv2
# import numpy as np
# import math
# import os
# from gtts import gTTS
# import tempfile
# import subprocess
# import pygame


# pygame.mixer.init()

# # Initialize the hand detector and classifier
# detector = HandDetector(maxHands=1)
# classifier = Classifier("HandSignDetection/Scripts/model/keras_model.h5", "HandSignDetection/Scripts/model/labels.txt")

# offset = 20
# imgSize = 400

# folder = "HandSignDetection/Scripts/data/A_to_Z"

# labels = [chr(ord('A') + i) for i in range(26)]

# prev_prediction = ""
# previous_text = ""

# def speak(text):
#     global previous_text
#     if text != previous_text:
#         with tempfile.NamedTemporaryFile(delete=True) as fp:
#             tts = gTTS(text=text, lang='en')
#             tts.save(f"{fp.name}.mp3")
#             pygame.mixer.music.load(f"{fp.name}.mp3")
#             pygame.mixer.music.play()
#         previous_text = text
# @csrf_exempt
# def sign_language_detection(request):
#     print('Sign language detection view called')

#     if request.method == 'POST':
#         if 'image' in request.FILES:
#             image = request.FILES['image']
#             img = cv2.imdecode(np.frombuffer(image.read(), np.uint8), cv2.IMREAD_COLOR)
#         else:
#             return HttpResponse('No image file provided.', status=400)

#         imgOutput = img.copy()
#         hands, img = detector.findHands(img)

#         if hands:
#             hand = hands[0]
#             x, y, w, h = hand['bbox']

#             imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
#             imgCrop = img[y-offset:y+h+offset, x-offset:x+w+offset]
#             imgCropShape = imgCrop.shape

#             aspectRatio = h / w

#             if aspectRatio > 1:
#                 k = imgSize / h
#                 wCal = math.ceil(k * w)
#                 if wCal > 0:  # Check if the width is not empty
#                     imgResize = cv2.resize(imgCrop, (wCal, imgSize))
#                     imgResizeShape = imgResize.shape
#                     wGap = math.ceil((imgSize - wCal) / 2)
#                     imgWhite[:, wGap:wCal+wGap] = imgResize
#                     prediction, index = classifier.getPrediction(imgWhite, draw=False)
#             else:
#                 k = imgSize / w
#                 hCal = math.ceil(k * h)
#                 if hCal > 0:  # Check if the height is not empty
#                     imgResize = cv2.resize(imgCrop, (imgSize, hCal))
#                     imgResizeShape = imgResize.shape
#                     hGap = math.ceil((imgSize - hCal) / 2)
#                     imgWhite[hGap:hCal+hGap, :] = imgResize
#                     prediction, index = classifier.getPrediction(imgWhite, draw=False)

#             cv2.putText(imgOutput, labels[index], (x, y-20), cv2.FONT_HERSHEY_COMPLEX, 2, (255, 0, 255), 2)
#             cv2.rectangle(imgOutput, (x, y), (x+w, y+h), (255, 0, 255), 4)

#             if prediction == prev_prediction:
#                 # Return the predicted output as the HTTP response
#                 return HttpResponse('Sign language detected: {}'.format(labels[index]))

#             # Use the predicted output for speech and set it as the previous prediction
#             speak(labels[index])
#             prev_prediction = prediction

#         # Convert the processed image back to bytes
#         _, img_encoded = cv2.imencode('.png', imgOutput)
#         img_bytes = img_encoded.tobytes()

#         # Return the processed image as the HTTP response
#         return HttpResponse(img_bytes, content_type='image/png')

#     return HttpResponse('Sign language detection endpoint.')































from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import cv2
import numpy as np
import math

cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=1)
classifier = Classifier("HandSignDetection/Scripts/model/keras_model.h5", "HandSignDetection/Scripts/model/labels.txt")
offset = 20
imgSize = 400
labels = [chr(ord('A') + i) for i in range(26)]
prev_prediction = ""

@csrf_exempt
def get_predicted_alphabet(request):
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
        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            if hCal > 0:  # Check if the height is not empty
                imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                imgResizeShape = imgResize.shape
                hGap = math.ceil((imgSize - hCal) / 2)
                imgWhite[hGap:hCal+hGap, :] = imgResize
                prediction, index = classifier.getPrediction(imgWhite, draw=False)

        if prediction != prev_prediction:
            prev_prediction = prediction
            return JsonResponse({'predicted_alphabet': labels[index]})

    return JsonResponse({'predicted_alphabet': None})