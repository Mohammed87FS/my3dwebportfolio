<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import {
    CSS3DRenderer,
    CSS3DObject,
  } from "three/examples/jsm/renderers/CSS3DRenderer.js";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
  import TWEEN from "@tweenjs/tween.js";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  import { WebGLRenderer } from "three";

  let webGLRenderer;
  let container;
  let camera;
  let raycaster;

  let mouse = new THREE.Vector2();

  let frontSide;

  let computer;
  let scene;
  let renderer;

  const cubeSize = 3000;
  const cameraDistance = cubeSize * 2;
  let cube;

  let width;
  let height;
  const start = `
 

`;

  const welcome = `


<h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-top: 600px; font-size: 12rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
    Welcome to my world!
  </h1>


 `;

  const profileContent = `
<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 150px">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
   About me
  </h1>

  <ul style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; ">
    <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color: #FFD700;">Name:</strong>
      <ul>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Mohammed Alhamadani.</li>
      </ul>
    </li>
    <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color: #FFD700;">Study Programme:</strong>
      <ul>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Creative Computing at FH St. Pölten.</li>
      </ul>
    </li>
   
    <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color:#FFD700;">Interests:</strong>
      <ul>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Tech, Mathes, Art, Music, Board-Games. </li>
      </ul>
    </li>

    <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color:#FFD700;">Languages:</strong>
      <ul>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">German, English, Arabic.</li>
      </ul>
    </li>
   
  </ul></div>

`;

  const skillsContent = `


    <div class="content" style="font-size: 4.6rem; font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px;">
      <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
 My Skills
  </h1>
    <ul style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; ">
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color: #FFD700;">Programming-Skills:</strong>
            <ul>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">JavaScript, Node js, Vue, Nuxt, Sveltekit, React, Three js.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Python.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Java & JavaFx.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Kotlin.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">C & Arduino.</li>
            </ul>
        </li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong strong style="color: #FFD700;"> Other Professional Skills:</strong>
            <ul>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Agile Methodologies & Team Dynamics.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Mathematics. </li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">ML. </li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">UI/UX Design.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">HCI.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">3D Modeling in Blender.</li>
             
           

            </ul>
        </li>
    </ul>
</div>


`;

  const projectsContent = `
  <div class="content" style="font-size: 4.6rem; font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px;">
  <h1 style="text-align: center; text-transform: uppercase; font-family: 'Press Start 2P', cursive; margin-bottom: 300px; color: #FFAA00; text-shadow: 
  1px 1px 0 #FF0000, 
  2px 2px 0 #FF0000, 
  3px 3px 0 #FF0000, 
  4px 4px 0 #FF0000, 
  5px 5px 0 #FF0000, 
  6px 6px 0 #FF0000, 
  7px 7px 0 #FF0000, 
  8px 8px 0 #FF0000, 
  9px 9px 0 #FF0000, 
  10px 10px 0 #FF0000, 
  11px 11px 0 #FF0000, 
  12px 12px 0 #FF0000, 
  13px 13px 0 #FF0000, 
  14px 14px 0 #FF0000, 
  15px 15px 0 #FF0000;">My Projects</h1>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 60px; margin-left: 0px">

  <div style="margin-bottom: 20px;">
    <button id="my-button1" style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 4.6rem; line-height: 1.5; width: 100%;">
      <img src="/games.svg" alt="Fortress Icon" style="height: 250px; width: auto; filter: brightness(0) invert(1);">
      <strong style="color: #FFD700;">Fortress</strong>
    </button>
  </div>


  <div style="margin-bottom: 20px;">
    <button id="my-button2" style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 4.6rem; line-height: 1.5; width: 100%;">
      <img src="/ai.svg" alt="E-Commerce Icon" style="height: 250px; width: auto; filter: brightness(0) invert(1);">
      <strong style="color: #FFD700;">E-Commerce</strong>
    </button>
  </div>


  <div style="margin-bottom: 20px;">
    <button id="my-button3" style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 4.6rem; line-height: 1.5; width: 100%;">
      <img src="/web.svg" alt="MyGymBro Icon" style="height: 250px; width: auto; filter: brightness(0) invert(1);">
      <strong style="color: #FFD700;">MyGymBro</strong>
    </button>
  </div>

  
  <div style="margin-bottom: 20px;">
    <button id="my-button4" style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 4.6rem; line-height: 1.5; width: 100%;">
      <img src="/android.svg" alt="Mathemello Icon" style="height: 250px; width: auto; filter: brightness(0) invert(1);">
      <strong style="color: #FFD700;">Mathemello</strong>
    </button>
  </div>

 
  <div style="margin-bottom: 20px;">
    <button id="my-button5" style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 4.6rem; line-height: 1.5; width: 100%;">
      <img src="/web.svg" alt="Disconnect Icon" style="height: 250px; width: auto; filter: brightness(0) invert(1);">
      <strong style="color: #FFD700;">Disconnect</strong>
    </button>
  </div>


  <div style="margin-bottom: 20px;">
    <button id="my-button7" style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 4.6rem; line-height: 1.5; width: 100%;">
      <img src="/design.svg" alt="Rosetta Icon" style="height: 250px; width: auto; filter: brightness(0) invert(1);">
      <strong style="color: #FFD700;">Rosetta</strong>
    </button>
  </div>


  <div style="margin-bottom: 20px;">
    <button id="my-button8" style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 4.6rem; line-height: 1.5; width: 100%;">
      <img src="/web.svg" alt="Portfolio Icon" style="height: 250px; width: auto; filter: brightness(0) invert(1);">
      <strong style="color: #FFD700;">Portfolio</strong>
    </button>
  </div>
</div>
</div>




`;

  const Fortress = `<div class="content" style="font-size: 4.6rem; font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="text-align: center; text-transform: uppercase; font-family: 'Press Start 2P', cursive; margin-bottom: 200px; color: #FFA500; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
    Fortress
  </h1>

  <p style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">A 2D game where earth as a spaceship battles global threats. Inspired by "Space Invaders" with advanced weapons and tech.</p>
  <ul style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 50px;">
  
    <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color: #FFD700;">Programming & Tech:</strong>
      <ul>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Built with JavaScript and HTML5 Canvas.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Dynamic gameplay and immersive visuals.</li>
      </ul>
    </li>
  </ul>
  <button id="my-button9" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >See images </strong></button>

  <button id="my-button6" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;"><strong style="color:#B0FFB0;">Back</strong></button>
</div>


`;

  const MyGymBro = `
 
<div class="content" style="font-size: 4.6rem; font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive;margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
 MyGymBro
  </h1>
  <p style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"> A platform for tracking and analyzing personal fitness data. </p>

  <ul style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 50px;">
    <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color: #FFD700;">Key Features:</strong>
      <ul>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"> Registration and Login process.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Calories Calculator for food items with historical data visualization.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Goal Setting and tracking personalized fitness objectives.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">BMI Calculator.</li>
      </ul>
    </li>
    <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color: #FFD700;">Technology Stack:</strong>
      <ul>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Node.js and Express for server-side logic.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">EJS for dynamic page rendering.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">SQLite for database management.</li>
      </ul>
    </li>
  </ul>

  <button id="my-button12" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >See an image </strong></button>

<button id="my-button6" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;"><strong style="color:#B0FFB0;">Back</strong> </button>
</div>



`;

  const Mathemello = `
<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive;margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
Mathemello
  </h1>
  <p style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">A mobile user-friendly app , serves as a platform for Mathes-enjoyers. Utilizing Kotlin for its development.</p>
    <ul style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 50px;">
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color: #FFD700;">Key Features:</strong>
            <ul>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"> Login/Register with Firebase.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Role-based access for users and admin.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">User request submission and tracking.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Admin features for request management and post creation.</li>
                <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Direct feedback for request acceptance.</li>
            </ul>
        </li>
    </ul>
    <button id="my-button11" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >See images </strong></button>

 <button id="my-button6" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;"><strong style="color:#B0FFB0;">Back</strong> </button>
</div>



`;

  const Commerce = `
<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
E-Commerce
  </h1>
  <p style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">A ML model for sorting e-commerce texts into categories.</p>
    <ul style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 50px;">
        <li style="margin-bottom: 10px;"><strong style="color: #FFD700;">Methodology:</strong>
            <ul>
                <li style="margin-bottom: 10px;">Preprocessing with Spacy and TfidfVectorizer.</li>
                <li style="margin-bottom: 10px;">Modeling with XGBoost and RandomForest classifiers.</li>
                <li style="margin-bottom: 10px;">Performance tuning via GridSearchCV.</li>
            </ul>
        </li>
        <li style="margin-bottom: 10px;"><strong style="color: #FFD700;">Evaluation:</strong>
            <ul>
                <li style="margin-bottom: 10px;">Accuracy, F1 score, and confusion matrices.</li>
                <li style="margin-bottom: 10px;">RandomForest outperformed in F1 score.</li>
            </ul>
        </li>
    </ul>
    <button id="my-button10" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >See an image </strong></button>

 <button id="my-button6" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;"><strong style=" color:#B0FFB0;">Back</strong> </button>
</div>



`;

  const Disconnect = `
<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
    Disconnect
  </h1>
  <p style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">The device, termed "Disconnect," is made to minimize distractions. Equipped with a Raspberry Pi 4, programmed with Nuxt js. It's designed for users seeking focused interaction with technology.</p>
    <ul style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 50px;">
        <li style="margin-bottom: 10px;"><strong style="color: #FFD700;">Key Features:</strong>
            <ul>
                
                <li style="margin-bottom: 10px;">Pocketbase for storage.</li>
                <li style="margin-bottom: 10px;">Clock with alarm, timer, and stopwatch.</li>
                <li style="margin-bottom: 10px;">GPT API.</li>
                <li style="margin-bottom: 10px;">Calendar for managing schedules.</li>
                <li style="margin-bottom: 10px;">Note-taking capabilities.</li>
                <li style="margin-bottom: 10px;">Weather updates.</li>
            </ul>
        </li>
    </ul>

    <button id="my-button13" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >See an image </strong></button>

<button id="my-button6" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;"><strong style="color:#B0FFB0;">Back</strong> </button>
</div>



`;

  const Rosetta = `
<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
    Rosetta
  </h1>  <p style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Rosetta (UX/UI project) aims to revolutionize language learning for travelers, enabling them to master 100 essential words in a new language within a week..</p>
  <ul style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 50px;">
    <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color: #FFD700;">Key Features:</strong>
      <ul>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Categorized Learning Modules for focused study.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Interactive Dialogues to enhance word retention.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Milestone Tests to validate learning progress.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">AI-Assisted Practice for realistic conversation simulation.</li>

      </ul>
    </li>
  </ul>

  <button id="my-button14" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >See images </strong></button>

<button id="my-button6" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;"><strong style="color:#B0FFB0;">Back</strong> </button>
</div>



`;

  const Portfolio = `
<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
    Portfolio
  </h1>  <p style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">I wanted to challange myself and create something different for my own website, that is why i chose Three.js and CSS3DRenderer, combined with the efficiency of SvelteKit.</p>
  <ul style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 50px;">
    <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;"><strong style="color: #FFD700;">Highlights:</strong>
      <ul>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Interactive 3D Experience with Three.js.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Seamless Integration using CSS3DRenderer.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Built with the modern framework of SvelteKit.</li>
        <li style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px;">Original 3D models enhancing the visual narrative.</li>
      </ul>
    </li>
  </ul>

<button id="my-button6" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >Back</strong></button>
</div>



`;

  const caroFortress = `


<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
 Fortress 
  </h1> 
 
 
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); border: 20px solid #87CEFA; border-radius: 50px; gap: 150px; margin-top: 50px; background-color: black; padding: 50px; grid-auto-rows: min-content; overflow: hidden;">

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for1.gif" alt="E-Commerce Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for2.gif" alt="MyGymBro Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>


<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for4.png" alt="Disconnect Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for5.png" alt="Rosetta Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>



</div>

</div>



<button id="my-button1" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >Back</strong></button>


`;

  const caroCommecre = `



  <div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
  E-Commerce 
  </h1> 
 
  <div style="display: grid; grid-template-columns: repeat(1, 1fr); border: 20px solid #87CEFA; border-radius: 50px; gap: 150px; margin-top: 50px; background-color: black; padding: 50px; grid-auto-rows: min-content; overflow: hidden;">




<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/comer.png" alt="Mathemello Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>





</div>
  
</div>


<button id="my-button2" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >Back</strong></button>




`;

  const caroMathe = `


<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
   Mathemello
  </h1> 
 
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); border: 20px solid #87CEFA; border-radius: 50px; gap: 150px; margin-top: 50px; background-color: black; padding: 50px; grid-auto-rows: min-content; overflow: hidden;">

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/mathe1.png" alt="E-Commerce Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/mathe2.png" alt="MyGymBro Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/mathe3.png" alt="Mathemello Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>



</div>
  
</div>

<button id="my-button4" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >Back</strong></button>




`;

  const caroGym = `


<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
   MyGymBro 
  </h1> 
 
  <div style="display: grid; grid-template-columns: repeat(1, 1fr); border: 20px solid #87CEFA; border-radius: 50px; gap: 50px; margin-top: 50px; background-color: black; padding: 50px; grid-auto-rows: min-content; overflow: hidden;">



<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/gym6.png" alt="Portfolio Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

</div>
  
</div>
  


<button id="my-button3" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >Back</strong></button>




`;

  const caroDisconnect = `


<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
  Disconnect 
  </h1> 
 
  <div style="display: grid; grid-template-columns: repeat(1, 1fr); border: 20px solid #87CEFA; border-radius: 50px; gap: 150px; margin-top: 50px; background-color: black; padding: 50px; grid-auto-rows: min-content; overflow: hidden;">




<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/disconnect.png" alt="Mathemello Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>





</div>
  
</div>

  

<button id="my-button5" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >Back</strong></button>






`;

  const caroRosa = `


<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
  Rosetta  
  </h1>  
 
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); border: 20px solid #87CEFA; border-radius: 50px; gap: 150px; margin-top: 50px; background-color: black; padding: 50px; grid-auto-rows: min-content; overflow: hidden;">



<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/rosa4.png" alt="Disconnect Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/rosa5.png" alt="Rosetta Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/rosa6.png" alt="Portfolio Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

</div>
  
</div>
</div>

  
<button id="my-button7" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >Back</strong></button>






`;
  const caroPort = `


<div class="content" style="font-size: 4.6rem;  font-family: 'Press Start 2P', cursive; padding: 20px; margin-bottom: 20px; ">
  <h1 style="  text-align: center; text-transform: uppercase;font-family: 'Press Start 2P', cursive; margin-bottom: 200px; font-size= 3rem;  color: #FFAA00; text-shadow: 
    1px 1px 0 #FF0000, 
    2px 2px 0 #FF0000, 
    3px 3px 0 #FF0000, 
    4px 4px 0 #FF0000, 
    5px 5px 0 #FF0000, 
    6px 6px 0 #FF0000, 
    7px 7px 0 #FF0000, 
    8px 8px 0 #FF0000, 
    9px 9px 0 #FF0000, 
    10px 10px 0 #FF0000, 
    11px 11px 0 #FF0000, 
    12px 12px 0 #FF0000, 
    13px 13px 0 #FF0000, 
    14px 14px 0 #FF0000, 
    15px 15px 0 #FF0000;">
 Portfolio  
  </h1>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); border: 20px solid #87CEFA; border-radius: 50px; gap: 150px; margin-top: 50px; background-color: black; padding: 50px; grid-auto-rows: min-content; overflow: hidden;">

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for1.png" alt="E-Commerce Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for2.png" alt="MyGymBro Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for3.png" alt="Mathemello Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for4.png" alt="Disconnect Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for5.png" alt="Rosetta Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>

<div style="max-width: 100%; display: flex; justify-content: center; align-items: center;">
    <img src="/for6.png" alt="Portfolio Icon" style="max-height: 100%; max-width: 100%; object-fit: contain;">
</div>





</div>
  



<button id="my-button8" style="font-size: 4.6rem; line-height: 1.5; margin-bottom: 10px; width: 100%;" ><strong style=" color: #B0FFB0;" >Back</strong></button>
  



`;

  const cameraPositions = [
    {
      position: new THREE.Vector3(0, 1850, 3050),
      lookAt: new THREE.Vector3(0, 0, 0),
    },
    {
      position: new THREE.Vector3(0, 1850, 3050),
      lookAt: new THREE.Vector3(0, 0, 0),
    },
    {
      position: new THREE.Vector3(0, 1850, 3050),
      lookAt: new THREE.Vector3(0, 0, 0),
    },
    {
      position: new THREE.Vector3(0, 1850, 3050),
      lookAt: new THREE.Vector3(0, 0, 0),
    },
    {
      position: new THREE.Vector3(-100, 180, 4500),
      lookAt: new THREE.Vector3(0, 0, 0),
    },
    {
      position: new THREE.Vector3(0, 1850, 3050),
      lookAt: new THREE.Vector3(0, 0, 0),
    },
  ];

  /////////////////////////////////////////////////////

  function moveToPosition(index) {
    const { position, lookAt } = cameraPositions[index];
    animateCamera(camera.position, position, lookAt);
  }

  function animateCamera(from, to, lookAt) {
    const duration = 4000;
    const start = { x: from.x, y: from.y, z: from.z };
    const end = { x: to.x, y: to.y, z: to.z };

    new TWEEN.Tween(start)
      .to(end, duration)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => {
        camera.position.set(start.x, start.y, start.z);
        camera.lookAt(lookAt);
      })
      .start();
  }

  function load3DModel() {
    const loader = new GLTFLoader();

    raycaster = new THREE.Raycaster();

    window.addEventListener("click", onModelClick, false);
    // window.addEventListener("mousemove", onModelMove, false);

    loader.load(
      "/ibm.glb",
      function (gltf) {
        computer = gltf.scene;
        computer.position.set(-300, -2800, 1200); // Adjust position as needed
        computer.scale.set(7500, 6900, 3500); // Adjust scale as needed
        computer.rotation.y = -0.04;

        // computer.position.set(-300, -2000, 1200); // Adjust position as needed
        // computer.scale.set(4500, 3900, 500);


        scene.add(computer); // Add the model directly to the scene

        scene.add(computer);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        if (!computer) {
          // console.warn("Model is not loaded yet, cannot add spotlight.");
          return;
        }
      },
      undefined,
      function (error) {
        console.error(error);
      },
    );

    function onModelClick(event) {
      event.preventDefault();

      // Scales mouse coordinates from -1.0 to 1.0 on canvas
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x =
        ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
      mouse.y =
        -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      for (let i = 0; i < intersects.length; i++) {
        let object = intersects[i].object;

        // Traverse up the parent chain to check if any parent is the computer model
        while (object) {
          if (object === computer) {
            // Make sure 'model' refers to your computer model
            moveToPosition(4);

            return; // Exit the function once the computer model is found and actioned
          }
          object = object.parent;
        }
      }
    }
  }

  function updateFrontSideContent(content) {
    frontSide.innerHTML = content;

    const buttonActions = [
      () => updateFrontSideContent(Fortress),
      () => updateFrontSideContent(Commerce),
      () => updateFrontSideContent(MyGymBro),
      () => updateFrontSideContent(Mathemello),
      () => updateFrontSideContent(Disconnect),
      () => updateFrontSideContent(projectsContent),
      () => updateFrontSideContent(Rosetta),
      () => updateFrontSideContent(Portfolio),

      () => updateFrontSideContent(caroFortress),
      () => updateFrontSideContent(caroCommecre),
      () => updateFrontSideContent(caroMathe),
      () => updateFrontSideContent(caroGym),
      () => updateFrontSideContent(caroDisconnect),
      () => updateFrontSideContent(caroRosa),
      () => updateFrontSideContent(caroPort),
    ];

    for (let i = 1; i <= 15; i++) {
      setTimeout(() => {
        const myButton = document.getElementById(`my-button${i}`);
        if (myButton) {
          myButton.addEventListener("pointerdown", buttonActions[i - 1]);

          myButton.style.background = "none";
          myButton.style.border = "none";
          myButton.style.cursor = "pointer";
          myButton.style.display = "flex";
          myButton.style.flexDirection = "column";
          myButton.style.fontFamily = "'Press Start 2P', cursive";
          myButton.style.textAlign = "start";
          myButton.style.color = "#87CEFA";

          myButton.style.padding = "20px";
        }
      }, 0);
    }
  }

  function createCube() {
    cube = new THREE.Group();
    cube.position.set(-150, -500, -200);
    scene.add(cube);

    frontSide = document.createElement("div");
    frontSide.className = "cube-side front-side";

    ////// fade out fade in
    frontSide.style.opacity = "0";

    frontSide.style.visibility = "hidden";
    frontSide.style.transition = "opacity 0.3s ease-in-out";

    updateFrontSideContent(start);

    const object = new CSS3DObject(frontSide);
    object.position.z = cubeSize / 2;
    cube.add(object);

    createSide(frontSide, 0, cubeSize);
  }

  let activeSection = "";

  function selectSection(section) {
    activeSection = section;

    switch (section) {
      case "Info":
        updateFrontSideContent(personalInfoContent);
        break;
      case "profile":
        updateFrontSideContent(profileContent);
        break;
      case "skills":
        updateFrontSideContent(skillsContent);

        break;
      case "education":
        updateFrontSideContent(educationContent);
        break;
      case "experience":
        updateFrontSideContent(experienceContent);
        break;
      case "projects":
        updateFrontSideContent(projectsContent);
        break;
      case "interests":
        updateFrontSideContent(personalInterestsContent);
        break;

      default:
        console.log("Section not found");
    }
  }

  function createSide(element, idx, size) {
    element.style.width = `${size - 300}px`;
    element.style.height = `${size + 700}px`;

    element.style.display = "flex";
    element.style.flexDirection = "column";

    element.style.textAlign = "start";
    element.style.color = "#87CEFA";
    document.body.style.fontFamily = "'Press Start 2P', cursive";
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";

    const relativeSize = size / 2700;
    element.style.fontSize = `${relativeSize * 50}px`;

    element.style.background = "rgba(0, 0, 0,0)";

    const object = new CSS3DObject(element);
    const offset = size / 2;
    object.position.set(
      idx === 4 ? offset : idx === 5 ? -offset : 0,
      idx === 2 ? offset : idx === 3 ? -offset : 0,
      idx === 0 ? offset : idx === 1 ? -offset : 0,
    );
    object.rotation.y = idx === 4 ? Math.PI / 2 : idx === 5 ? -Math.PI / 2 : 0;
  }

  function updateTextVisibility() {
    if (!computer) {
      // console.warn("Model is not loaded yet.");
      return;
    }

    // Assuming the screen's normal points along the computer model's local Z-axis
    const screenNormal = new THREE.Vector3(0, 0, 1);
    screenNormal.applyQuaternion(computer.quaternion); // Apply the object's rotation

    const cameraDirection = new THREE.Vector3()
      .subVectors(camera.position, computer.position)
      .normalize();

    // Adjust the threshold based on your desired sensitivity
    const threshold = 0.5; // Adjust this value as needed

    if (screenNormal.dot(cameraDirection) > threshold) {
      // Camera is facing the screen
      frontSide.style.opacity = "1";
      frontSide.style.visibility = "visible";
    } else {
      // Camera is not facing the screen
      frontSide.style.opacity = "0";
      // frontSide.style.visibility = "hidden";
    }
  }

  function sceneSetup() {
    // updateCameraPositions();
    // createMirror()
    width = container.clientWidth;
    height = container.clientHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    webGLRenderer = new WebGLRenderer({ alpha: true, antialias: true });
    webGLRenderer.setSize(width, height);
    webGLRenderer.domElement.style.position = "absolute";
    container.appendChild(webGLRenderer.domElement);

    renderer = new CSS3DRenderer();
    renderer.setSize(width, height);
    renderer.domElement.style.position = "relative";
    container.appendChild(renderer.domElement);

    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(100000, 10, 100000),
      new THREE.MeshStandardMaterial({ color: 0x550000 }),
    );
    scene.add(floor);
    floor.position.set(-100, -1650, 400);

    const spotLightt = new THREE.SpotLight(
      "white",
      620,
      10000,
      Math.PI * 0.25,
      0.25,
      0.5,
    );
    spotLightt.position.set(0, 6000, 4000);

    scene.add(spotLightt);

    const spotLight2 = new THREE.SpotLight(
      "orange",
      320,
      10000,
      Math.PI * 0.08,
      0.5,
      0.4,
    );
    spotLight2.position.set(-9000, 3000, 5000);

    scene.add(spotLight2);

    const spotLight3 = new THREE.SpotLight(
      "orange",
      320,
      10000,
      Math.PI * 0.08,
      0.5,
      0.4,
    );
    spotLight3.position.set(9000, 3000, 5000);

    scene.add(spotLight3);
  }

  function camerSetUp() {
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 20000);
    camera.position.z = cameraDistance;
    camera.position.y = cameraDistance;
    camera.position.x = -cameraDistance;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // An animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.enableZoom = true; // Enable zooming

    controls.minPolarAngle = 0; // Minimum vertical rotation angle
    controls.maxPolarAngle = Math.PI / 2; // Maximum vertical rotation angle

    controls.minDistance = 2980; // Minimum distance to target (zoom in boundary)
    controls.maxDistance = 4500;
  }

  function animate(webGLRenderer) {
    requestAnimationFrame(() => animate(webGLRenderer));
    TWEEN.update();
    updateTextVisibility();

    renderer.render(scene, camera);
    webGLRenderer.render(scene, camera);
  }

  function onWindowResize(webGLRenderer) {
    if (!container) return; // Add this line to prevent errors if container is null

    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    webGLRenderer.setSize(width, height);
  }

  function terminal() {
    setTimeout(function () {

      const loading = document.getElementById("loading-screen");

     loading.style.display="none";

      

      var navbar = document.querySelector(".navbar");
      moveToPosition(4);
      navbar.style.opacity = "1";
      navbar.style.visibility = "visible"; // Applied immediately
      navbar.style.transition = "opacity 0.9s ease, visibility 0s linear 0s";

      updateFrontSideContent(welcome);
    }, 2000);
  }




