#!/usr/bin/env python3
"""
deploy_to_hytale.py
====================
One-click deployer: copies Blockbench exports to the correct Hytale mod directory.

Usage:
  python deploy_to_hytale.py              # deploy all found files
  python deploy_to_hytale.py --dry-run    # preview only, no files copied
  python deploy_to_hytale.py --source /path/to/exports --target /path/to/mod

Setup:
  Edit SOURCE_FOLDER and TARGET_FOLDER in the CONFIGURATION section below.

Version: 1.0.0
"""

import os
import shutil
import sys
import argparse
import logging
from datetime import datetime
from pathlib import Path

# ============================================================
# CONFIGURATION -- EDIT THESE FOR YOUR SETUP
# ============================================================

# Where Blockbench exports your files (.geo.json, .png, .animation.json)
# Windows example:  r"C:\Users\YourName\Documents\BlockbenchExports"
# Mac/Linux example: "/Users/yourname/Documents/BlockbenchExports"
SOURCE_FOLDER = r"C:\Users\YourName\Documents\BlockbenchExports"

# Root folder of your Hytale mod
# Windows example:  r"C:\Users\YourName\AppData\Roaming\Hytale\mods\MyMod"
# Mac/Linux example: "/home/yourname/.hytale/mods/MyMod"
TARGET_FOLDER = r"C:\Users\YourName\AppData\Roaming\Hytale\mods\MyHytaleMod"

# Log file path (relative to script location, or use absolute path)
LOG_FILE = "deploy_log.txt"

# ============================================================
# SMART ROUTING RULES
# Keywords in filenames map to destination subdirectories.
# Format: (keyword_or_None, models_subdir, textures_subdir)
# First matching rule wins. None = catch-all fallback.
# ============================================================
ROUTING_RULES = [
    ("character",    "models/characters",   "textures/characters"),
    ("player",       "models/characters",   "textures/characters"),
    ("avatar",       "models/characters",   "textures/characters"),
    ("creature",     "models/creatures",    "textures/creatures"),
    ("animal",       "models/creatures",    "textures/creatures"),
    ("mob",          "models/creatures",    "textures/creatures"),
    ("monster",      "models/creatures",    "textures/creatures"),
    ("weapon",       "models/items",        "textures/items"),
    ("sword",        "models/items",        "textures/items"),
    ("staff",        "models/items",        "textures/items"),
    ("bow",          "models/items",        "textures/items"),
    ("axe",          "models/items",        "textures/items"),
    ("item",         "models/items",        "textures/items"),
    ("tool",         "models/items",        "textures/items"),
    ("chest",        "models/props",        "textures/props"),
    ("prop",         "models/props",        "textures/props"),
    ("furniture",    "models/props",        "textures/props"),
    ("env",          "models/environment",  "textures/environment"),
    ("block",        "models/environment",  "textures/environment"),
    (None,           "models",              "textures"),   # catch-all
]

# ============================================================
# ANSI COLORS (auto-disabled on non-TTY terminals)
# ============================================================
class C:
    _on = sys.stdout.isatty()
    OK     = "\033[92m" if _on else ""
    FAIL   = "\033[91m" if _on else ""
    WARN   = "\033[93m" if _on else ""
    INFO   = "\033[96m" if _on else ""
    BOLD   = "\033[1m"  if _on else ""
    RESET  = "\033[0m"  if _on else ""


# ============================================================
# FILE CLASSIFICATION
# ============================================================

def classify(path: Path):
    """Return file type string or None if unsupported."""
    name = path.name.lower()
    if name.endswith(".geo.json"):
        return "geo"
    if name.endswith(".animation.json"):
        return "animation"
    if path.suffix.lower() == ".png":
        return "texture"
    if path.suffix.lower() == ".json" and not name.endswith(".geo.json") and not name.endswith(".animation.json"):
        return "json"
    return None


def route(filename: str):
    """Return (models_subdir, textures_subdir) based on keyword match."""
    low = filename.lower()
    for kw, m, t in ROUTING_RULES:
        if kw is None or kw in low:
            return m, t
    return "models", "textures"


def destination(src: Path, ftype: str, target_root: Path) -> Path:
    """Compute full destination path for a file."""
    models_dir, tex_dir = route(src.name)
    assets = target_root / "assets"
    if ftype == "geo":
        return assets / models_dir / src.name
    if ftype == "texture":
        return assets / tex_dir / src.name
    if ftype in ("animation", "json"):
        return assets / "animations" / src.name
    return assets / src.name


