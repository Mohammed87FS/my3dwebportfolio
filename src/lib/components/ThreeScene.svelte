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
  import { welcome, profileContent, skillsContent, projectsContent, Fortress, MyGymBro, Mathemello, Commerce, Disconnect, Rosetta, Portfolio, caroFortress, caroCommecre, caroMathe, caroGym, caroDisconnect, caroRosa, caroPort } from '../contentnew.js';


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
        console.warn("Could not load 3D model:", error);
        // Continue without the 3D model - the scene will still work
      },
    );

  function onModelClick(event) {
      event.preventDefault();

      // Only proceed if raycaster and computer are available
      if (!raycaster || !computer) {
        return;
      }

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

    createSide(frontSide, 0);
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

  function createSide(element, idx) {
    element.style.width = `${3000}px`;
    element.style.height = `${3700}px`;
    element.style.maxWidth = '100vw';
    element.style.overflow = 'hidden';
    element.style.boxSizing = 'border-box';

    element.style.display = "flex";
    element.style.flexDirection = "column";

    element.style.textAlign = "start";
    element.style.color = "#87CEFA";
    document.body.style.fontFamily = "'Press Start 2P', cursive";
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";

    // Don't override font-size here - let the responsive clamp() values from contentnew.js work
    // This allows our carefully crafted responsive typography to function properly
    
    element.style.background = "rgba(0, 0, 0,0)";

    const object = new CSS3DObject(element);
    const offset = 3000;
    object.position.set(
      idx === 4 ? offset : idx === 5 ? -offset : 0,
      idx === 2 ? offset : idx === 3 ? -offset : 0,
      idx === 0 ? offset : idx === 1 ? -offset : 0,
    );
    object.rotation.y = idx === 4 ? Math.PI / 2 : idx === 5 ? -Math.PI / 2 : 0;
  }

  function updateTextVisibility() {
    if (!computer || !frontSide) {
      // console.warn("Model or frontSide is not loaded yet.");
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
      const navbar = document.querySelector(".navbar");

      if (loading) {
        loading.style.display = "none";
      }

      if (navbar) {
        moveToPosition(4);
        navbar.style.opacity = "1";
        navbar.style.visibility = "visible"; // Applied immediately
        navbar.style.transition = "opacity 0.9s ease, visibility 0s linear 0s";
      }

      updateFrontSideContent(welcome);
    }, 2000);
  }


  /////////////////////////////////////////////////

  onMount(() => {
    terminal();
    sceneSetup();
    camerSetUp();
    createCube();
    load3DModel();

    animate(webGLRenderer);
    window.addEventListener("resize", () => onWindowResize(webGLRenderer));
    
    // Wait for DOM elements to be available before adding event listeners
    setTimeout(() => {
      const instagramIcon = document.getElementById("instagramIcon");
      const mailIcon = document.getElementById("mail");
      const gitIcon = document.getElementById("git");
      const linkedIcon = document.getElementById("linked");
      
      if (instagramIcon) {
        instagramIcon.addEventListener("click", function () {
          window.open("https://instagram.com/m877ammar", "_blank");
        });
      }
      
      if (mailIcon) {
        mailIcon.addEventListener("click", function () {
          window.location.href =
            "mailto:mohammedamaar165@gmail.com?subject=SubjectHere&body=BodyContentHere";
        });
      }
      
      if (gitIcon) {
        gitIcon.addEventListener("click", function () {
          window.open("https://github.com/Mohammed87FS", "_blank");
        });
      }
      
      if (linkedIcon) {
        linkedIcon.addEventListener("click", function () {
          window.open("https://www.linkedin.com/in/mohammed-al-hamadani-a88518302/", "_blank");
        });
      }
    }, 100);
  });

  ///////////////////////////////////////////////////
</script>

<link
  href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
  rel="stylesheet"
/>
<!-- <link rel="stylesheet" href="../style.css"> -->

<div
  style=" font-family: 'Press Start 2P'; position: fixed; width: 100%; height: 100%; background: black; color: orange; display: flex; justify-content: center; align-items: center; font-size: 24px; z-index: 9999;"
  class="terminal"
  id="loading-screen"
>
  Loading...
</div>

<div class="navbar">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <button
    class:active={activeSection == "profile"}
    class:nav-item={activeSection != "profile"}
    on:click={() => {
      selectSection("profile");
    }}
  >
    About
  </button>
  <button
    class:active={activeSection == "skills"}
    class:nav-item={activeSection != "skills"}
    on:click={() => {
      selectSection("skills");
    }}
  >
    Skills
  </button>

  <button
    class:active={activeSection == "projects"}
    class:nav-item={activeSection != "projects"}
    on:click={() => {
      selectSection("projects");
    }}
  >
    Projects
  </button>
</div>

<div
  bind:this={container}
  class="container"
  style="width: 100%; height: 88vh;"
></div>
<footer class="footer">
  <img src="/linked2.svg" alt="linkedin Icon" id="linked" style="cursor:pointer;" />
  <img src="/git.svg" alt="github Icon" id="git" style="cursor:pointer;" />
  <img src="/mail.svg" alt="email Icon" id="mail" style="cursor:pointer;" />
  <img src="/insta.svg" alt="Instagram Icon" id="instagramIcon" style="cursor:pointer;" />
  <div class="spacer"></div>
</footer>

<style>
  /* Prevent horizontal scrolling */
  :global(body) {
    overflow-x: hidden;
    max-width: 100vw;
  }
  
  :global(html) {
    overflow-x: hidden;
    max-width: 100vw;
  }
  
  .container {
    overflow: hidden;
    max-width: 100vw;
  }
  
  /* Responsive content within 3D scene */
  :global(.cube-side) {
    overflow: hidden !important;
    max-width: 100vw !important;
    box-sizing: border-box !important;
  }
  
  :global(.cube-side *) {
    max-width: 100% !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    box-sizing: border-box !important;
  }

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
  
  .navbar button {
    background: none;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
  }
  
  .nav-item {
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
