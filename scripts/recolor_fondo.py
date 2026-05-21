"""
Crea public/fondo-verde.svg con paleta verde menta/mocha
en lugar de los tonos rosa del original.
"""
import re, colorsys

INPUT  = "../public/fondo.svg"
OUTPUT = "../public/fondo-verde.svg"

HUE_SHIFT   = 130 / 360.0  # rosa ~350° → verde menta ~120°
DARKEN_BG   = 0.88          # factor de lightness para el fondo (más oscuro)

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4))

def rgb_to_hex(r, g, b):
    return '#{:02X}{:02X}{:02X}'.format(
        round(r * 255), round(g * 255), round(b * 255))

def recolor(hex_color):
    r, g, b = hex_to_rgb(hex_color)
    h, l, s = colorsys.rgb_to_hls(r, g, b)

    if s < 0.04:
        # Color casi neutro (fondo base) — darken y agregar leve tinte verde
        l_new = l * DARKEN_BG
        # Forzar hue a verde menta suave con saturación mínima
        nr, ng, nb = colorsys.hls_to_rgb(90/360, l_new, 0.08)
        return rgb_to_hex(nr, ng, nb)

    # Flores: rotar hue
    h = (h + HUE_SHIFT) % 1.0
    nr, ng, nb = colorsys.hls_to_rgb(h, l, s)
    return rgb_to_hex(nr, ng, nb)

with open(INPUT, 'r', encoding='utf-8') as f:
    svg = f.read()

def replace_fill(match):
    color = match.group(1)
    return f'fill="{recolor(color)}"'

svg_new = re.sub(r'fill="(#[0-9A-Fa-f]{6})"', replace_fill, svg)

with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(svg_new)

print(f"Guardado: {OUTPUT}")
