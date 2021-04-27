
import Expo from "expo";
import React, { Component } from "react";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { Renderer } from "expo-three";
import { GLView } from 'expo-gl';
import OrbitControlsView from 'expo-three-orbit-controls';
import { connect } from 'react-redux';
import {
    Dimensions,
    SafeAreaView
} from 'react-native';
import { css, getColor } from '../Styles';

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

function Threed(props) {


    const camera = new THREE.PerspectiveCamera(
        75, width / height, 0.1, 1000
    );



    const _onGLContextCreate = async gl => {

        console.log(props.rooms)

        const scene = new THREE.Scene();

        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        let box;

        for (let i = 0; i < props.rooms.length; i++) {
            const geometry = new THREE.BoxGeometry(props.rooms[i].width, 20, props.rooms[i].height);
            //const geometry = new THREE.BoxGeometry(20, 20, 20);

            const material = new THREE.MeshBasicMaterial({
                color: getColor(props.rooms[i].color),
            });
            box = new THREE.Mesh(geometry, material);
            scene.add(box);
        
            box.position.set(props.rooms[i].x, 0, props.rooms[i].y)
           
            
            //box.lookAt(camera.position)
        }


        camera.position.set(0, 0, 10);
       
        const render = () => {
            requestAnimationFrame(render);
            //box.rotation.x += 0.01;
            // sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };
        render();
    };



    return (
        // 

        <SafeAreaView style={{ flex: 1 }}>
            <OrbitControlsView style={{ flex: 1, zIndex: 100 }} camera={camera} >
                <GLView
                    style={{ flex: 1 }}
                    onContextCreate={_onGLContextCreate}
                />
            </OrbitControlsView>
        </SafeAreaView>
        // </OrbitControlsView>
    )

}

const mapStateToProps = ({ app }) => ({
    rooms: app.rooms,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Threed)