//   function adjustContainerStyles() {
//   const container = document.querySelector('.container');

//   // Media query for devices with a max-width of 768px
//   if (window.matchMedia('(max-width: 768px)').matches) {
//     containers.forEach(container => {
//       container.style.width = '600px';
//       container.style.fontSize = '14px';
//     });
//   } 
//   // Media query for devices with a max-width of 480px
//   else if (window.matchMedia('(max-width: 480px)').matches) {
//     containers.forEach(container => {
//       container.style.width = '100%';
//       container.style.fontSize = '12px';
//     });
//   }
//   // Default styles for other conditions
//   else {
//     containers.forEach(container => {
//       // Reset or define default styles here if needed
//     });
//   }
// }




  /////////////////////////////////////////////////

  onMount(() => {





    terminal();
    sceneSetup();
    camerSetUp();
    // createButtons();
    createCube();
    load3DModel();



    animate(webGLRenderer);
    window.addEventListener("resize", () => onWindowResize(webGLRenderer));
    document
      .getElementById("instagramIcon")
      .addEventListener("click", function () {
        window.open("https://instagram.com/m877ammar", "_blank");
      });
    document.getElementById("mail").addEventListener("click", function () {
      window.location.href =
        "mailto:mohammedamaar165@gmail.com?subject=SubjectHere&body=BodyContentHere";
    });

    document.getElementById("git").addEventListener("click", function () {
      window.open("https://github.com/Mohammed87FS", "_blank");
    });

//     // Initial adjustment on page load
// adjustContainerStyles();

// // Add event listener for window resize to adjust styles dynamically
// window.addEventListener('resize', adjustContainerStyles);


  });

  ///////////////////////////////////////////////////
