/** Decorative layers stay below the content so refraction never distorts text. */
export function GlassLayers() {
  return <>
    <span className="rf-glass-layer rf-glass-refraction" aria-hidden="true" />
    <span className="rf-glass-layer rf-glass-tint" aria-hidden="true" />
    <span className="rf-glass-layer rf-glass-rim" aria-hidden="true" />
  </>;
}

/** One shared filter; zero-size SVG remains available to CSS in all browsers. */
export function GlassFilter() {
  return (
    <svg className="rf-glass-filter" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="rainfall-glass-distortion" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting in="softMap" surfaceScale="3" specularConstant="0.35" specularExponent="100" lightingColor="#d9edff" result="specular">
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="60" xChannelSelector="R" yChannelSelector="G" result="refracted" />
          <feComposite in="specular" in2="refracted" operator="in" result="surfaceLight" />
          <feBlend in="refracted" in2="surfaceLight" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}
