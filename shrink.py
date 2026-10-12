import json
d = json.load(open('boil.json', encoding='utf-8'))
d.pop('bgImage', None)   # the embedded background, not needed on the site
for f in d['frames']:
    f.pop('r', None); f.pop('id', None)
    for strokes in f['cels'].values():
        for s in strokes:
            s['size'] = round(s['size'], 1)
            s['pts'] = [[round(x, 1), round(y, 1), round(p, 2)] for x, y, p in s['pts']]
json.dump(d, open('boil.json', 'w', encoding='utf-8'), separators=(',', ':'))
print('done')