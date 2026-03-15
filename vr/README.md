# VR OdotNYC Application

The goal of the application is to allow users to browse the different worlds of OdotNYC through the VR OdotNYC Cardboard.



# Technology:



## Folder Structure: 

vr-odotnyc/
├── index.html
├── worlds.html
├── vr.html
├── assets/
│   ├── logo/
│   │   └── odotnyc-logo.png
│   ├── models/
│   │   ├── preview/
│   │   │   ├── gallery.glb
│   │   │   ├── rooftop.glb
│   │   │   └── city.glb
│   │   └── worlds/
│   │       ├── gallery-world.glb
│   │       ├── rooftop-world.glb
│   │       └── city-world.glb
│   ├── audio/
│   └── ui/
├── css/
│   └── styles.css
└── js/
    ├── app.js
    ├── loader.js
    ├── viewer.js
    ├── worlds.js
    └── vr-mode.js




## Application Flow:

- The user will open the application leaving the landing page to load for 3 seconds
- After 3 seconds the landing page will then transitions to the main screen (VR)
- modal will appear with on screen instructions on how to use VR OdotNYC similar to the Google Cardboard.
- Once the VR world is chosen, then it will open up for the interactivity of the applicaton.