"use strict";

//  Adapted from Daniel Rohmer tutorial
//
// 		https://imagecomputing.net/damien.rohmer/teaching/2019_2020/semester_1/MPRI_2-39/practice/threejs/content/000_threejs_tutorial/index.html
//
// 		J. Madeira - April 2021

const helper = {

    initEmptyScene: function (sceneElements) {

        // ************************** //
        // Create the 3D scene
        // ************************** //
        sceneElements.sceneGraph = new THREE.Scene();


        // ************************** //
        // Add camera
        // ************************** //
        const width = window.innerWidth;
        const height = window.innerHeight;
        // const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
        const camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 2000);
        sceneElements.camera = camera;
        // camera.position.set(0, 5, 5);
        camera.position.set(10, 7, 10);
        camera.lookAt(0, 0, 0);

        camera.zoom = 50;
        camera.updateProjectionMatrix();

        // ************************** //
        // Illumination
        // ************************** //

        // ************************** //
        // Add ambient light
        // ************************** //
        const ambientLight = new THREE.AmbientLight('rgb(255, 255, 255)', 0.2);
        sceneElements.sceneGraph.add(ambientLight);

        // ***************************** //
        // Add spotlight (with shadows)
        // ***************************** //
        const spotLight = new THREE.SpotLight('rgb(255, 255, 255)', 0.8);
        spotLight.position.set(-5, 8, 0);
        sceneElements.sceneGraph.add(spotLight);

        // Setup shadow properties for the spotlight
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        
        // ***************************** //
        // Add SECOND spotlight (with shadows)
        // ***************************** //
        const secondSpotLight = new THREE.SpotLight('rgb(255, 255, 255)', 0.8);
        secondSpotLight.position.set(5, 8, 0);
        sceneElements.sceneGraph.add(secondSpotLight);

        // Setup shadow properties for the spotlight
        secondSpotLight.castShadow = true;
        secondSpotLight.shadow.mapSize.width = 2048;
        secondSpotLight.shadow.mapSize.height = 2048;

        // *********************************** //
        // Create renderer (with shadow map)
        // *********************************** //
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        sceneElements.renderer = renderer;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(255, 255, 150)', 1.0);
        renderer.setSize(width, height);

        // Setup shadowMap property
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;


        // **************************************** //
        // Add the rendered image in the HTML DOM
        // **************************************** //
        const htmlElement = document.querySelector("#Tag3DScene");
        htmlElement.appendChild(renderer.domElement);
    },

    render: function render(sceneElements) {
        sceneElements.renderer.render(sceneElements.sceneGraph, sceneElements.camera);
    },
};