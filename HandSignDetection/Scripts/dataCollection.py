import cv2
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import math
import time


cap = cv2.VideoCapture(0)

detector = HandDetector(maxHands=1)

offset = 20
imgSize = 400

folder = "Data/B"

counter = 0
while True:
    success, img = cap.read()
    hands, img = detector.findHands(img)
    
    if hands:
        hand = hands[0]
        x, y, w, h = hand['bbox']

        imgCrop = img[y-offset:y+h+offset, x-offset:x+w+offset]
        
        imgCropShape = imgCrop.shape
        
        aspectRatio = h / w
        if aspectRatio > 1:
            k = imgSize / h
            wCal = math.ceil(k * w)
            imgResize = cv2.resize(imgCrop, (wCal, imgSize))
            wGap = (imgSize - wCal) // 2

            if wGap > 0:
                imgResize = cv2.copyMakeBorder(imgResize, 0, 0, wGap, wGap, cv2.BORDER_CONSTANT, value=(255, 255, 255))
            elif wGap < 0:
                imgResize = imgResize[:, -wGap:wCal + wGap]
        else:
            k = imgSize / w
            hCal = math.ceil(k * h)
            imgResize = cv2.resize(imgCrop, (imgSize, hCal))
            hGap = (imgSize - hCal) // 2

            if hGap > 0:
                imgResize = cv2.copyMakeBorder(imgResize, hGap, hGap, 0, 0, cv2.BORDER_CONSTANT, value=(255, 255, 255))
            elif hGap < 0:
                imgResize = imgResize[-hGap:hCal + hGap, :]
        
        cv2.imshow("Image Crop", imgCrop)
        cv2.imshow("Image White", imgResize)
        
    cv2.imshow("Image", img)
    key = cv2.waitKey(1)
    
    if key == ord("s"):
        counter += 1 
        cv2.imwrite(f'{folder}/Image_{time.time()}.jpg', imgCrop)
        print(counter)
        
    if key == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
