precision highp float;

varying vec2 vTextureCoord;
uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform sampler2D uSampler;
uniform float time;

void main() {
	vec2 screenPos = vTextureCoord * inputSize.xy + outputFrame.xy;
	vec4 color = texture2D(uSampler, vTextureCoord);
	
	float size = 20.0;
	float darken = 0.3;

	float a = step(mod(time - screenPos.x - screenPos.y, size)/ (size - 1.0), 0.5) * darken + (1.0 - darken);

	gl_FragColor = vec4(color.rgb*a, color.a);
	
}
