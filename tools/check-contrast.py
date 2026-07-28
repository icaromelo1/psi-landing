#!/usr/bin/env python3
"""Verifica o contraste WCAG AA de todos os temas em themes.css.

Uso: python3 tools/check-contrast.py [caminho/para/themes.css]
Sai com código 1 se algum par ficar abaixo de 4.5:1.
"""
import re
import sys

DEFAULT_CSS = 'docs/design/themes.css'

# (rótulo, token de frente, token de fundo, mínimo exigido)
PAIRS = [
    ('texto/fundo',   '--ink',        '--bg',      4.5),
    ('texto2/fundo',  '--ink-soft',   '--bg',      4.5),
    ('primary/fundo', '--primary',    '--bg',      4.5),
    ('texto/card',    '--ink',        '--surface', 4.5),
    ('texto2/card',   '--ink-soft',   '--surface', 4.5),
    ('primary/card',  '--primary',    '--surface', 4.5),
    ('texto do CTA',  '--accent-ink', '--accent',  4.5),
]


def luminance(hex_color):
    channels = [int(hex_color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    channels = [c / 12.92 if c <= .03928 else ((c + .055) / 1.055) ** 2.4 for c in channels]
    return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2]


def ratio(fg, bg):
    a, b = luminance(fg), luminance(bg)
    return (max(a, b) + .05) / (min(a, b) + .05)


def parse_themes(css):
    themes = {}
    for match in re.finditer(r'\[data-theme="(\w+)"\]\s*\{(.*?)\n\}', css, re.S):
        themes[match.group(1)] = dict(
            re.findall(r'(--[\w-]+):\s*(#[0-9A-Fa-f]{6})', match.group(2))
        )
    return themes


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_CSS
    themes = parse_themes(open(path).read())
    if not themes:
        print(f'nenhum tema encontrado em {path}')
        return 1

    failures = 0
    for theme_id in sorted(themes):
        tokens = themes[theme_id]
        print(f'[{theme_id}]')
        for label, fg, bg, minimum in PAIRS:
            if fg not in tokens or bg not in tokens:
                print(f'    FALTA {label} (token ausente)')
                failures += 1
                continue
            value = ratio(tokens[fg], tokens[bg])
            if value < minimum:
                failures += 1
                print(f'    FALHA {label} {value:.1f} (mínimo {minimum})')
            else:
                print(f'    ok    {label} {value:.1f}')

    print()
    print('tudo AA' if not failures else f'{failures} par(es) abaixo de AA')
    return 1 if failures else 0


if __name__ == '__main__':
    sys.exit(main())
