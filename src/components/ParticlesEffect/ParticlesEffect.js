import React, { PureComponent } from 'react'
import Particles from 'react-particles-js';
import part from './Logo-img.svg';
import './ParticlesEffect.css';

export default class ParticleEffect extends PureComponent {
  render() {
    return (
      <>
        <Particles
          className='particles'
          params={{
            "particles": {
              "number": {
                "value": 100,
                "density": {
                  "enable": true,
                  "value_area": 1500
                }
              },
              "line_linked": {
                "enable": true,
                "opacity": 0.03
              },
              "move": {
                "direction": "right",
                "speed": 0.5
              },
              "size": {
                "value": 1
              },
              "opacity": {
                "anim": {
                  "enable": true,
                  "speed": 1,
                  "opacity_min": 0.05
                }
              }
            },
            "interactivity": {
              "events": {
                "onClick": {
                  "enable": true,
                  "mode": "push"
                }
              },
              "modes": {
                "push": {
                  "particles_nb": 1
                }
              }
            },
            "retina_detect": true
          }} />
        <Particles
          className='polygon'
          canvasClassName='canvas'
          params={{
            "fps_limit": 28,
            "particles": {
              "number": {
                "value": 450,
                "density": {
                  "enable": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 30,
              },
              "move": {
                "speed": 1
              },
              "opacity": {
                "anim": {
                  "enable": true,
                  "opacity_min": 0.05,
                  "speed": 1,
                  "sync": false,
                  "opacity": 2
                },
                "value": 0.4
              }
            },
            "polygon": {
              "enable": true,
              "scale": 3,
              "type": "inline",
              "move": {
                "radius": 10
              },
              "url": part,
              "inline": {
                "arrangement": "equidistant"
              },
              "draw": {
                "enable": true,
                "stroke": {
                  "color": "rgba(255, 255, 255, .2)"
                }
              }
            },
            "retina_detect": false,
            "interactivity": {
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "bubble"
                }
              },
              "modes": {
                "bubble": {
                  "size": 6,
                  "distance": 40
                }
              }
            }
          }} />
      </>
    )
  }
}