</script>

<link
  href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
  rel="stylesheet"
/>

<div
  style=" font-family: 'Press Start 2P'; position: fixed; width: 100%; height: 100%; background: black; color: orange; display: flex; justify-content: center; align-items: center; font-size: 24px; z-index: 9999;"
  class="terminal"
  id="loading-screen"
>
  Loading...
</div>

<div class="navbar">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class:active={activeSection == "profile"}
    class:nav-item={activeSection != "profile"}
    on:click={() => {
      selectSection("profile");
    }}
  >
    About
  </div>
  <div
    class:active={activeSection == "skills"}
    class:nav-item={activeSection != "skills"}
    on:click={() => {
      selectSection("skills");
    }}
  >
    Skills
  </div>

  <div
    class:active={activeSection == "projects"}
    class:nav-item={activeSection != "projects"}
    on:click={() => {
      selectSection("projects");
    }}
  >
    Projects
  </div>
</div>

<div bind:this={container} class="container" style="width: 100%; height: 88vh;"></div>
<footer class="footer">
  <img
    src="/insta.svg"
    alt="Instagram Icon"
    id="instagramIcon"
    style="cursor:pointer;"
  />
  <img src="/email.svg" alt="email Icon" id="mail" style="cursor:pointer;" />
  <img src="/git.svg" alt="github Icon" id="git" style="cursor:pointer;" />
  <div class="spacer"></div>
