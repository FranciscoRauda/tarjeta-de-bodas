from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from rembg import remove

SRC = Path(
    r"C:\Users\2540541\.cursor\projects\d-Usuarios-Francisco-Documentos-Invitacion-boda\assets\c__Users_2540541_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-5c645414-04e3-4f01-b180-b08f272d0d31.png"
)
OUT = Path(__file__).resolve().parents[1] / "public" / "img" / "gold-seal.png"


def crop_to_alpha(image: Image.Image, padding: int = 2) -> Image.Image:
    rgba = np.array(image.convert("RGBA"))
    alpha = rgba[:, :, 3]
    rows = np.any(alpha > 12, axis=1)
    cols = np.any(alpha > 12, axis=0)
    row_idx = np.where(rows)[0]
    col_idx = np.where(cols)[0]
    top, bottom = row_idx[0], row_idx[-1]
    left, right = col_idx[0], col_idx[-1]
    top = max(0, top - padding)
    left = max(0, left - padding)
    bottom = min(rgba.shape[0] - 1, bottom + padding)
    right = min(rgba.shape[1] - 1, right + padding)
    return image.crop((left, top, right + 1, bottom + 1))


def restore_inner_face(image: Image.Image) -> Image.Image:
    """Tapar las iniciales originales conservando el relieve del sello."""
    img = image.convert("RGBA")
    w, h = img.size
    cx, cy = w // 2, h // 2
    radius = int(min(w, h) * 0.23)
    pixels = np.array(img)
    yy, xx = np.ogrid[:h, :w]
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    ring = (dist > radius * 0.72) & (dist < radius * 1.05)
    if ring.any():
        sample = pixels[ring][:, :3]
        base = sample.mean(axis=0).astype(np.uint8)
    else:
        base = np.array([196, 154, 78], dtype=np.uint8)

    draw = ImageDraw.Draw(img)
    for r in range(radius, 0, -1):
        t = r / radius
        color = (
            int(base[0] * (0.88 + 0.12 * t)),
            int(base[1] * (0.88 + 0.12 * t)),
            int(base[2] * (0.88 + 0.12 * t)),
            255,
        )
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color)

    highlight = Image.new("RGBA", img.size, (0, 0, 0, 0))
    hdraw = ImageDraw.Draw(highlight)
    hdraw.ellipse(
        (cx - radius * 0.55, cy - radius * 0.62, cx - radius * 0.05, cy - radius * 0.12),
        fill=(255, 236, 196, 38),
    )
    hdraw.ellipse(
        (cx + radius * 0.08, cy + radius * 0.18, cx + radius * 0.62, cy + radius * 0.72),
        fill=(58, 42, 10, 28),
    )
    return Image.alpha_composite(img, highlight)


with Image.open(SRC) as source:
    cutout = remove(source)
    cutout = crop_to_alpha(cutout, padding=4)
    cutout = restore_inner_face(cutout)
    size = min(cutout.size)
    left = (cutout.width - size) // 2
    top = (cutout.height - size) // 2
    cutout = cutout.crop((left, top, left + size, top + size))
    cutout = cutout.resize((512, 512), Image.Resampling.LANCZOS)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    cutout.save(OUT, "PNG", optimize=True)
    print(f"OK: {OUT} ({cutout.size[0]}x{cutout.size[1]})")
