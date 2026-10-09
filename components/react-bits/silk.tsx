'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { cn } from '@/lib/utils';

const vertexShader = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform vec2  uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform vec3  uColor;
uniform vec3  uFlow;
uniform vec3  uAccent;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2 r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd = noise(gl_FragCoord.xy);
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  uv = rotateUvs(uv, uRotation);

  float t = uTime * uSpeed * 0.12;
  vec2 p = uv * (2.0 + uScale * 4.0);

  for (int i = 1; i <= 3; i++) {
    float fi = float(i);
    p.x += 0.6 / fi * cos(fi * 2.5 * p.y + t);
    p.y += 0.6 / fi * cos(fi * 1.5 * p.x + t);
  }

  float band = 0.5 + 0.5 * sin(p.x + p.y);
  band = smoothstep(0.12, 1.0, band);

  vec3 col = mix(uColor, uFlow, band * 0.55);
  col = mix(col, uAccent, pow(band, 5.0) * 0.10);

  // Very light grain so the field never looks like flat plastic.
  col += (rnd - 0.5) * uNoiseIntensity * 0.02;

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface SilkProps {
  /** Flow speed multiplier. */
  speed?: number;
  /** Pattern scale. */
  scale?: number;
  /** Rotation of the flow field, in radians. */
  rotation?: number;
  /** Grain intensity. */
  noiseIntensity?: number;
  /** Base (background) colour. */
  color?: string;
  /** Colour that flows through the silk. */
  flowColor?: string;
  /** Faint accent threaded through the highlights. */
  accentColor?: string;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const int = parseInt(full, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

/**
 * React Bits — Silk.
 * A flowing silk/flow-field shader rendered with OGL, tinted to the Pharma
 * Strategies palette (dark midnight base, blue flow, a whisper of red).
 * Intended as a full-bleed hero background: keep the intensity low so the
 * headline stays readable. Callers decide when to mount it — reduced motion,
 * small viewports and missing WebGL should fall back to a static gradient.
 */
export function Silk({
  speed = 5,
  scale = 1,
  rotation = 0,
  noiseIntensity = 1.5,
  color = '#0B1220',
  flowColor = '#1D3557',
  accentColor = '#B8323C',
  className,
}: SilkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [container.clientWidth || 1, container.clientHeight || 1] },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uRotation: { value: rotation },
        uNoiseIntensity: { value: noiseIntensity },
        uColor: { value: hexToRgb(color) },
        uFlow: { value: hexToRgb(flowColor) },
        uAccent: { value: hexToRgb(accentColor) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let frame = 0;
    const start = performance.now();
    const update = (now: number) => {
      program.uniforms.uTime.value = (now - start) / 1000;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      geometry.remove();
      program.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, [speed, scale, rotation, noiseIntensity, color, flowColor, accentColor]);

  return <div ref={containerRef} aria-hidden className={cn('overflow-hidden', className)} />;
}

export default Silk;
