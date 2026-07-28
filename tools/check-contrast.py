#!/usr/bin/env python3
import re
import sys

CSS_PADRAO = 'src/css/themes.css'
MINIMO_AA = 4.5

PARES = [
    ('texto/fundo', '--ink', '--bg'),
    ('texto2/fundo', '--ink-soft', '--bg'),
    ('primary/fundo', '--primary', '--bg'),
    ('texto/card', '--ink', '--surface'),
    ('texto2/card', '--ink-soft', '--surface'),
    ('primary/card', '--primary', '--surface'),
    ('texto do CTA', '--accent-ink', '--accent'),
]


def luminancia(cor):
    canais = [int(cor[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    canais = [c / 12.92 if c <= .03928 else ((c + .055) / 1.055) ** 2.4 for c in canais]
    return .2126 * canais[0] + .7152 * canais[1] + .0722 * canais[2]


def razao(frente, fundo):
    a, b = luminancia(frente), luminancia(fundo)
    return (max(a, b) + .05) / (min(a, b) + .05)


def lerTemas(css):
    temas = {}
    for bloco in re.finditer(r'\[data-theme=[\'"](\w+)[\'"]\]\s*\{(.*?)\n\}', css, re.S):
        temas[bloco.group(1)] = dict(
            re.findall(r'(--[\w-]+):\s*(#[0-9A-Fa-f]{6})', bloco.group(2)),
        )
    return temas


def main():
    caminho = sys.argv[1] if len(sys.argv) > 1 else CSS_PADRAO
    try:
        temas = lerTemas(open(caminho).read())
    except FileNotFoundError:
        print(f'arquivo nao encontrado: {caminho}')
        print('uso: python3 tools/check-contrast.py [caminho/para/themes.css]')
        return 1

    if not temas:
        print(f'nenhum tema encontrado em {caminho}')
        return 1

    falhas = 0
    for tema in sorted(temas):
        tokens = temas[tema]
        print(f'[{tema}]')
        for rotulo, frente, fundo in PARES:
            if frente not in tokens or fundo not in tokens:
                falhas += 1
                print(f'    FALTA {rotulo} (token ausente)')
                continue
            valor = razao(tokens[frente], tokens[fundo])
            if valor < MINIMO_AA:
                falhas += 1
                print(f'    FALHA {rotulo} {valor:.1f} (minimo {MINIMO_AA})')
            else:
                print(f'    ok    {rotulo} {valor:.1f}')

    print()
    print('tudo AA' if not falhas else f'{falhas} par(es) abaixo de AA')
    return 1 if falhas else 0


if __name__ == '__main__':
    sys.exit(main())