</footer>

<style>
 

  .spacer {
    width: 4%; /* Adjust this width to control the shift */
    height: 100%;
    flex-shrink: 0; /* Prevents the spacer from shrinking */
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #000000;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    border-radius: 5px;
  }

  .footer img {
    height: 35px;
    width: auto;
    cursor: pointer;
    filter: brightness(0) invert(1);
    transition: transform 0.2s;
    margin: 0 10px;
  }

  .footer img:hover {
    transform: scale(1.1);
  }

  .navbar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #000000; /* Classic NES black */
    padding: 10px;
    border-radius: 5px;
    visibility: hidden;
    text-align: center;

    opacity: 0; /* Start invisible */
  }
  * .nav-item {
    padding: 10px;
    margin: 5px 0; /* Space out the nav items */
    background-color: #000000; /* Bright contrast against the dark navbar */
    color: #ffffff; /* Dark text for readability */
    text-align: center;
    cursor: pointer;
    font-family: "Press Start 2P", cursive; /* Pixelated font for the retro look */
    font-size: 1.2rem; /* Adjust size due to the typically large size of pixelated fonts */
    border-radius: 5px; /* Slightly rounded corners for each nav item */
    text-transform: uppercase;
    transition:
      background-color 0.3s,
      color 0.3s,
      transform 0.1s; /* Smooth transitions for interactive effects */
  }

  .active {
    padding: 10px;
    margin: 5px 0;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    font-family: "Press Start 2P", cursive;

    font-size: 1.2rem; /* Corrected from font-size= to font-size: */
    color: #ffaa00;

    text-shadow:
      1px 1px 0 #ff6666,
      /* Lighter red for a subtler effect */ 2px 2px 0 #ff6666,
      3px 3px 0 #ff0000,
      4px 4px 0 #ff0000;
  }

  .nav-item:hover {
    background-color: #ffffff;
    color: #000000;
    /* Lighten the item on hover for an interactive feel */
  }

  .nav-item:active {
    transform: scale(0.95); /* Slight press effect on click */
  }
</style>
