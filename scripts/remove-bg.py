from pathlib import Path

import numpy as np
from PIL import Image
from rembg import remove

ASSETS = Path(
    r"C:\Users\2540541\.cursor\projects\d-Usuarios-Francisco-Documentos-Invitacion-boda\assets"
)
OUT = Path(__file__).resolve().parents[1] / "public" / "img"
FILES = ["hero-bouquet.png", "hero-garland.png", "hero-eucalyptus.png"]


def crop_to_content(image: Image.Image, padding: int = 4) -> Image.Image:
    rgba = np.array(image.convert("RGBA"))
    alpha = rgba[:, :, 3]
    rows = np.any(alpha > 12, axis=1)
    cols = np.any(alpha > 12, axis=0)
    if not rows.any() or not cols.any():
        return image

    row_idx = np.where(rows)[0]
    col_idx = np.where(cols)[0]
    top, bottom = row_idx[0], row_idx[-1]
    left, right = col_idx[0], col_idx[-1]

    top = max(0, top - padding)
    left = max(0, left - padding)
    bottom = min(rgba.shape[0] - 1, bottom + padding)
    right = min(rgba.shape[1] - 1, right + padding)

    return image.crop((left, top, right + 1, bottom + 1))


for name in FILES:
    source = ASSETS / name
    target = OUT / name
    with Image.open(source) as img:
        cutout = remove(img)
        cutout = crop_to_content(cutout)
        cutout.save(target, "PNG", optimize=True)
        print(f"OK: {target} ({cutout.size[0]}x{cutout.size[1]})")
