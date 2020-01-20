var glsl = require('glslify')
var regl = require('regl')()
var draw = regl({
  frag: glsl`
    precision highp float;
    #pragma glslify: c2b = require(../)
    varying vec2 vpos;
    void main () {
      vec2 p0 = vec2(-0.5,+0.1);
      vec2 p1 = vec2(+0.6,+0.5);
      vec2 p2 = vec2(-0.2,-0.3);
      vec3 bc = c2b(vpos, p0, p1, p2);
      if (max(bc.x,max(bc.y,bc.z)) > 1.0) discard;
      if (min(bc.x,min(bc.y,bc.z)) < 0.0) discard;
      gl_FragColor = vec4(bc*0.5+0.5,1);
    }
  `,
  vert: `
    precision highp float;
    attribute vec2 position;
    varying vec2 vpos;
    void main () {
      vpos = position;
      gl_Position = vec4(position,0,1);
    }
  `,
  attributes: {
    position: [-4,-4,-4,+4,+4,+0]
  },
  elements: [0,1,2]
})
frame()
window.addEventListener('resize', frame)

function frame () {
  regl.poll()
  regl.clear({ color: [0,0,0,1], depth: true })
  draw()
}