# ============================================================
# CORE DEPLOY
# ============================================================

def deploy(source_root: Path, target_root: Path, dry_run: bool, logger):
    print()
    print(f"{C.BOLD}{'='*62}{C.RESET}")
    print(f"{C.BOLD}  Hytale Deploy Tool v1.0.0{C.RESET}")
    if dry_run:
        print(f"{C.WARN}  DRY-RUN MODE -- nothing will be copied{C.RESET}")
    print(f"{C.BOLD}{'='*62}{C.RESET}")
    print(f"  Source : {source_root}")
    print(f"  Target : {target_root}")
    print(f"{C.BOLD}{'='*62}{C.RESET}")
    print()

    if not source_root.exists():
        print(f"{C.FAIL}[ERROR]{C.RESET} Source folder not found: {source_root}")
        print("  Edit SOURCE_FOLDER in the CONFIGURATION section of this script.")
        logger.error(f"Source not found: {source_root}")
        return 0, 1

    files = sorted([f for f in source_root.rglob("*") if f.is_file()])
    if not files:
        print(f"{C.WARN}[WARN]{C.RESET} No files found in source folder.")
        return 0, 0

    ok = fail = skip = 0

    for src in files:
        ftype = classify(src)
        if ftype is None:
            skip += 1
            continue

        dst = destination(src, ftype, target_root)
        label = src.name
        dst_short = str(dst).replace(str(target_root), "[mod]") if str(target_root) in str(dst) else str(dst)

        try:
            if not dry_run:
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(str(src), str(dst))
                if dst.stat().st_size != src.stat().st_size:
                    raise ValueError("size mismatch after copy")
            print(f"{C.OK}[OK]  {C.RESET}{label}")
            print(f"      -> {dst_short}")
            logger.info(f"OK: {src} -> {dst}")
            ok += 1
        except Exception as e:
            print(f"{C.FAIL}[FAIL]{C.RESET} {label}")
            print(f"      ERROR: {e}")
            logger.error(f"FAIL: {src} -> {dst} | {e}")
            fail += 1

    print()
    print(f"{C.BOLD}{'='*62}{C.RESET}")
    color = C.OK if fail == 0 else C.WARN
    print(f"{color}  Result: {ok} deployed | {fail} failed | {skip} skipped{C.RESET}")
    if dry_run:
        print(f"{C.WARN}  DRY-RUN: no files were actually copied{C.RESET}")
    print(f"  Log: {os.path.abspath(LOG_FILE)}")
    print(f"{C.BOLD}{'='*62}{C.RESET}")
    print()
    return ok, fail


# ============================================================
# LOGGING SETUP
# ============================================================

def setup_logging():
    logger = logging.getLogger("deploy")
    logger.setLevel(logging.DEBUG)
    h = logging.FileHandler(LOG_FILE, encoding="utf-8")
    h.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s", "%Y-%m-%d %H:%M:%S"))
    logger.addHandler(h)
    logger.info(f"=== Session started {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} ===")
    return logger


# ============================================================
# ENTRY POINT
# ============================================================

def main():
    p = argparse.ArgumentParser(
        description="deploy_to_hytale.py: Copy Blockbench exports to your Hytale mod folder.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""Examples:
  python deploy_to_hytale.py                      # deploy all files
  python deploy_to_hytale.py --dry-run            # preview only
  python deploy_to_hytale.py --source /my/exports --target /my/mod

Edit SOURCE_FOLDER and TARGET_FOLDER at the top of this script.
Always run --dry-run first to verify paths!
"""
    )
    p.add_argument("--dry-run",  action="store_true", help="Preview without copying")
    p.add_argument("--source",   default=None, help=f"Override SOURCE_FOLDER")
    p.add_argument("--target",   default=None, help=f"Override TARGET_FOLDER")
    args = p.parse_args()

    src = Path(args.source) if args.source else Path(SOURCE_FOLDER)
    tgt = Path(args.target) if args.target else Path(TARGET_FOLDER)

    logger = setup_logging()
    ok, fail = deploy(src, tgt, args.dry_run, logger)
    sys.exit(0 if fail == 0 else 1)


if __name__ == "__main__":
    main()
