import React, { useEffect, useRef } from "react";

/**
 * ============================================================================
 * PROCEDURAL DOMAIN WARPING & IRIDESCENT LIQUID SILK SHADER ENGINE
 * ============================================================================
 * Mathematical Model: f(p) = noise(p + noise(p + noise(p)))
 */
export const SILK_CONFIG = {
  waveSpeed: 0.22,        // Flow speed of domain warping
  waveFrequency: 2.1,     // Spatial density of fluid folds
  waveElevation: 0.85,    // Amplitude depth of concave shadow valleys
  mouseSensitivity: 0.15, // Smooth lerp cursor interaction
};

/**
 * GLSL Vertex Shader
 */
const VERTEX_SHADER_SOURCE = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

/**
 * GLSL Fragment Shader: Domain Warping + Iridescent Light Sweep Pattern
 */
const FRAGMENT_SHADER_SOURCE = `
  precision highp float;

  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uWaveSpeed;
  uniform float uWaveFrequency;
  uniform float uWaveElevation;

  // --------------------------------------------------------------------------
  // GLSL 3D SIMPLEX NOISE IMPLEMENTATION
  // --------------------------------------------------------------------------
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  // --------------------------------------------------------------------------
  // DOMAIN WARPING PROCEDURAL NOISE ENGINE: f(p) = noise(p + noise(p))
  // --------------------------------------------------------------------------
  float domainWarpHeight(vec2 st, float t, vec2 mouse) {
    vec2 p = st * uWaveFrequency + mouse * 0.15;
    
    // First noise distortion layer: q = noise(p)
    vec2 q = vec2(
      snoise(vec3(p + vec2(0.0, 0.0), t * 0.25)),
      snoise(vec3(p + vec2(5.2, 1.3), t * 0.28))
    );

    // Second noise distortion layer: r = noise(p + 3.5 * q)
    vec2 r = vec2(
      snoise(vec3(p + 3.5 * q + vec2(1.7, 9.2), t * 0.32)),
      snoise(vec3(p + 3.5 * q + vec2(8.3, 2.8), t * 0.35))
    );

    // Final domain warped output: noise(p + 3.5 * r)
    float n = snoise(vec3(p + 3.5 * r, t * 0.3));
    return n * uWaveElevation;
  }

  // --------------------------------------------------------------------------
  // IRIDESCENT LIGHT SWEEP SPECTRUM PATTERN
  // --------------------------------------------------------------------------
  vec3 getIridescentSpectrum(float angle, float spec) {
    // Subtle, elegant iridescent spectrum sweep (cyan, indigo, magenta sheen)
    vec3 spectrum = 0.5 + 0.5 * cos(6.28318 * (angle * vec3(1.0, 1.0, 1.0) + vec3(0.0, 0.33, 0.67)));
    return spectrum * (spec * 0.25);
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
    
    float t = uTime * uWaveSpeed;
    vec2 mouse = (uMouse / uResolution) - 0.5;

    // Calculate numerical derivatives for dynamic surface normals
    float eps = 0.004;
    float h  = domainWarpHeight(st, t, mouse);
    float hX = domainWarpHeight(st + vec2(eps, 0.0), t, mouse);
    float hY = domainWarpHeight(st + vec2(0.0, eps), t, mouse);

    // Surface normal vector
    vec3 normal = normalize(vec3((h - hX) / eps, (h - hY) / eps, 1.4));

    vec3 lightDir = normalize(vec3(0.4, 0.7, 1.0));
    vec3 viewDir  = vec3(0.0, 0.0, 1.0);
    vec3 halfDir  = normalize(lightDir + viewDir);

    float diff = max(dot(normal, lightDir), 0.0);
    float spec = pow(max(dot(normal, halfDir), 0.0), 36.0);
    float rim  = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

    // Deep Dark Matte Charcoal Base Palette
    vec3 baseBg     = vec3(0.035, 0.035, 0.04); // #08080a
    vec3 foldShadow = vec3(0.015, 0.015, 0.02); // Deep concave shadow valley
    vec3 sheenColor = vec3(0.28, 0.30, 0.36);   // Silver-gray highlight

    // Mix base with deep concave shadow valleys & highlight crests
    vec3 color = mix(foldShadow, baseBg, smoothstep(-0.6, 0.4, h));
    color += sheenColor * (spec * 0.4 + diff * 0.15 + rim * 0.1);

    // Add Iridescent Light Sweep Pattern along wave curvature
    float iridAngle = h * 2.5 + t * 0.5;
    color += getIridescentSpectrum(iridAngle, spec);

    // Smooth Vignette
    float dist = length(st);
    color *= smoothstep(1.35, 0.25, dist);

    // Absolute Clamp Safeguard (Prevents Any White Screen Glare)
    vec3 finalColor = clamp(color, vec3(0.03), vec3(0.68));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const LiquidSilkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      powerPreference: "high-performance",
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    });

    if (!gl) return;

    const createShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uWaveSpeed = gl.getUniformLocation(program, "uWaveSpeed");
    const uWaveFrequency = gl.getUniformLocation(program, "uWaveFrequency");
    const uWaveElevation = gl.getUniformLocation(program, "uWaveElevation");

    gl.uniform1f(uWaveSpeed, SILK_CONFIG.waveSpeed);
    gl.uniform1f(uWaveFrequency, SILK_CONFIG.waveFrequency);
    gl.uniform1f(uWaveElevation, SILK_CONFIG.waveElevation);

    let targetMouseX = window.innerWidth / 2;
    let targetMouseY = window.innerHeight / 2;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = window.innerHeight - e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize, { passive: true });
    resize();

    let animationFrameId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsedTime = (now - startTime) * 0.001;

      currentMouseX += (targetMouseX - currentMouseX) * SILK_CONFIG.mouseSensitivity;
      currentMouseY += (targetMouseY - currentMouseY) * SILK_CONFIG.mouseSensitivity;

      gl.uniform1f(uTime, elapsedTime);
      gl.uniform2f(uMouse, currentMouseX, currentMouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);

      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        const loseContext = gl.getExtension("WEBGL_lose_context");
        if (loseContext) loseContext.loseContext();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#08080a]"
      style={{ touchAction: "none" }}
      aria-hidden="true"
    />
  );
};
