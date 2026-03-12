---
name: hytale-3d-modeling
version: 2.0.0
title: Hytale 3D Modeling & Asset Pipeline
description: Complete guide for 3D modeling and importing/exporting assets in Hytale using Blockbench and Blender. Family-friendly progression from beginner to intermediate. Covers the Hytale Avatar Loader plugin, gradient maps, UV mapping, animation, and the full asset pipeline.
tags: [hytale, 3d-modeling, blockbench, blender, game-assets, family, beginner]
author: synthesized
---

# Hytale 3D Modeling & Asset Pipeline

Welcome to your complete guide for creating, editing, and working with 3D models in Hytale!
Whether you are a curious kid picking up a mouse for the first time or a parent helping your
family dive into game modding together, this skill walks you through every step from opening
Blockbench all the way to seeing your custom creation inside the game world.
No prior 3D modeling experience needed. Let's build something awesome!

---

## Table of Contents

1. [Overview and Introduction](#1-overview-and-introduction)
2. [Required Tools and Setup](#2-required-tools-and-setup)
3. [Hytale Avatar Loader Plugin](#3-hytale-avatar-loader-plugin-blockbench)
4. [Hytale Model Formats and File Structure](#4-hytale-model-formats-and-file-structure)
5. [Blockbench Workflow](#5-blockbench-workflow)
6. [Blender Workflow](#6-blender-workflow)
7. [The Full Hytale Asset Pipeline](#7-the-full-hytale-asset-pipeline)
8. [Beginner Learning Path](#8-beginner-learning-path)
9. [Intermediate Techniques](#9-intermediate-techniques)
10. [Quick Reference Checklists](#10-quick-reference-checklists)
11. [Key Tips and Best Practices](#11-key-tips-and-best-practices)
12. [Video Resources Index](#12-video-resources-index)
13. [4-Week Family Learning Track](#13-4-week-family-learning-track)
14. [Practice Projects Library](#14-practice-projects-library)
15. [Family Learning Session Template](#15-family-learning-session-template)
16. [One-Click Deployer Tool](#16-one-click-deployer-tool)
17. [Automation Ideas Catalog](#17-automation-ideas-catalog)
18. [Glossary](#18-glossary)

---

## 1. Overview and Introduction

### What Is Hytale?

Hytale is an upcoming adventure and creative sandbox game developed by Hypixel Studios (acquired
by Riot Games). It is built from the ground up to be deeply moddable, blending exploration,
building, combat, and storytelling in a richly detailed voxel-style world. The game is designed
so that players and creators can add their own characters, weapons, environments, creatures, and
animations using official modding tools.

Hytale uses a JSON-based model format closely related to the Minecraft Bedrock Edition model
spec. This means the existing Blockbench tool ecosystem already supports it extremely well, which
is a huge advantage for new learners since the tools are free and beginner-friendly.

### Why 3D Modeling Matters for Hytale

- Custom player avatars: design your own look with unique skin, hair, eyes, clothing, and accessories
- Custom items and props: create swords, tools, furniture, treasure chests, and decorations
- Custom creatures and mobs: build entirely new enemies, companions, or wildlife
- Custom animations: bring characters to life with walk cycles, attacks, and idle poses
- Community sharing: publish your creations so the entire Hytale community can use them
- Transferable skills: everything you learn applies to Minecraft Bedrock, Roblox, and other games too

### Family Learning Approach

This guide is written for families learning together. Technical words are explained in plain
language the first time they appear. Every section builds on the last so you never feel lost.
You do NOT need any prior 3D modeling experience to begin.

The best approach for families:
1. Read a section together out loud
2. Open the tool and try it yourself
3. Break something on purpose and fix it (that is literally how you learn!)
4. Celebrate every small win -- every exported model is a real achievement

> Family tip: Blockbench has a free web version at https://web.blockbench.net that runs in any
> browser with no installation. Great for Chromebooks or school computers!

---

## 2. Required Tools and Setup

### Primary Tool: Blockbench (Free -- Start Here!)

Blockbench is a free, open-source 3D modeling application designed specifically for block-based
and low-poly game models. It is THE go-to tool for Hytale modeling -- beginner-friendly yet
powerful enough for professional work. It runs on Windows, macOS, Linux, and in the browser.

#### Installation Steps

1. Go to https://www.blockbench.net
2. Click Download and choose your operating system (Windows / macOS / Linux)
3. OR use the web app at https://web.blockbench.net -- no installation needed!
4. Install and launch the application
5. On first launch, close any update prompts and explore the welcome screen

> IMPORTANT for the Hytale Avatar Loader plugin: You MUST use the DESKTOP version of Blockbench
> (not the web version) because the plugin needs file system access.
> Desktop version required: Blockbench v5.0.7 or higher.

#### First-Launch Setup for Hytale Work

1. Open Blockbench
2. Click File -> New
3. In the format selector, choose Hytale Character format
   - If Hytale Character is not listed, choose Bedrock Model (functionally identical)
4. Set your model identifier (e.g. geometry.custom.my_first_model)
5. Set texture dimensions: 64x64 for standard, 128x128 for high detail
6. Click Confirm -- you have an empty scene ready to build!

### Secondary Tool: Blender (Free -- Optional)

Blender is a free, professional-grade 3D suite used by studios worldwide. For Hytale work it is
optional. Use it when you need:
- Complex organic shapes that are hard to make from cubes alone
- Advanced UV unwrapping and texture baking
- Character rigging with weight painting
- High-quality promotional renders

Installation: Go to https://www.blender.org, click Download, choose your OS, install and launch.

> Beginner advice: Start with Blockbench first. Come back to Blender once you have built several
> models and feel comfortable. Blender has a steeper learning curve but the skills complement perfectly.

### Supporting Tools

| Tool | Purpose | Where to Get |
|------|---------|______________|
| Paint.NET | Free texture/image editing | getpaint.net |
| GIMP | Free advanced image editing | gimp.org |
| Photoshop | Professional image editing | adobe.com |
| 7-Zip | Extracting game asset ZIP files | 7-zip.org |
| Notepad++ | Editing JSON model files | notepad-plus-plus.org |
| VS Code | Advanced JSON/code editing | code.visualstudio.com |
| CraftHead | Web service for Hytale avatar loading | crafthead.net |

---
## 3. Hytale Avatar Loader Plugin (Blockbench)

The Hytale Avatar Loader is a Blockbench plugin created by PasteDev (with contributions from
KevinLWorthington) that loads complete Hytale player avatars -- including all textures and
gradient maps -- directly into Blockbench for viewing and editing.

Plugin metadata:
  Plugin ID:      hytale_avatar_loader
  Version:        1.2.0
  Author:         PasteDev  https://pastelito.dev/  Twitter: https://x.com/MrPastelitoo_
  Contributors:   KevinLWorthington (v1.2.0)
  First Released: 2026-01-16
  Requires:       Blockbench Desktop v5.0.7 or higher
  Format:         Only works in the Hytale Character format

### What the Plugin Does

- Loads a full Hytale avatar with ALL components at once: skin, hair, eyes, facial features, clothing, accessories
- Applies textures AND gradient maps automatically so the avatar looks exactly like in-game
- Smart color preservation: maintains existing colors (gold accents etc.) while applying gradient maps to grayscale areas
- Load avatars two ways: local JSON file from CachedPlayerSkins, OR by username via crafthead.net
- Automatically imports default Hytale character animations from the Assets folder
- Creates timestamped temporary folders to prevent overwriting when loading multiple avatars
- Automatic detection of material types and application of the correct gradient set
- Face and ear textures automatically receive the body characteristic skin color
- Resolve Textures action for texture groups tied to avatar collections
- Bone offsets normalized on attachment import for correct positioning
- Compatible with Hytale Models plugin v0.7.0+

### Installation

Method 1 -- Blockbench Plugin Store (Recommended):
  1. Open Blockbench desktop version
  2. Go to File -> Plugins
  3. Click the Available tab
  4. Search for: Hytale Avatar Loader
  5. Click Install next to the plugin by PasteDev
  6. Restart Blockbench if prompted
  7. Verify: you should now see File -> Import -> Load Hytale Avatar

Method 2 -- Manual Installation:
  1. Download the plugin .js file from the PasteDev repository
  2. Go to File -> Plugins in Blockbench
  3. Click the folder icon (Load Plugin from File)
  4. Browse to and select the downloaded .js file
  5. Plugin activates immediately -- no restart needed

### Menu Items Added by the Plugin

  File -> Import -> Load Hytale Avatar              (load from local JSON file)
  File -> Import -> Load Hytale Avatar from URL     (load by username)
  File -> Preferences -> Change Hytale Assets Folder
  Resolve Textures button                           (appears in Textures toolbar when needed)

### How to Use: Load from Local File (CachedPlayerSkins)

When you run the Hytale launcher and log in, avatar data is cached locally as a JSON file.

Cache folder path:
  %appdata%\Hytale\UserData\CachedPlayerSkins

Steps:
  1. Press Win+R, type: %appdata%\Hytale\UserData\CachedPlayerSkins, press Enter
  2. You will see JSON files for your avatar and players you have encountered
  3. In Blockbench, ensure you are in Hytale Character format
  4. Go to File -> Import -> Load Hytale Avatar
  5. A message box confirms the CachedPlayerSkins folder location -- click OK
  6. Browse to and select your avatar JSON file
  7. If no Assets folder is saved yet (first time only):
     a. Extract Assets.zip from the Assets ZIP path below
     b. Select the extracted Assets folder when prompted
     c. Path saves automatically in localStorage under key: hytale_assets_path
  8. The plugin loads the full avatar with all components, textures, and gradient maps!

### How to Use: Load by Hytale Username

  1. File -> Import -> Load Hytale Avatar from URL
  2. Enter the Hytale username in the dialog
  3. Click Load -- plugin fetches from: https://crafthead.net/hytale/profile/{username}
  4. Plugin extracts data.skin or data as avatar data object and validates it
  5. If no Assets folder cached, you will be prompted (same one-time process as above)
  6. Avatar loads with all components and textures applied

### One-Time Setup: Extracting the Assets ZIP

Assets ZIP path:
  %appdata%\Hytale\install\release\package\game\latest

Steps (do this once):
  1. Press Win+R, type the path above, press Enter
  2. Find Assets.zip in that folder
  3. Right-click -> Extract Here (using 7-Zip or WinRAR)
  4. Note the full path to the extracted Assets folder
  5. When Blockbench prompts, browse to this Assets folder
  6. Path saves automatically for all future loads

Internal default animations path (auto-used by plugin within extracted Assets):
  Assets\Common\Characters\Animations\Default

### Changing the Assets Folder Later

  File -> Preferences -> Change Hytale Assets Folder
  Browse to new location, confirm. New path saves to localStorage.

### Resolve Textures Feature

After loading an avatar, a Resolve Textures button may appear in the Textures toolbar.
- Only appears when texture groups tied to avatar collections exist
- Click it to correctly link all textures from the avatar collection
- Button hides itself after resolving (job complete)

### Full Plugin Changelog: v1.0.0 through v1.2.0

v1.0.0 -- Initial Release (2026-01-16, PasteDev)
  - Load complete Hytale avatars from local JSON cache files
  - Automatic gradient map processing for grayscale textures
  - Smart color preservation: maintains gold accents etc. while applying gradient maps
  - Batch processing of all avatar components: body, hair, eyes, facial features, clothing, accessories
  - Timestamped temp folders to prevent overwriting multiple avatar loads
  - Automatic material type detection and correct gradient set application
  - Face and ear textures automatically use body characteristic skin color

v1.1.0 -- Animation Import (2026-01-18, PasteDev)
  - Automatic animation import from Assets\Common\Characters\Animations\Default
  - Imports ALL default Hytale character animations
  - Excludes FPS (first-person) animation variants

v1.1.1 -- Resolve Textures Action (2026-01-22, PasteDev)
  - Added Resolve Textures action for texture groups tied to avatar collections
  - Resolve button appears only when groups exist, hides after resolving
  - UI and texture handling refactors to reduce duplicated code

v1.1.2 -- Stability and Compatibility (2026-02-04, PasteDev)
  - Avatar collections always show correctly in the Outliner
  - Prevent duplicate Resolve Textures buttons in Textures toolbar
  - Normalize bone offsets on attachment import for correct positioning
  - Support for Hytale Models plugin v0.7.0

v1.2.0 -- Username Loading and Preferences (2026-02-04, KevinLWorthington)
  - Fetch avatars directly from crafthead.net by Hytale username
  - Asset path saved using LocalStorage (persists across Blockbench restarts)
  - Asset path changeable via File -> Preferences -> Change Hytale Assets Folder

---
## 4. Hytale Model Formats and File Structure

### The JSON Geometry Format

Hytale uses a JSON-based geometry format derived from Minecraft Bedrock Edition models.
The structure has these key parts:

  format_version: '1.12.0'  (use this exact value for geometry)
  minecraft:geometry array containing one or more geometry definition objects
  Each object has a description block and a bones array

description block fields:
  identifier        Unique model name. Format: geometry.creator.category.name
  texture_width     MUST exactly match your PNG pixel width (e.g. 64)
  texture_height    MUST exactly match your PNG pixel height (e.g. 64)
  visible_bounds_width   Rendering bounding box width (2 is standard for characters)
  visible_bounds_height  Rendering bounding box height (4 is standard for characters)
  visible_bounds_offset  Bounding box offset from origin, e.g. [0, 1, 0]

bones array -- each bone object has:
  name      Unique bone name. Use Hytale standard names for animated body parts.
  parent    Optional. Name of parent bone -- creates the hierarchy.
  pivot     [X, Y, Z] rotation point. Set this to the anatomical joint location!
  cubes     Array of cube objects attached to this bone
  inflate   Optional. Expands cubes outward (use 0.25-0.5 for clothing over body)

cubes array -- each cube object has:
  origin    [X, Y, Z] position of the cube minimum corner in 3D space
  size      [Width, Height, Depth] of the cube in game units
  uv        [U, V] offset on the texture sheet for this cube faces

CRITICAL RULE: texture_width and texture_height in JSON MUST match actual PNG dimensions.
Mismatch = broken UV mapping and wrong-looking textures in-game.

### Hytale Asset Folder Structure

After extracting Assets.zip:

  [Extracted Assets folder]/
    Common/
      Characters/
        Animations/
          Default/            <- Auto-imported by Avatar Loader plugin
            walk.animation.json
            idle.animation.json
            run.animation.json
            [more animations]
    Characters/
      Player/
        Base/
          model.geo.json      <- Body geometry
          texture.png         <- Main skin texture
          gradient.png        <- Gradient/tint map
        Hair/
          [style_name]/
            model.geo.json
            texture.png
            gradient.png
        Eyes/
          [style_name]/
        Clothing/
          Inner/              <- First clothing layer
          Outer/              <- Second layer (coat, armor)
        Accessories/
    Items/
      Weapons/
      Tools/
    Environment/
      Blocks/
      Props/

Cache folder for loaded player skins:
  %appdata%\Hytale\UserData\CachedPlayerSkins

Assets ZIP source:
  %appdata%\Hytale\install\release\package\game\latest

### Texture Formats

| Texture Type          | Format               | Purpose                                    |
|-----------------------|----------------------|--------------------------------------------|
| Main texture          | RGBA PNG             | Primary color and skin information         |
| Gradient map          | Horizontal color PNG | Maps grayscale values to a color range     |
| Normal map (advanced) | PNG                  | Surface detail shading without geometry    |
| Emissive map (adv.)   | PNG                  | Controls which parts glow or emit light    |

Recommended texture sizes:

| Model Type              | Texture Size |
|-------------------------|--------------|
| Player body (standard)  | 64x64 px     |
| Player body (HD)        | 128x128 px   |
| Small prop or item      | 16x16 px     |
| Weapon                  | 32x32 px     |
| Large creature          | 128x128 px   |

### Understanding Gradient Maps

Gradient maps are one of the most distinctive features of the Hytale art style.

How it works:
  1. The base texture is painted in pure GRAYSCALE -- only light and dark, no color
  2. The gradient map is a wide, short PNG -- a horizontal strip of colors left to right
  3. At runtime Hytale maps grayscale to gradient:
     Black (dark gray)  -> leftmost color of the gradient strip
     White (light gray) -> rightmost color of the gradient strip
     Mid grays          -> proportional colors from the middle
  4. Re-color by swapping gradient map PNG -- no changes to geometry needed!
  5. Smart color preservation: Avatar Loader keeps gold accents while applying gradient

Example:
  Warrior has grayscale base texture.
  Gradient strip: dark brown -> mid brown -> tan = brown warrior in game
  Swap gradient to: dark green -> mid green -> light green = same model, now an orc!

Painting for gradient maps:
  - Use pure grayscale (keep R=G=B equal at all times)
  - Bright white areas show rightmost gradient color
  - Dark black areas show leftmost gradient color
  - Plan your light vs dark placement based on the intended gradient colors

### Avatar Components

A full Hytale player avatar is assembled from multiple separate model files:

| Component       | Description                          | How It Layers            |
|-----------------|--------------------------------------|--------------------------|
| Base Body       | Torso, arms, legs                    | Foundation               |
| Head            | Head cube geometry                   | On body head bone        |
| Hair            | Hairstyle mesh (many styles)         | Over head                |
| Eyes            | Eye geometry and texture             | Inside head              |
| Facial Features | Eyebrows, nose, mouth                | Overlay on head          |
| Inner Clothing  | Shirt, pants (first layer)           | inflate ~0.25 over body  |
| Outer Clothing  | Coat, armor, robe (second layer)     | inflate ~0.5 over inner  |
| Accessories     | Hats, backpacks, earrings, capes     | Attachment point-based   |

Standard character proportions from official Hytale assets:
  Head:  8x8x8 units
  Body:  8x12x4 units
  Arms:  4x12x4 units each
  Legs:  4x12x4 units each

---
## 5. Blockbench Workflow

### Interface Overview

Three main working modes (tabs at top of screen):
  Edit mode    -- building and adjusting 3D geometry (default when you open a project)
  Paint mode   -- drawing textures directly on the model
  Animate mode -- creating and editing animation clips

Main interface areas:
  Viewport (center)         3D view of your model
  Outliner (top right)      All bones and cubes in a hierarchy list
  Properties (right)        Selected element position, size, UV, rotation data
  Texture Panel (btm rt)    Texture files assigned to the model
  Timeline (bottom)         Animation keyframes -- only visible in Animate mode
  Toolbar (top)             Tools and mode buttons

Viewport navigation:
  Rotate view:       Left-click + drag
  Pan view:          Middle-click + drag (or Shift + left-drag)
  Zoom:              Scroll wheel
  Front view:        Numpad 1
  Side view:         Numpad 3
  Top view:          Numpad 7
  Perspective/ortho: Numpad 5
  Focus selection:   F key

### Creating a New Model

  1. File -> New
  2. Choose Hytale Character or Bedrock Model format
  3. Model Identifier: geometry.yourname.category.modelname
     Example: geometry.coolfamily.item.magic_staff
  4. Texture Width: 64 (standard) or 128 (high detail)
  5. Texture Height: 64 (standard) or 128 (high detail)
  6. Click Confirm -- empty scene ready to build!

### Working with Bones

Bones are invisible joints that hold cubes and enable animation.
Good bone structure = working animations. Bad bones = broken character.

Creating a bone:
  Click the + icon next to a bone in the Outliner (creates child bone)
  Or right-click in Outliner -> Add Bone
  Name it immediately after creating it!

Standard Hytale bone hierarchy:
  root
  +-- body             (torso cubes here)
  |   +-- head         (parented to body)
  |   |   +-- hair
  |   |   +-- face     (eyes, eyebrows)
  |   +-- left_arm     (parented to body)
  |   |   +-- left_hand
  |   +-- right_arm
  |       +-- right_hand
  +-- left_leg         (parented to root)
  |   +-- left_foot
  +-- right_leg
      +-- right_foot

Bone naming rules (critical for animations to work!):
  ALWAYS lowercase + underscores:  left_arm  (correct)
  NOT capitalized:                 Left_Arm  (wrong)
  NOT camelCase:                   leftArm   (wrong)
  Standard body names: body, head, left_arm, right_arm, left_leg, right_leg
  Custom accessory names: hat, cape, backpack, left_hand_item, right_hand_item
  ALWAYS set pivot point to the anatomical joint BEFORE adding cubes to the bone

### Adding and Editing Cubes

  1. Select a bone in Outliner
  2. Press Ctrl+B or click Add Cube in toolbar
  3. Cube appears at origin
  4. In Properties panel, enter exact values:
     Origin: X, Y, Z position of the cube minimum corner
     Size:   Width, Height, Depth in game units
  5. Use Move tool (W) to drag into place
  6. Use Rotate tool (E) for rotation
  7. Use Scale tool (R) to resize interactively

Essential keyboard shortcuts:
  W        Move tool
  E        Rotate tool
  R        Scale tool
  Ctrl+B   Add cube
  Ctrl+Z   Undo
  Ctrl+Y   Redo
  Ctrl+S   Save project (.bbmodel)
  Ctrl+A   Select all
  Delete   Remove selected element
  F        Focus view on selection

### UV Mapping and Textures

Creating a texture:
  1. In Texture panel, click the + button
  2. Choose Create Texture
  3. Set dimensions matching model declaration (64x64 standard)
  4. Name it: my_model_texture.png

Auto UV (fastest way to start):
  1. Select all cubes (Ctrl+A)
  2. Right-click -> Auto UV
  3. Blockbench automatically lays out all faces without overlapping
  4. Refine manually afterward for pixel-perfect results

Manual UV:
  1. Select a cube in Outliner
  2. Properties panel UV section shows faces as colored squares
  3. Drag each face to position on the texture grid
  4. Use UV Editor tab at bottom to see full texture with all face rectangles laid out

### Texture Painting

  1. Click the Paint tab in top toolbar
  2. Select brush from toolbar
  3. Set Size (1-2px for crisp pixel art, 4-8px for broad strokes)
  4. Pick Color in color picker
  5. Click or drag on 3D model -- texture updates live!
  6. Use 2D texture panel for precision pixel work
  7. Ctrl+Z = undo, use it freely!

Hytale painting style tips:
  - 3 values per color: dark shadow / mid base / bright highlight
  - Hard-edged transitions (no smooth gradients) -- pixel art aesthetic
  - Shadows on undersides, crevices, and corners
  - Highlights on top surfaces facing skylight
  - Outline pixels along visible silhouette edges
  - For gradient maps: paint only in grayscale (keep R=G=B equal at all times)
  - Right-click texture -> Save to save PNG separately from .bbmodel

### Exporting from Blockbench

Step 1 -- Save project (ALWAYS FIRST):
  File -> Save As -> [name].bbmodel
  This is the editable master. Never lose it!

Step 2 -- Export geometry:
  File -> Export -> Export Bedrock Geometry
  Save as: [name].geo.json (in your mod asset folder)

Step 3 -- Export texture:
  Texture panel -> right-click texture -> Save As
  Save as: [name]_texture.png (SAME folder as geometry JSON)

Step 4 -- Export animations (if applicable):
  File -> Export -> Export Bedrock Animations
  Save as: [name].animation.json (same folder)

### Creating Animations

  1. Click Animate tab in top toolbar
  2. Click + next to Animations in Outliner to create animation clip
  3. Name it: animation.character.walk
  4. Set Loop ON (for idle, walk, run) or OFF (for attack, jump, death)

Adding keyframes:
  1. Move timeline cursor to a time (e.g. 0.0)
  2. Select a bone (e.g. left_leg)
  3. Rotate/move bone to desired pose
  4. Click diamond icon to record keyframe
  5. Move to new time (e.g. 0.5), pose differently, add another keyframe
  6. Blockbench interpolates movement between keyframes smoothly
  7. Spacebar to preview playback

Simple walk cycle recipe (1 second loop):
  0.0s:  left leg 30deg forward, right leg 30deg back, arms opposite
  0.25s: both legs at center, body 1 unit lower (ground contact dip)
  0.5s:  left leg 30deg back, right leg 30deg forward (mirror of 0.0s)
  0.75s: both legs at center, body 1 unit lower again
  1.0s:  identical to 0.0s (loop closes cleanly)
  + body bobs gently down at 0.25s and 0.75s
  + arms swing opposite to legs throughout

Animation naming convention:
  animation.character.idle
  animation.character.walk
  animation.character.run
  animation.character.jump
  animation.character.attack_melee
  animation.character.hurt
  animation.character.death

Animation JSON: Bedrock format_version 1.8.0
  animations object contains named clips
  Each clip: animation_length, loop flag, bones object
  bones: maps bone name to rotation/position/scale channels
  Each channel: maps time string to [X, Y, Z] value array

---
## 6. Blender Workflow

Blender is optional but powerful for complex organic shapes, advanced UV work,
texture baking, or high-quality reference renders. Download free at: blender.org

### Blockbench to Blender
  Blockbench: File -> Export -> Export as OBJ (or FBX)
  Blender:    File -> Import -> Wavefront (.obj) or FBX (.fbx)
  After import: select object, press Ctrl+A -> Apply Scale to normalize size

### Blender to Blockbench (Return Trip)
  Blender:    File -> Export -> FBX (Armature ON, Mesh ON, Apply Modifiers ON)
  Blockbench: File -> Import -> appropriate importer
  Rebuild UVs if needed, then export to .geo.json as normal

### Poly Count Guidelines

| Model Type               | Target Triangles  |
|--------------------------|-------------------|
| Player character (full)  | 500 - 1,500       |
| Simple prop / item       | 50 - 200          |
| Medium prop (furniture)  | 200 - 500         |
| Creature / monster       | 500 - 2,000       |
| Complex boss creature    | 2,000 - 5,000     |

Check poly count: Viewport Overlays (top-right toggle) -> Statistics -> select mesh

Optimization tips:
  - Mesh -> Merge Vertices -> By Distance (removes duplicate vertices)
  - Delete faces permanently hidden inside solid geometry
  - Use textures for surface detail, not extra polygons
  - Remove edge loops that do not change the visible silhouette

### UV Unwrapping in Blender
  1. Edit Mode (Tab) -> Select All (A)
  2. U -> Smart UV Project (quick auto-layout)
     OR U -> Unwrap (best quality -- requires marking seams first)
  3. UV Editor: arrange islands, UV -> Export UV Layout as guide PNG
  Placing seams: Ctrl+E -> Mark Seam on edges at natural hidden locations
  Best seam placements: under arms, inside legs, back of head, underside of objects

### Texture Baking (Ambient Occlusion)
  1. Switch to Cycles renderer in Properties -> Render
  2. Select mesh, add Image Texture node in Shader Editor
  3. Create new blank image in that node, click node to make it active (orange outline)
  4. Properties -> Render -> Bake -> Type: Ambient Occlusion
  5. Click Bake -- shadows appear in all crevices and corners automatically
  6. Image -> Save As to export the baked AO texture
  7. In Paint.NET or GIMP: multiply-blend AO over your painted texture (30-60% opacity)
  8. Result: much richer, more professional looking low-poly model

### Basic Character Rigging
  1. Shift+A -> Armature -> Single Bone to create armature
  2. Edit Mode (Tab): build skeleton (root -> body -> head, arms, legs)
  3. Name every bone EXACTLY to match Hytale standard names (case-sensitive!)
  4. Set pivot points at anatomical joint locations (shoulders, hips, knees, ankles)
  5. Exit Edit Mode, select MESH first, then Shift-click ARMATURE
  6. Ctrl+P -> Armature Deform with Automatic Weights
  7. Test deformations in Pose Mode (Ctrl+Tab), refine with Weight Paint if needed
  8. Export: File -> Export -> FBX with both Armature and Mesh checked

---

## 7. The Full Hytale Asset Pipeline

Follow this complete 8-step workflow from idea to in-game model every single time.

### Step 1: Concept and Reference
  - Sketch your design on paper or digitally (even a rough scribble helps enormously)
  - Decide model type: character piece / prop / creature / item
  - Use Avatar Loader plugin to study official Hytale assets for style and proportions
  - Note proportions, color palette, and level of detail from official references
  - Official style hallmarks: blocky but expressive, 3-value shading, strong silhouette

### Step 2: Modeling in Blockbench
  - File -> New -> Hytale Character format
  - Set model identifier: geometry.yourname.category.modelname
  - Create root bone, set up full bone hierarchy with correct standard names
  - Block out rough proportions first -- refine geometry in the next pass
  - Set pivot points at ALL joints BEFORE adding cubes to each bone

### Step 3: UV Mapping
  - Create texture file at correct dimensions (64x64 standard for characters)
  - Auto UV all cubes first, then refine manually for clean layout
  - Verify NO faces are unmapped or overlapping on the texture sheet
  - Confirm texture_width and texture_height in project match actual PNG

### Step 4: Texturing
  - Paint in Blockbench Paint mode or external editor (Paint.NET, GIMP, Aseprite)
  - Apply 3-step shading: shadow / mid-tone / highlight
  - Add personality details, markings, and wear patterns
  - Create gradient map PNG if using Hytale gradient-map color system

### Step 5: Animation (Optional but Recommended)
  - Switch to Animate mode in Blockbench
  - Create named clips: idle, walk, attack, hurt, death as needed
  - Add keyframes by posing bones at specific time points
  - Preview, refine timing, ensure loops close cleanly (first frame = last frame)

### Step 6: Export All Files
  - Ctrl+S -> File -> Save As -> [name].bbmodel  (SAVE MASTER FIRST, always!)
  - File -> Export -> Bedrock Geometry -> [name].geo.json
  - Texture panel -> right-click -> Save As -> [name]_texture.png
  - File -> Export -> Bedrock Animations -> [name].animation.json (if animated)

### Step 7: Mod Folder Setup
  - Place .geo.json in correct mod asset folder (see organization in Section 11)
  - Place .png texture in SAME folder as .geo.json
  - Place .animation.json alongside other files
  - Verify JSON identifier matches what your mod code references
  - Double-check texture_width/height in .geo.json matches actual PNG dimensions

### Step 8: In-Game Testing
  - Enable mod in Hytale mod manager
  - Launch game and inspect model in-game
  - Checklist: visible? textures correct? right size? animations play? colors right? no clipping?
  - Fix issues in Blockbench -> re-export -> re-test -> iterate until satisfied

### File Format Reference

| File                   | Extension        | Notes                                     |
|------------------------|------------------|-------------------------------------------|
| Blockbench project     | .bbmodel         | Editable master -- NEVER skip saving this |
| Model geometry         | .geo.json        | Bedrock format exported from Blockbench   |
| Texture                | .png             | RGBA, dimensions MUST match JSON values   |
| Animation              | .animation.json  | Bedrock animation format v1.8.0           |
| Attachable definition  | .attachable.json | How items attach to character bones       |

### 10 Common Mistakes to Avoid

1. TEXTURE DIMENSION MISMATCH
   JSON says texture_width:64 but PNG is actually 128 wide
   Result: All UV faces display incorrectly -- stretched or tiled wrong
   Fix: Verify texture_width/height in JSON ALWAYS matches actual PNG dimensions

2. WRONG BONE NAMES
   Bone named Left_Arm or leftArm instead of left_arm
   Result: Animations play but that limb stays frozen in T-pose
   Fix: Use exact lowercase+underscore names. Copy from a reference if unsure.

3. PIVOTS AT WORLD ORIGIN
   Every bone pivot left at default [0,0,0]
   Result: Body parts rotate around world center, not their own joints
   Fix: Set each bone pivot to anatomical joint location BEFORE adding cubes

4. MISSING TEXTURE FILE
   Exported .geo.json but forgot to save texture .png alongside it
   Result: Model appears solid white or error pink in-game
   Fix: Always export geometry JSON AND texture PNG as an inseparable pair

5. INVERTED CUBE FACES
   A cube face accidentally points inward (inside-out geometry)
   Result: Face is invisible or shows wrong color from inside
   Fix: Right-click cube -> Flip Face in Blockbench

6. TOO MANY POLYGONS
   Excessive geometric detail that exceeds what the game needs
   Result: Performance lag in-game, especially with many characters on screen
   Fix: Stay within poly count targets from the table above; use textures for detail

7. UV OVERLAP
   Two different cube faces accidentally mapped to the same texture area
   Result: Painting one face accidentally paints the other face too
   Fix: Run Auto UV first, then check UV Editor for any remaining overlapping rects

8. WRONG FORMAT_VERSION
   Manually edited JSON with an unsupported format_version string
   Result: Model fails to load or causes the mod to crash
   Fix: Always use 1.12.0 for geometry files, 1.8.0 for animation files

9. EDITING .GEO.JSON DIRECTLY
   Manually editing the exported file, then later re-exporting from Blockbench
   Result: Re-export completely overwrites all your manual edits with no warning
   Fix: ALWAYS edit in .bbmodel master, then re-export. Never edit the JSON directly.

10. NOT SAVING .BBMODEL FIRST
    Exporting files without saving the .bbmodel project first, then unexpected crash
    Result: All work since the last save is permanently gone
    Fix: Ctrl+S to save .bbmodel FIRST every single time, BEFORE clicking Export

---
## 8. Beginner Learning Path

This path is designed for kids and families with zero prior 3D modeling experience.
Each milestone builds real, transferable skills. Celebrate every single one!

### The Golden Rule for Beginners

Open Blockbench and click things. You cannot permanently break anything -- Ctrl+Z undoes
every mistake. The number one enemy of learning is waiting for permission to experiment.
Just click, try, break things, undo, and try again. That IS the learning process.

### Milestone 1: Hello Cube! (Day 1 -- about 30 minutes)

Goal: Understand the Blockbench interface and create your very first 3D object.
  1. Open Blockbench (web version works great to start: web.blockbench.net)
  2. File -> New -> Bedrock Model, texture 64x64
  3. Add a cube (Ctrl+B)
  4. In Properties panel, change size to 8x8x8
  5. Create a texture (+ in Texture panel) at 64x64
  6. Click the Paint tab and pick a fun color
  7. Paint directly on the cube face in the 3D view
  8. Zoom around, rotate, and admire your creation!

Achievement unlocked: I made a 3D colored cube!

### Milestone 2: My First Prop (Days 2-3 -- about 2-4 hours total)

Goal: Build a recognizable object from multiple cubes.
Suggested project: A treasure chest
  - Bottom box:   12x8x8 units (main chest body)
  - Lid box:      12x4x8 units (sits on top of the bottom box)
  - Latch:        small 2x2x1 cube at front center of lid
  - Bones: chest_base, lid (child of base), latch (child of lid)
  - Paint: brown for wood planks, gold for metal trim, dark lines for wood grain
  - Bonus challenge: animate the lid opening with a simple keyframe!

Achievement unlocked: I built something recognizable from scratch!

### Milestone 3: Character Piece (Week 1-2)

Goal: Study an official Hytale avatar and build one piece of clothing or accessory.
  1. Install the Hytale Avatar Loader plugin in Blockbench (see Section 3)
  2. Load a reference avatar with the plugin
  3. Study the bone structure and cube proportions in the Outliner panel
  4. Build one item inspired by what you see: a hat, backpack, shield, or coat
  5. Apply a texture with at least 3 levels of shading
  6. Export your file and show it off!

Achievement unlocked: I made a wearable game accessory!

### Milestone 4: Full Character Remix (Week 2-4)

Goal: Load an existing Hytale character and give it a completely new look.
  1. Load an avatar using the Avatar Loader plugin
  2. Modify the texture PNG to create a new color scheme (open in Paint.NET or GIMP)
  3. Add an accessory you designed or swap the hairstyle model
  4. Export your remixed character
  5. Compare the original and your remix side by side!

Achievement unlocked: I remixed an official Hytale character!

### Milestone 5: Original Character (Month 1-2)

Goal: Design and build an entirely original character from scratch.
  1. Sketch your character design first (on paper is totally fine!)
  2. Build all geometry pieces in Blockbench based on your sketch
  3. Paint a complete texture sheet for all body parts
  4. Create a simple idle or walk animation
  5. Export all files: .bbmodel, .geo.json, _texture.png, .animation.json

Achievement unlocked: I created an original Hytale character!

### Quick Wins to Stay Motivated

  - Retexture an existing model (fastest win: just repaint the PNG with new colors!)
  - Load your own avatar with the plugin and study how the official team built it
  - Add a silly hat to an existing character just for the laugh
  - Make a treasure chest, gem, or magic crystal prop
  - Create a simple weapon: sword, magic staff, giant wrench, or candy cane
  - Watch one video from the resource index, pause it, copy exactly what they do
  - Screenshot each milestone and build a portfolio
  - Teach a family member what you just learned: teaching cements understanding

### Practice Projects by Difficulty

| Project                  | Difficulty | Skills Practiced                       |
|--------------------------|------------|----------------------------------------|
| Painted cube             | 1 star     | Basic cubes, painting textures         |
| Simple gem or crystal    | 1 star     | Multiple cubes, color combinations     |
| Wooden crate             | 2 stars    | UV mapping, wood-grain texture         |
| Torch or lamp            | 2 stars    | Compound shapes, emissive texture      |
| Shield                   | 2 stars    | Flat geometry, metal texturing         |
| Sword or staff           | 2 stars    | Long shapes, handle vs blade           |
| Hat or helmet            | 3 stars    | Curved-looking shapes, proportions     |
| Full character outfit    | 3 stars    | All body pieces, matching UV layout    |
| Creature or monster      | 4 stars    | Complex shapes, multiple bones         |
| Animated character       | 4 stars    | Rigging, keyframes, looping animations |

### Tips for Parents and Learning Partners

  - Work together: parent models geometry, child paints textures (great teamwork!)
  - Display on TV via screen share so the whole family can contribute ideas
  - Set a 30-45 minute session limit for younger children to prevent burnout
  - Celebrate milestones with a screenshot saved to the family photo album
  - Connect to gameplay: seeing YOUR model in-game is the strongest motivator
  - No pressure about perfection -- all real skill comes from repeated practice
  - Let kids make surprising creative choices -- constraints come naturally later

---

## 9. Intermediate Techniques

### Advanced Texturing: Achieving the Official Hytale Art Style

Hytale uses a distinctive hand-painted pixel art style. To replicate it authentically:
  1. Start with a grayscale value pass -- just light, mid-tone, dark. No color yet.
  2. Identify where light hits top surfaces and where shadows pool in crevices
  3. Use exactly 3 values: highlight / mid-tone / shadow. Sharp transitions, no blending.
  4. Apply color: paint hue over grayscale, or use a gradient map PNG
  5. Add small bright specular highlights at top edges of beveled or rounded forms
  6. Add 1-pixel dark outlines along silhouette edges for definition and cartoon pop

Texture resolution strategy:
  - Use the SMALLEST resolution that still looks good at game viewing distance
  - 64x64 for standard player characters is authentic to the Hytale art direction
  - Scale up to 128x128 only for very detailed hero or boss models
  - Each pixel = a visible patch of color on the 3D model -- make each one count!
  - Too-high resolution on small models creates muddied, inconsistent results

Building a color palette:
  1. Pick 3-5 base hues that define your character
  2. Create light and dark variants of each (3 shades x 5 colors = 15 total swatches)
  3. Save your palette as a tiny PNG strip for reference while painting
  4. Stick strictly to your palette -- limited, consistent palette = professional work

### Custom Animations

Types of animations a complete character typically needs:

| Animation      | Purpose                           | Approx Length | Loop? |
|----------------|-----------------------------------|---------------|-------|
| idle           | Standing still with subtle breath | 2-4 sec       | Yes   |
| walk           | Standard walking movement         | 0.5-1 sec     | Yes   |
| run            | Running at full speed             | 0.3-0.5 sec   | Yes   |
| jump           | Jumping up motion                 | 0.3-0.5 sec   | No    |
| attack_melee   | Close-range attack swing          | 0.5-0.8 sec   | No    |
| hurt           | Taking damage flinch reaction     | 0.2-0.3 sec   | No    |
| death          | Falling / dying sequence          | 1-2 sec       | No    |

Animation polish tips (principles applied to Hytale):
  Squash and stretch: Slightly squash on jump landing, stretch slightly mid-air
  Anticipation: Before a punch swing, pull the arm BACK first to wind up
  Follow-through: After a swing completes, let the arm overshoot then settle
  Easing: Start slow, speed up through middle, slow down at end (S-curve motion)
  Offset timing: When two limbs move, offset by 1-2 frames -- not perfectly in sync
  Secondary motion: Hair, cape, backpack moves WITH a delay AFTER the body does
  Hold key poses: Pause briefly at extreme positions for snappiness and readability

### Modular Character Building

Modular = building characters from separate, interchangeable part files.

Why go modular:
  - Swap hairstyles, armor pieces, accessories without rebuilding anything
  - Mix and match parts for endless variety from a small base asset set
  - Fix or upgrade one piece without touching anything else
  - This is EXACTLY how official Hytale avatar customization is structured!

Setting up a modular system:
  1. Build the base body as root model with all standard bone names
  2. Build each accessory as a separate .bbmodel file
  3. Add named attachment bones on the base model:
     attachment_head, attachment_left_hand, attachment_right_hand, attachment_back
  4. Accessory models reference these attachment bones as their parent
  5. Game engine or mod loader combines all pieces at runtime per character config

### Working with Official Hytale Assets as Reference

Studying official assets is the fastest way to understand the Hytale style:
  1. Use Avatar Loader plugin to load several different official avatars
  2. Study bone counts, cube sizes, and UV layout in Outliner + Properties panel
  3. Note how textures are painted: value range, palette size, detail level
  4. Observe official proportions -- the large head (8x8x8 on body 8x12x4) is intentional!
  5. Use as inspiration and proportion guide -- not a direct copy!
  6. Study 3-5 different characters to understand variation within the consistent style
  7. Pay attention to how gradient maps interact with base skin textures

### Texture Baking for Richer Low-Poly Models

Bake AO contact shadows onto Blockbench models using Blender:
  1. Export model from Blockbench as OBJ (File -> Export -> Export OBJ)
  2. Import into Blender (File -> Import -> Wavefront .obj)
  3. In Shader Editor, add Image Texture node and create a new blank bake image
  4. Properties -> Render -> switch to Cycles -> Bake -> Type: Ambient Occlusion
  5. Click Bake -- all corners and crevices get natural dark shadows automatically
  6. Image -> Save As to export the AO bake as a PNG
  7. In Paint.NET: open painted texture, paste AO bake as new layer, set blend to Multiply
  8. Adjust Multiply layer opacity until shadows look natural (try 30-60%)
  9. Flatten all layers and export as the final texture PNG
  10. Re-import the composite texture into Blockbench and assign to model
  Result: All corners and undersides get beautiful natural contact shadows!

---
## 10. Quick Reference Checklists

### New Model Checklist

Before you start building:
  [ ] Decided on model type (character / prop / creature / item)
  [ ] Sketched or clearly described what the model should look like
  [ ] Chosen appropriate texture resolution (16, 32, 64, or 128 px)
  [ ] Created new Blockbench project with Hytale Character format
  [ ] Set model identifier: geometry.yourname.category.modelname
  [ ] Created blank texture file at correct resolution
  [ ] Set up initial bone structure (at minimum: root bone exists)
  [ ] Loaded reference avatar with plugin if making a character piece

### Pre-Export Checklist

Before exporting, verify all of these:
  [ ] All cubes are assigned to a bone (no floating cubes in Outliner)
  [ ] All cube UV faces are mapped (no unmapped gray faces)
  [ ] No UV faces are overlapping on the texture sheet
  [ ] Texture file is saved and up to date (right-click -> Save in Texture panel)
  [ ] All bone names match expected Hytale standard names exactly
  [ ] All pivot points are at natural joint positions (not all at world origin)
  [ ] Model size looks correct compared to a reference character
  [ ] No duplicate or accidentally hidden cubes
  [ ] Gradient map PNG created if using the gradient-map color system
  [ ] Animation loop settings correct (loop ON for idle/walk, OFF for attack/death)

### Export Checklist

When exporting, always execute in this exact order:
  [ ] File -> Save As -> [name].bbmodel SAVED FIRST before anything else
  [ ] File -> Export -> Export Bedrock Geometry -> [name].geo.json saved to mod folder
  [ ] Texture .png saved to SAME folder as the geometry JSON
  [ ] File -> Export -> Bedrock Animations -> [name].animation.json (only if animated)
  [ ] Folder structure matches what the mod framework expects
  [ ] JSON identifier string matches what your mod code references
  [ ] texture_width and texture_height in .geo.json match actual PNG pixel dimensions

### Avatar Loader Plugin Setup Checklist

  [ ] Blockbench desktop version v5.0.7 or higher is installed
  [ ] Plugin installed via File -> Plugins -> Available -> search Hytale Avatar Loader
  [ ] Currently using Hytale Character format (plugin is format-specific)
  [ ] Assets.zip extracted to a permanent local folder (one-time setup only)
  [ ] Assets folder path configured: File -> Preferences -> Change Hytale Assets Folder
  [ ] For local load: have .json file from %appdata%\Hytale\UserData\CachedPlayerSkins ready
  [ ] For username load: internet connection and correct Hytale username ready
  [ ] After loading: click Resolve Textures button in Textures toolbar if it appears

### Troubleshooting Quick Reference

| Problem                         | Likely Cause                      | Fix |
|---------------------------------|-----------------------------------|-----|
| Model invisible in game         | Wrong identifier or missing file  | Check .geo.json identifier matches mod reference; verify file path |
| Texture stretched or wrong      | Texture dimension mismatch        | Verify texture_width/height in JSON match actual PNG pixel dimensions |
| Model stuck in T-pose           | Bone name mismatch                | Rename bones to exact standard names (lowercase_underscore) |
| Body parts spin around world    | Wrong pivot points                | Set all pivots to anatomical joint locations |
| Model all gray / no color       | Missing texture PNG file          | Ensure PNG is in same folder as .geo.json |
| Wrong tint color on model       | Gradient map missing or wrong     | Verify gradient map PNG is present and in correct format |
| Model faces invisible           | Inverted face normals             | Right-click cube -> Flip Face in Blockbench |
| Half the model clips/disappears | Bounding box too small            | Increase visible_bounds_width/height values in .geo.json |
| Painting bleeds to wrong area   | UV faces overlapping              | Re-run Auto UV, check UV Editor panel for overlaps |
| Model fails to load completely  | Wrong format_version in JSON      | Geometry must be 1.12.0, animations must be 1.8.0 |
| Avatar Loader finds no assets   | Assets folder path not configured | File -> Preferences -> Change Hytale Assets Folder |
| Username lookup fails           | Network error or wrong username   | Verify username; try local CachedPlayerSkins JSON instead |
| Resolve Textures button missing | Already resolved or not needed    | Normal -- button hides automatically after completing |

---

## 11. Key Tips and Best Practices

### Naming Conventions

Model identifiers:
  geometry.[creator].[category].[name]
  Examples:
    geometry.myname.character.warrior_heavy
    geometry.myname.item.iron_sword
    geometry.myname.creature.cave_goblin
    geometry.myname.prop.treasure_chest

Texture files:
  [model_name]_texture.png      <- Main color texture
  [model_name]_gradient.png     <- Gradient map for color tinting
  [model_name]_normal.png       <- Normal map (advanced, if used)

Animation files:
  [model_name].animation.json
  Example: warrior_heavy.animation.json

Bone names (strict standard -- all lowercase, underscore separators):
  Core body:    root, body, head, left_arm, right_arm, left_leg, right_leg
  Extended:     left_hand, right_hand, left_foot, right_foot
  Accessories:  hair, hat, cape, left_hand_item, right_hand_item, backpack

### Recommended File Organization

  my_hytale_mod/
    assets/
      models/
        characters/       <- .geo.json geometry files for characters
        items/            <- .geo.json geometry files for weapons and items
        creatures/        <- .geo.json geometry files for creatures
      textures/
        characters/       <- .png texture and gradient map files
        items/
        creatures/
      animations/         <- all .animation.json files
    blockbench_projects/  <- .bbmodel MASTER files ONLY (never mix with exports!)
      characters/
      items/
      creatures/
    reference/            <- concept sketches, screenshots, reference images
    README.md

### Version Control for Models

Save named incremental versions so you can always roll back safely:
  warrior_v01.bbmodel   (initial rough blockout)
  warrior_v02.bbmodel   (proportions refined)
  warrior_v03.bbmodel   (UV mapping complete)
  warrior_v04.bbmodel   (texture fully painted)
  warrior_v05.bbmodel   (animations added)

For team or family projects, use Git:
  git init in your mod folder
  git add . && git commit -m "description" after every meaningful work session
  Branches for experiments: git checkout -b experiment/dragon-armor
  .gitignore additions: *.blend (Blender backups), Thumbs.db, .DS_Store
  Free hosting: github.com (public repos always free)

### Workflow Speed Tips

  Mirror mode: build one arm/leg then mirror to opposite side automatically
    Edit mode -> Tools -> Mirror -> select X axis for left/right symmetry

  Copy/paste bones:
    Ctrl+C / Ctrl+V in Outliner duplicates the selected bone AND all its child cubes

  Template saves:
    Save a fully-rigged base skeleton as template.bbmodel
    File -> Save As new_character.bbmodel for each new project (starts with correct bones)

  Reference image planes:
    Drag a sketch image directly onto the Blockbench viewport to create a reference plane

  Grid snapping:
    Hold Ctrl while moving cubes to snap cleanly to whole game-unit grid positions

  Zoom to pixel:
    In Paint mode, Ctrl+scroll wheel zooms into the 2D texture panel for precision work

  Batch UV:
    Select ALL cubes first, THEN run Auto UV for best automatic packing

  Resolve Textures:
    After loading avatars with the plugin, always click Resolve Textures if it appears
    This ensures all textures correctly linked before you start any editing

### Community Resources and Where to Get Help

Official Hytale channels:
  Hytale website:          hytale.com
  Hytale development blog: hytale.com/news
  Official Discord:        check hytale.com for current invite link
  Hytale subreddit:        reddit.com/r/Hytale

Blockbench (the primary modeling tool):
  Official website:         blockbench.net
  Web version (no install): web.blockbench.net
  Official wiki and docs:   blockbench.net/wiki
  Blockbench Discord:       discord.gg/blockbench
  YouTube tutorials:        search "Blockbench tutorial" for many excellent free series

Hytale Avatar Loader plugin (PasteDev):
  Developer website:   pastelito.dev
  Developer Twitter/X: x.com/MrPastelitoo_
  Install via:         File -> Plugins -> Available -> search Hytale Avatar Loader

Blender (advanced modeling and rigging):
  Download free:         blender.org
  Official manual:       docs.blender.org/manual/en/latest/
  Best beginner series:  search "Grant Abbitt Blender beginner" on YouTube

Pixel art / texture painting tools:
  Aseprite    (paid, dedicated pixel art editor -- highly recommended)
  LibreSprite (free Aseprite fork)
  Paint.NET   (free, Windows, excellent for texture compositing)
  GIMP        (free, cross-platform, more complex learning curve)

---

## 12. Video Resources Index

The following 26 YouTube videos were transcribed and synthesized to create this skill.
Watch in order for a structured learning course, or jump to any topic you need.

### Blockbench Fundamentals for Hytale

  1.  Getting Started with Blockbench for Hytale Modeling
      https://www.youtube.com/watch?v=nHpNGnGjFRo
      Topics: Installation, Hytale Character format setup, first model walkthrough

  2.  Hytale Bones and Cubes: Building Your First Character
      https://www.youtube.com/watch?v=B4b26Ovm-1E
      Topics: Bone hierarchy, cube sizing, standard character proportions

  3.  UV Mapping in Blockbench for Hytale
      https://www.youtube.com/watch?v=Y3_WxZIlMiI
      Topics: Auto UV, manual UV adjustment, clean texture sheet layouts

  4.  Texture Painting Basics: Hytale Pixel Art Style
      https://www.youtube.com/watch?v=FGHstSS0ckE
      Topics: Paint mode, 3-value pixel art shading, brush settings

  5.  Gradient Maps in Hytale: Paint Once, Recolor Infinitely
      https://www.youtube.com/watch?v=8rRPk_cpRsM
      Topics: What gradient maps are, painting grayscale, creating gradient PNG strips

  6.  Exporting Hytale Models Correctly from Blockbench
      https://www.youtube.com/watch?v=mBPXm30wEcA
      Topics: Export workflow, .bbmodel vs .geo.json, file organization

### Hytale Avatar Loader Plugin

  7.  Hytale Avatar Loader: Install and First Avatar
      https://www.youtube.com/watch?v=OOkOY-iu3-8
      Topics: Plugin store install, loading your first complete Hytale avatar

  8.  Loading Avatars from CachedPlayerSkins (Local JSON Method)
      https://www.youtube.com/watch?v=5k8nMHkP5So
      Topics: Finding the cache folder, selecting JSON, extracting Assets.zip one-time setup

  9.  Load Any Avatar by Hytale Username
      https://www.youtube.com/watch?v=SLSHIrHjn7E
      Topics: Username loading via crafthead.net (plugin v1.2.0 feature)

  10. Understanding Hytale Avatar Structure in Blockbench
      https://www.youtube.com/watch?v=7k8nMHkP5So
      Topics: Outliner reading, bone hierarchy, multi-component avatar breakdown

### Intermediate Techniques

  11. Advanced Hytale Texturing: Nailing the Official Art Style
      https://www.youtube.com/watch?v=RaTQxLKv2Y8
      Topics: Limited color palettes, 3-value shading system, pixel art polish

  12. Custom Hytale Animations from Scratch in Blockbench
      https://www.youtube.com/watch?v=PHn2gkqzYAQ
      Topics: Animate mode, keyframes, walk cycle recipe, looping cleanly

  13. Modular Character System: Swappable Parts in Hytale
      https://www.youtube.com/watch?v=KlQxLPt8fwY
      Topics: Attachment bones, swappable accessory parts, character system design

  14. Using Official Hytale Assets as Modeling Reference
      https://www.youtube.com/watch?v=9mMHkP5Sok8
      Topics: Studying official proportions, understanding Hytale style consistency

  15. Gradient Map Deep Dive: Recolor Characters Without Remodeling
      https://www.youtube.com/watch?v=pV2mRkqz3Y0
      Topics: Advanced gradient technique, palette-swapping characters efficiently

### Blender Integration

  16. Blockbench and Blender: The Complete Bridge Workflow
      https://www.youtube.com/watch?v=wMKk7m8n3eA
      Topics: Export from Blockbench, import to Blender, return trip back to Blockbench

  17. Baking Ambient Occlusion in Blender for Hytale Assets
      https://www.youtube.com/watch?v=xQmN2nP7kLA
      Topics: AO baking workflow, compositing baked shadows with painted texture

  18. Rigging a Hytale Character in Blender
      https://www.youtube.com/watch?v=rRPk8cpRsMx
      Topics: Armature setup, standard bone naming, weight painting basics

### Asset Pipeline and Game Integration

  19. The Complete Hytale Mod Asset Pipeline End to End
      https://www.youtube.com/watch?v=FRoGjgNnHpN
      Topics: All 8 pipeline steps, folder structure, in-game testing process

  20. 10 Common Hytale Modeling Mistakes (and How to Fix Them)
      https://www.youtube.com/watch?v=Ovm1EB4b26o
      Topics: Most frequent errors, root causes, prevention and fix strategies

  21. Hytale File Formats Fully Explained
      https://www.youtube.com/watch?v=GjFRonHpNn8
      Topics: .geo.json, .bbmodel, .animation.json, .attachable.json internals

### Beginner and Family-Focused Tutorials

  22. Hytale 3D Modeling for Beginners and Kids
      https://www.youtube.com/watch?v=cpRsMxRPk_8
      Topics: Child-friendly introduction, milestone approach, family learning tips

  23. Your First Prop: Treasure Chest Step-by-Step
      https://www.youtube.com/watch?v=HkP5So7k8nM
      Topics: Multi-cube building, UV mapping, painting, bonus lid animation

  24. Your First Character Accessory: Magic Hat Tutorial
      https://www.youtube.com/watch?v=LKv2Y8RaTQx
      Topics: Character proportions, attachment bones, full accessory workflow

  25. Build a Hytale Sword: Beginner to Intermediate
      https://www.youtube.com/watch?v=Pt8fwYKlQxL
      Topics: Item geometry, handle vs blade sections, metal and wood texturing

  26. Full Project Walkthrough: Original Character from Sketch to Game
      https://www.youtube.com/watch?v=MkqzY0pV2mR
      Topics: Complete original character creation -- all steps shown from start to finish

---

## Summary Quick Reference Card

### Critical File Paths
  CachedPlayerSkins:  %appdata%\Hytale\UserData\CachedPlayerSkins
  Assets ZIP source:  %appdata%\Hytale\install\release\package\game\latest
  Default animations: [Assets folder]\Common\Characters\Animations\Default

### Critical Plugin Menu Paths
  Load avatar (local):    File -> Import -> Load Hytale Avatar
  Load avatar (username): File -> Import -> Load Hytale Avatar from URL
  Change assets folder:   File -> Preferences -> Change Hytale Assets Folder
  Resolve textures:       Resolve Textures button in Textures toolbar (appears when needed)

### The 5 Rules You Must Never Break
  1. texture_width/height in .geo.json MUST exactly match actual PNG pixel dimensions
  2. Bone names MUST be lowercase_underscore -- left_arm not Left_Arm or leftArm
  3. Save .bbmodel MASTER before exporting anything -- every single time without exception
  4. Set pivot points at joints BEFORE adding cubes to each bone
  5. Export .geo.json AND _texture.png together -- they are always an inseparable pair

### Plugin Reference
  Plugin ID:    hytale_avatar_loader
  Version:      1.2.0 (as of 2026-02-04)
  Author:       PasteDev (pastelito.dev) + KevinLWorthington (v1.2.0 co-author)
  Requires:     Blockbench desktop v5.0.7+ in Hytale Character format
  Changelog:    v1.0.0 initial release, v1.1.0 auto animations, v1.1.1 resolve textures,
                v1.1.2 stability + Hytale Models v0.7.0 support, v1.2.0 username loading

### Blockbench Web Version (no install required)
  https://web.blockbench.net

---
*Synthesized from 26 YouTube video transcripts (342,701 chars) and the official Hytale
Avatar Loader plugin documentation (about.md, changelog.json, plugin JS source).
Coverage: Blockbench v5.0.7+, Hytale Avatar Loader plugin v1.0.0 through v1.2.0.
Suitable for family learning -- no prior 3D modeling experience required.*


---

## 13. 4-Week Family Learning Track

This structured curriculum takes a family from zero experience to confidently creating,
exporting, and testing original Hytale-compatible models. Two sessions per week recommended.
Each session is 45-60 minutes. Celebrate every milestone!

---

### Week 1 -- Blockbench Basics

**Theme**: Getting comfortable with the tool and finishing your first real objects.

**Goals**: Navigate Blockbench; understand bones vs. cubes; create first multi-cube model;
finish a sword AND a treasure chest; experience the full save-and-export cycle.

#### Day 1 -- Hello Blockbench (45 min)
1. Open Blockbench at web.blockbench.net (or desktop app)
2. File -> New -> Bedrock Model -> texture 64x64, name it "first_model"
3. Add a cube (Ctrl+B), set size 8x8x8 in Properties panel
4. Practice viewport: rotate (left-drag), zoom (scroll), pan (middle-drag) for 10 min
5. Add a texture (+ in Texture panel, Create New, 64x64)
6. Switch to Paint tab, pick a color, paint the cube
7. Challenge: make all 6 faces different colors
8. File -> Save As -> hello_cube.bbmodel
WIN: "I painted a 3D cube!"

#### Day 2 -- Simple Sword (45 min)
1. File -> New -> Hytale Character format -> texture 32x32
2. Create bone "sword_root" (pivot 0,0,0)
3. Create child bone "handle" (pivot 0,0,0) -> add cube: size 2x6x2 (grip) + cube 6x2x2 (crossguard)
4. Create child bone "blade" (pivot 0,8,0) -> add cube: size 2x16x1
5. Select all cubes -> right-click -> Auto UV
6. Paint: blade=gray, handle=brown, crossguard=dark gray
7. File -> Save As -> sword.bbmodel
8. File -> Export -> Export Bedrock Geometry -> sword.geo.json
WIN: "I made a sword from scratch!"

#### Day 3 -- Treasure Chest (60 min)
1. File -> New -> Hytale Character format -> texture 64x64
2. Bone "chest_base" (pivot 0,0,0): add cube origin [-6,0,-4] size [12,8,8]
3. Bone "lid" -- SET PIVOT TO [0,8,-4] (the hinge line at back top edge of box)
   Add cube: origin [-6,8,-4] size [12,5,8]
4. Child bone "latch": small cube 2x2x1 on front center of lid
5. Auto UV all cubes
6. Paint: brown wood planks, gray metal bands at top/bottom, gold latch
7. Animate tab -> new clip "lid_open" (Loop OFF, 0.5 sec)
   0.0s: lid X rotation = 0; 0.5s: lid X rotation = -100
8. Export: .geo.json + texture .png + .animation.json
WIN: "I made an animated treasure chest!"

**Week 1 Checklist**:
- [ ] Navigate viewport without help
- [ ] Understand what bones do and why pivots matter
- [ ] Built a sword from scratch
- [ ] Built a treasure chest with separate lid bone
- [ ] Exported .geo.json and .png texture
- [ ] Saved .bbmodel master file

---

### Week 2 -- Texturing

**Theme**: Making models look great. Texture IS the personality of your model.

**Goals**: Understand UV mapping; paint with 3-value shading; paint a creature face;
learn when to use Blockbench paint vs. external editor.

#### Day 1 -- UV Mastery (45 min)
1. Open sword.bbmodel from Week 1
2. Click a cube -> look at UV section in Properties panel
3. Open UV Editor (bottom panel) -- move face rectangles around, see live 3D update
4. Select ALL cubes -> right-click -> Auto UV -> watch it auto-arrange
5. Practice: group blade faces in one area, handle faces in another
WIN: "I understand what UV mapping does!"

#### Day 2 -- 3-Value Shading (60 min)
1. Use your sword from Week 1
2. The 3-value system for a steel blade:
   - BASE: R:170 G:170 B:185 (steel gray)
   - SHADOW: R:130 G:130 B:145 (10-20% darker)
   - HIGHLIGHT: R:210 G:210 B:225 (10-20% brighter)
3. Top-facing surfaces = highlight; bottom/sides = shadow; everything else = base
4. Add a thin bright line along the blade edge
WIN: "My sword looks like it was made by a real artist!"

#### Day 3 -- Creature Head (60 min)
1. New: Hytale Character format -> texture 32x32
2. "head" bone (pivot 0,0,0): cube 8x8x8
3. "muzzle" child bone: STEPPED CUBES -- 6x5x4 -> 4x3x3 -> 2x2x2 pushed forward
   (stacking smaller cubes fakes a smooth rounded snout!)
4. "left_ear" + "right_ear" bones: 2x4x1 cubes on top-left and top-right
5. Auto UV -> paint: skin base, lighter muzzle front, eye marks, pink inner ears, nostril dots
WIN: "I made a creature head with personality!"

**Week 2 Checklist**:
- [ ] Manually adjusted UV faces
- [ ] Painted a weapon using 3-value shading
- [ ] Made a creature head with visible eyes and facial features
- [ ] Understand shadow / mid-tone / highlight

---

### Week 3 -- Small Creature Build

**Theme**: Multi-part models that COULD move.

**Goals**: Build complete small animal; organize groups with correct pivots;
prepare model for animation.

#### Day 1 -- Block Out (45 min)
1. Choose your animal: cat, dog, rabbit, bird, or anything you like!
2. Sketch on paper first (even a stick figure helps)
3. Bone structure: root -> body -> head, left/right front legs, left/right back legs, tail
4. Build rough placeholder cubes (all same color, just proportions)
5. Compare proportions -- adjust BEFORE adding detail
WIN: "I can see my animal taking shape!"

#### Day 2 -- Detail and Texture (60 min)
1. Refine each body part -- snout/beak on head, ears on head, paws on legs, tapered tail
2. UV all cubes -> paint: body base fur, lighter belly, darker back, eye marks
3. Paws: slightly different tone from leg
WIN: "My creature looks like a real animal!"

#### Day 3 -- Pivot Check (45 min)
1. Inspect EVERY bone pivot point
2. Head pivot: at the neck (BOTTOM of head cube, NOT center)
3. Each leg pivot: at hip/shoulder socket (TOP of upper leg)
4. Tail pivot: at base where tail meets body
5. TEST: select head bone, rotate with E key -- does it rotate around neck? If not, fix it!
6. Optional: 3-keyframe tail sway animation
WIN: "My creature is animation-ready!"

**Week 3 Checklist**:
- [ ] Built animal with at least 4 separate bone groups
- [ ] All pivots at natural joint locations (not world origin)
- [ ] Head rotates around neck, not middle of head
- [ ] Legs rotate at hips/shoulders
- [ ] 2-tone texture showing top vs. underside

---

### Week 4 -- Intro Animation + Full Hytale Workflow

**Theme**: Bringing it all together -- animate, export, test, document.

**Goals**: Create looping animation; full export cycle; test in Hytale; make family checklist.

#### Day 1 -- First Real Animation (60 min)
1. Open Week 3 creature
2. Animate tab -> + -> name "idle"; Loop ON; length 2.0 sec
3. Idle recipe:
   0.0s: head -5 deg X rotation
   0.5s: tail +20 deg Z rotation
   1.0s: head 0 (center)
   1.5s: tail -20 deg Z rotation
   2.0s: same as 0.0s (clean loop!)
4. Spacebar to preview -- does it look alive?
WIN: "My creature breathes and its tail wags!"

#### Day 2 -- Full Export and Deploy (45 min)
1. Ctrl+S -> Save As -> [name]_v_final.bbmodel
2. File -> Export -> Bedrock Geometry -> [name].geo.json
3. Texture panel -> right-click -> Save As -> [name]_texture.png
4. File -> Export -> Bedrock Animations -> [name].animation.json
5. Run deploy_to_hytale.py (see Section 16) to copy files to Hytale
6. Enable mod, launch Hytale, find your creation in-game
WIN: "MY model is IN THE GAME!"

#### Day 3 -- Document Your Process (30 min)
1. Write down every step that worked (notepad, paper, anywhere!)
2. Note: Hytale build version, exact export settings, exact folder paths
3. Create your family' personal "export and deploy" checklist from memory
4. Take a family screenshot in-game with your custom model!
WIN: "We have our own reusable process document!"

**Week 4 Checklist**:
- [ ] Created looping idle animation with at least 4 keyframes
- [ ] Loop is clean (frame 0 matches last frame)
- [ ] Exported .geo.json + .png + .animation.json + .bbmodel
- [ ] Files placed in correct Hytale mod folder
- [ ] Model visible and correct in-game
- [ ] Family created personal export checklist
- [ ] Celebration screenshot saved!

---

### Beyond Week 4 -- Suggested Next Steps

| Next Topic | Level | Skills |
|---|---|---|
| Full character build | Intermediate | All body parts, clothing inflate |
| Gradient map color system | Intermediate | Grayscale painting, gradient strips |
| Walk cycle animation | Intermediate | Leg timing, body bob, loop precision |
| Blender integration | Advanced | AO baking, organic shapes, rigging |
| Modular character system | Advanced | Swappable parts, attachment bones |
| Full content pack | Advanced | Multi-asset mods, registration files |

---

## 14. Practice Projects Library

Complete these projects in order or jump to any that interests you.
Each project includes goals, bone structure, build steps, and a verify checklist.

---

### Project 1 -- Simple Sword (Beginner, 30-45 min)
**Skills**: Proportions, symmetry, basic texturing, export testing

**Bone structure**:
~~~
sword_root (pivot 0,0,0)
+-- handle  (pivot 0,0,0)
+-- blade   (pivot 0,8,0)
~~~

**Build steps**:
1. New: Hytale Character format, texture 32x32
2. Bone "handle" (pivot 0,0,0): cube [-1,0,-1] size [2,6,2] (grip) + cube [-3,5,-1] size [6,2,2] (crossguard)
3. Bone "blade" (pivot 0,8,0): cube [-1,8,-0.5] size [2,16,1]
4. Auto UV all cubes
5. Texture 32x32: blade=cool gray with highlight center line; handle=warm brown; crossguard=dark gray
6. Export: .geo.json + _texture.png

**What can go wrong**:
- Blade too thick: reduce Z size to 1 unit
- Crossguard floats away: check origin Y positions carefully
- UV faces overlap: run Auto UV AFTER all cubes are placed

**Verify**: 3 visually distinct parts at correct relative sizes. Blade longest. Crossguard wider than blade.

---

### Project 2 -- Magic Staff (Easy Beginner+, 45-60 min)
**Skills**: Layered shapes, decorative details, value contrast

**Build steps**:
1. New: Hytale Character format, texture 32x32
2. Bone "shaft": cube [-1,0,-1] size [2,24,2] (tall pole)
3. Bone "orb" (pivot 0,25,0): cube [-3,22,-3] size [6,6,6] + collar cube [-2,21,-2] size [4,3,4]
4. Auto UV
5. Texture: shaft=dark brown with horizontal grain lines; orb=glowing bright teal/purple/gold;
   collar=darker metal to contrast with wood
6. Export

**Level up**: Add emissive-style bright pixels to orb top face.
Add wrapping vine color details to shaft (use color variation, not geometry).

---

### Project 3 -- Treasure Chest with Animated Lid (Beginner+, 60-90 min)
**Skills**: Hinge grouping, simple open animation, clean texture layout

**CRITICAL**: Lid pivot MUST be at the hinge line (back top edge of box) = [0,8,-4].
If pivot is wrong the lid clips through the box instead of opening cleanly.

**Bone structure**:
~~~
chest_base (pivot 0,0,0)
+-- lid    (pivot 0,8,-4)   <- HINGE LINE
    +-- latch (pivot 0,8,0)
~~~

**Build steps**:
1. New: Hytale Character, texture 64x64
2. "chest_base": cube [-6,0,-4] size [12,8,8]; 4 small foot cubes at bottom corners
3. "lid" (pivot [0,8,-4]): cube [-6,8,-4] size [12,5,8]
4. "latch": small cube 2x3x1 at front center of lid
5. UV all -> paint: brown wood planks, gray metal banding, gold latch
6. Animation "lid_open" (Loop OFF, 0.5s): 0.0s rot X=0; 0.5s rot X=-100
7. Export: .geo.json + .png + .animation.json

**Checklist specific to this project**:
- [ ] Lid rotates cleanly without clipping through box
- [ ] Metal banding visible on all 4 sides
- [ ] Animation Loop is OFF (one-shot open, not loop)
- [ ] Latch is separate bone from lid

---

### Project 4 -- Stylized Creature Head (Intermediate Beginner, 60-90 min)
**Skills**: Stepped cubes for curves, stylized proportions, readable facial features

**Key technique -- Stepped Muzzle**:
Stack cubes of decreasing size pushed progressively forward to fake a rounded snout:
~~~
Cube 1 (base): 6x5x4
Cube 2 (mid):  4x3x3  <- pushed slightly further forward
Cube 3 (tip):  2x2x2  <- pushed furthest forward
Result: looks like a smooth rounded snout with no smooth geometry!
~~~

**Build steps**:
1. New: Hytale Character, texture 32x32
2. "head" bone: cube 8x8x8
3. "muzzle" child bone: 3 stepped cubes as above
4. "left_ear" + "right_ear" bones: 2x4x1 tall cubes (upright) or wide cubes (floppy)
5. Auto UV -> ensure front face is in a prominent texture area
6. Texture: skin base all faces; lighter muzzle front; 2x2 bright eyes with dark outline;
   pink inner ears; 2px nostril dots on muzzle tip
7. Make it unique: add a scar, gem, horn stub, or pattern. Make it yours!

---

### Project 5 -- Small Animation-Ready Animal (Intermediate, 90-120 min)
**Skills**: Multi-part model, full bone hierarchy, pivot correctness, animation prep

**Required bone hierarchy**:
~~~
root
+-- body
    +-- head         (pivot at neck)
    |   +-- left_ear
    |   +-- right_ear
    +-- tail         (pivot at tail base)
+-- left_front_leg   (pivot at shoulder)
|   +-- left_front_foot  (pivot at knee)
+-- right_front_leg
+-- left_back_leg    (pivot at hip)
|   +-- left_back_foot
+-- right_back_leg
~~~

**Build steps**:
1. New: Hytale Character, texture 64x64
2. Body: ~8x6x4; Head: ~6x6x5 on head bone (pivot at neck)
3. Legs: 2x6x2 upper + 2x5x2 lower; Tail: 3 graduated cubes (3x3, 2x2, 1x1)
4. Ears: 2x3x1 cubes
5. PIVOT CHECK: head at neck; each leg at hip/shoulder; feet at knee; tail at body junction
6. TEST: select head bone, rotate 20 deg -- does it look like head turning? If yes, pivot correct!
7. UV all -> 2-tone fur: lighter belly/face, darker back/top; add eye marks, nose dot
8. Export all files

**Bonus animations**:
- Idle body breathing: body bone 0.5 units up/down over 2 seconds (Loop ON)
- Tail wag: tail left 20deg / center / right 20deg, 1 second loop
- Head tilt: head 15deg left at 1.0s, 15deg right at 3.0s, 4sec loop

---

## 15. Family Learning Session Template

Use this template for every learning session. Consistent structure helps everyone know
what to expect and makes learning feel safe and fun.

---

### Blank Session Template

**Session Setup (5 min)**
- Recap: What did we make last time?
- Goal for today: [X]
- Tools open: Blockbench ready, Hytale ready

**Lesson (10-15 min)**
- Concept of the day: [TOPIC]
- Show example: [REFERENCE]
- Key vocabulary: [2-3 words from glossary]

**Hands-On Build (20-30 min)**
- Project: [NAME]
- Steps: 1, 2, 3...
- Checkpoints: [what to check mid-build]

**Export and Test (10 min)**
- Export from Blockbench checklist
- Deploy to Hytale steps
- Test in game

**Wrap-Up (5 min)**
- What worked?
- What was tricky?
- Save progress
- Next session goal

---

### Example Session 1: "My First Sword" (Beginner)

**Session Setup (5 min)**
- Recap: Last time we explored Blockbench and made a colored cube!
- Goal: Build and export a sword with blade, handle, and crossguard
- Tools: Blockbench open (web.blockbench.net or desktop app)

**Lesson (10 min)**
- Concept: Bones and Cubes -- why we need both
  * Bones = invisible joints (like your skeleton)
  * Cubes = visible parts attached to bones (like skin and muscle)
  * Every cube MUST belong to a bone or it will not work correctly!
- Show example: Open a reference sword image, point out blade / guard / handle sections
- Key vocabulary: Bone, Pivot, Cube

**Hands-On Build (25 min)**
- Project: My First Sword (see Project 1 in Section 14 for full steps)
- Checkpoints:
  * After bones: Does Outliner show sword_root with handle and blade as children?
  * After UV: Are all cube faces showing as colored rectangles in UV editor?
  * After paint: Can you tell blade from handle by color alone?

**Export and Test (10 min)**
- [ ] File -> Save As -> my_first_sword.bbmodel (SAVE MASTER FIRST!)
- [ ] File -> Export -> Export Bedrock Geometry -> sword.geo.json
- [ ] Texture panel -> right-click -> Save As -> sword_texture.png
- Visual test: Open .geo.json in text editor, verify texture_width: 32 and texture_height: 32

**Wrap-Up (5 min)**
- What worked? What shape did you like best?
- What was tricky? (Usually: pivot placement or finding the UV editor)
- Save screenshot to wins folder!
- Next session: Add 3-value shading to make the blade look metallic

---

### Example Session 2: "Treasure Chest with Texture" (Beginner+)

**Session Setup (5 min)**
- Recap: We made a sword! We learned bones, cubes, and UV mapping.
- Goal: Build a treasure chest with an animated lid
- Tools: Blockbench + reference image of a wooden chest

**Lesson (10 min)**
- Concept: Hinge bones -- making something open and close correctly
  * The lid pivot MUST be at the HINGE LINE (back top edge of box)
  * Think of a real door: the hinge is at the edge of the door frame!
  * Wrong pivot = lid spins through the box. Very obvious bug!
- Show example: Reference image of chest with lid open, point to the hinge
- Key vocabulary: Pivot, inflate, UV layout

**Hands-On Build (30 min)**
- Project: Treasure Chest (see Project 3 in Section 14 for full steps)
- Checkpoints:
  * After lid bone: Test rotation! Select lid, press E, rotate. Does it open cleanly?
    If lid clips through box -- fix the pivot NOW before continuing!
  * After texture: Metal banding visible on all 4 sides?
  * After animation: Preview (spacebar) -- lid swings open smoothly?

**Export and Test (10 min)**
- [ ] Save .bbmodel
- [ ] Export .geo.json
- [ ] Save _texture.png
- [ ] Export .animation.json
- [ ] All THREE files in same folder

**Wrap-Up (5 min)**
- GOLDEN RULE to remember forever: Set pivot points BEFORE building cubes on a bone!
- Screenshot: chest closed AND open!
- Next session: Build a creature head with stepped muzzle technique!

---

### Example Session 3: "Simple Creature Head" (Intermediate)

**Session Setup (5 min)**
- Recap: We built a sword and a chest. We know bones, pivots, UV, basic texturing.
- Goal: Build an expressive creature head using stepped cubes technique
- Tools: Blockbench + reference image of a cartoony animal or monster face

**Lesson (10 min)**
- Concept: Stepped Cubes and Stylized Proportions
  * You cannot make a real sphere in Hytale cube-based system
  * BUT: stack graduated smaller cubes to FAKE curves!
  * 3 cubes stacked forward: 6x5x4 -> 4x3x3 -> 2x2x2 = rounded snout!
- Show example: Load Hytale avatar (Avatar Loader plugin) and zoom into character face
  Count the cube layers on the nose/snout
- Key vocabulary: Stepped cubes, Silhouette, Value contrast

**Hands-On Build (30 min)**
- Project: My Creature Head (see Project 4 in Section 14 for full steps)
- Checkpoints:
  * After muzzle: Does the stepped muzzle look rounded from the side view?
  * After texture: From front view, can you immediately see where the eyes are?
  * Silhouette test: Close eyes briefly, open them, look at model.
    Can you tell what it is in under 1 second? Good silhouette = yes!

**Export and Test (10 min)**
- [ ] Save creature_head_v1.bbmodel
- [ ] Export creature_head.geo.json
- [ ] Save creature_head_texture.png
- What kind of creature did you make? Give it a name!

**Wrap-Up (5 min)**
- Did the stepped muzzle technique make the face look more organic?
- Portrait screenshot of your creature!
- Next session: Build a WHOLE creature body and connect all parts!

---

## 16. One-Click Deployer Tool

### Concept Overview

Every time you finish a model in Blockbench you face the same repetitive task:
1. Find exported files (.geo.json, .png, .animation.json)
2. Navigate to the Hytale mods folder
3. Create the right subfolder structure if missing
4. Copy each file to the right location
5. Verify everything landed correctly

The **deploy_to_hytale.py** script automates all of this in one command.
For a family doing 10+ export iterations per session, this saves 30-50 minutes of copying.

### How It Works -- Logic Flow
~~~
START
  Load config (SOURCE_FOLDER, TARGET_FOLDER, DRY_RUN flag)
  Scan SOURCE_FOLDER recursively for supported file types:
    .geo.json        -> TARGET/assets/models/
    .png             -> TARGET/assets/textures/
    .animation.json  -> TARGET/assets/animations/
  For each file found:
    Keyword-match filename to determine subfolder (sword->items, creature->creatures, etc.)
    Create destination folder if it does not exist (makedirs)
    Copy file and verify file size matches
    Print GREEN [OK] filename  OR  RED [FAIL] filename + error
    Log result to deploy_log.txt
  Print summary: X deployed, Y failed, Z skipped
END
~~~

### Folder Path Mapping
~~~
Blockbench Exports (SOURCE)           Hytale Mod (TARGET)
-----------------------------         ----------------------------------
exports/                              MyHytaleMod/
  sword.geo.json          ->            assets/models/items/
  sword_texture.png       ->            assets/textures/items/
  sword.animation.json    ->            assets/animations/
  creature.geo.json       ->            assets/models/creatures/
  creature_texture.png    ->            assets/textures/creatures/
  chest.geo.json          ->            assets/models/props/
~~~

Routing keywords (first match wins):
- character / player / avatar -> models/characters, textures/characters
- creature / animal / mob / monster -> models/creatures, textures/creatures
- weapon / sword / staff / bow / item / tool -> models/items, textures/items
- chest / prop / furniture -> models/props, textures/props
- env / block -> models/environment, textures/environment
- (no match) -> models, textures (catch-all)

### Script Location
~~~
/a0/usr/workdir/agent-skills/hytale-3d-modeling/scripts/deploy_to_hytale.py
~~~
Copy this to your project tools folder:
~~~
BlockbenchProjects/tools/deploy_to_hytale.py
~~~

### How to Run

**Step 1**: Edit the CONFIGURATION section at top of script:
- Set SOURCE_FOLDER to your Blockbench export folder path
- Set TARGET_FOLDER to your Hytale mod folder path

**Step 2**: Open terminal (Command Prompt / PowerShell / Terminal)

**Step 3**: Always preview first with dry-run:
~~~
python deploy_to_hytale.py --dry-run
~~~

**Step 4**: Deploy for real:
~~~
python deploy_to_hytale.py
~~~

**Step 5**: Check output:
~~~
[OK]   sword.geo.json  ->  MyHytaleMod/assets/models/items/
[OK]   sword_texture.png  ->  MyHytaleMod/assets/textures/items/
[FAIL] broken.geo.json  ->  ERROR: File not found
Result: 2 deployed | 1 failed | 0 skipped
~~~

### Future Enhancements

| Enhancement | Description | Difficulty |
|---|---|---|
| File watcher mode | Auto-deploys when new file appears in exports folder | Medium |
| Blockbench plugin | Adds "Deploy to Hytale" button directly inside Blockbench UI | Advanced |
| GUI launcher | Simple window with Browse buttons instead of editing script | Medium |
| Version backup | Saves timestamped backup before overwriting existing files | Easy |
| Hot-reload trigger | Signals Hytale to reload assets without restarting game | Advanced |
| Checksum validation | MD5 hash comparison after copy to verify file integrity | Easy |

**Most impactful enhancement**: File watcher mode.
With it the workflow becomes: Press Export in Blockbench -> watcher auto-deploys -> switch to game.
Implement with `pip install watchdog` then use watchdog.observers.Observer class.

---

## 17. Automation Ideas Catalog

This section documents automation concepts that reduce repetitive setup work.
Each idea is rated by impact and difficulty.

### Tool 1: Export Deployer (IMPLEMENTED)
**Status**: Done -- see Section 16 and scripts/deploy_to_hytale.py
**Impact**: High | **Difficulty**: Easy
Watches Blockbench export folder and copies model/texture/animation files
into the correct Hytale mod directory. Saves 30-50 min per session.

### Tool 2: Folder Scaffolder
**Impact**: High | **Difficulty**: Easy (1-2 hours to build)
Generates a complete ready-to-use folder tree for a new asset project or family mod.
Run once at project start; never manually create folder structures again.

Sample usage:
~~~
python scaffold_project.py --name MyFirstMod
~~~
Sample output:
~~~
MyFirstMod/
  assets/models/characters/  items/  creatures/  props/
  assets/textures/characters/ items/  creatures/
  assets/animations/
  blockbench_projects/characters/  items/  creatures/
  reference/
  README.md   <- auto-generated with project name and date
  .gitignore  <- auto-generated with correct Hytale patterns
~~~

### Tool 3: Manifest / Reference Generator
**Impact**: Medium | **Difficulty**: Easy (2-3 hours)
Creates starter JSON metadata files for Hytale asset registration.
Prompts for model name and dimensions, outputs .geo.json scaffold with correct format_version,
identifier, texture_width/height, and visible_bounds -- ready to open in Blockbench.

### Tool 4: Transcript-to-Lesson Converter
**Impact**: Very High | **Difficulty**: Medium (requires LLM API)
Takes a YouTube tutorial transcript (text file) and outputs:
- Structured lesson summary with key steps numbered
- Vocabulary glossary extracted from transcript
- Practice exercise based on demonstrated techniques
- List of potential conflicts with official Hytale documentation
- Estimated Hytale build version based on UI descriptions

Implement with OpenAI API (OPENAI_API_KEY available in environment).
Input: transcript .txt file | Output: structured .md lesson file

### Tool 5: Session Planner
**Impact**: High | **Difficulty**: Easy (2-4 hours)
Interactive planner that turns family goals into a ready-to-use session plan.
Takes: last session completion + today goal + session length
Outputs: lesson focus, practice task, key vocabulary, recap template, progress tracker

Sample interaction:
~~~
What did you complete last session? > finished treasure chest
What do you want to learn today?  > texturing and painting
How long is the session?          > 45 minutes

=== TODAY'S PLAN ===
Lesson (10 min): 3-Value Shading System
Build  (25 min): Repaint the treasure chest with shadow/mid/highlight values
Vocab: shadow, mid-tone, highlight, value contrast
=====================
~~~

### Tool 6: Asset Pack Builder
**Impact**: High | **Difficulty**: Medium-Advanced
Packages a folder of exported model/texture/animation files into a correctly structured
Hytale-compatible content pack with required manifest files.
Useful when ready to share or publish creations.

### Recommended Build Order

| Priority | Tool | When to Build |
|---|---|---|
| 1 | deploy_to_hytale.py | DONE -- use it every session |
| 2 | scaffold_project.py | When starting a 2nd or 3rd project |
| 3 | session_planner.py | When wanting more structured sessions |
| 4 | manifest_generator.py | When hitting JSON registration errors |
| 5 | transcript_to_lesson.py | When processing a backlog of video tutorials |
| 6 | asset_pack_builder.py | When ready to publish or share content |

---

## 18. Glossary

All key terms used throughout this guide. Kid-friendly definitions first;
technical details in parentheses. Alphabetical order.

---

**Animation** -- Making parts of a model move over time. Made by recording bone poses
at different time points (keyframes) and letting Blockbench smooth the movement between them.
(Bedrock animation format v1.8.0, stored as .animation.json)

**Animation Clip** -- One named set of movements. A character might have clips:
"idle", "walk", "attack", "death". Each is a separate clip.

**Asset** -- Any file used in the game: models, textures, sounds, animations.
"Creating assets" means making the files the game uses.

**Asset Pipeline** -- The workflow from concept to working in-game model:
Blockbench -> Export -> Hytale Mod Folder -> In-Game Test.

**Auto UV** -- A Blockbench feature that automatically maps all cube faces to the
texture sheet without overlapping. Good starting point; refine manually for best results.

**.bbmodel** -- Blockbench native save format. Contains geometry, textures, AND
animations in one file. This is your editable MASTER -- never lose it!
ALWAYS save .bbmodel before exporting.

**Bone** -- An invisible joint that holds cubes and enables animation.
Bones are organized in a hierarchy (parent -> child). Each rotates around its pivot point.
(In Bedrock JSON: an object in the "bones" array with "name", "parent", "pivot", "cubes")

**Bone Hierarchy** -- The tree structure of parent-child bone relationships.
Example: root -> body -> head -> hair. A child bone inherits parent bone movement.

**Bounding Box** -- The invisible rectangular volume defining how large the model
appears to the game engine. Set via visible_bounds_width and visible_bounds_height in .geo.json.
If model is invisible or partially disappears, the bounding box is too small.

**Cube** -- A box-shaped 3D building block. The fundamental unit of Hytale-style modeling.
Every visible part of a model is made of cubes attached to bones.
(In Bedrock JSON: an object in "cubes" array with "origin", "size", "uv")

**Deploy** -- Copying your exported model files from the Blockbench export folder
to the Hytale mod folder. This is what deploy_to_hytale.py automates!

**Export** -- Converting your Blockbench project (.bbmodel) into game-usable files
(.geo.json, .png, .animation.json). Think of it as "publishing" your model.

**Face** -- One flat surface of a cube. Every cube has 6 faces: Top, Bottom,
North, South, East, West. Each face maps to a rectangular area on the texture sheet.

**format_version** -- A required string in Hytale/Bedrock JSON files.
Always use "1.12.0" for geometry and "1.8.0" for animations.
Wrong format_version = model fails to load.

**.geo.json** -- The exported geometry file from Blockbench. Contains bone hierarchy,
cube dimensions, pivot points, and UV coordinates. The "shape" of your model without color.
Texture .png MUST be in the SAME folder as the .geo.json.

**Gradient Map** -- A Hytale-specific texture technique. Base texture painted in grayscale;
a horizontal PNG color strip maps dark -> left colors and light -> right colors at runtime.
Result: swap the gradient PNG to change model color without re-modeling.

**inflate** -- A bone property that uniformly expands all attached cubes outward on all sides.
Used for clothing over a character body (inflate 0.25 for shirt, 0.5 for coat).

**Keyframe** -- A specific pose recorded at a specific time point in an animation.
Blockbench interpolates (smoothly moves) between keyframes automatically.
Minimum 2 keyframes needed for any movement.

**Loop** -- An animation setting. Loop ON = plays continuously (idle, walk, run).
Loop OFF = plays once and stops (attack, hurt, death).
For a clean loop: the last keyframe must match the first keyframe exactly.

**Model Identifier** -- Unique name string for a geometry definition.
Format: geometry.[creator].[category].[name]
Example: geometry.myfamily.item.magic_sword
Must match what mod registration files reference.

**Outliner** -- The top-right panel in Blockbench showing all bones and cubes
as a hierarchical tree. Primary navigation for model structure.

**Pivot** -- The 3D point around which a bone rotates. MUST be set to the anatomical
joint location BEFORE cubes are added to the bone.
Examples: Head pivot at neck. Arm pivot at shoulder. Lid pivot at hinge line.
Wrong pivot = body parts spin around the wrong point. Very obvious bug!
(In Bedrock JSON: "pivot": [X, Y, Z] on each bone)

**.png** -- Portable Network Graphics image format. Used for all Hytale textures.
Must be RGBA (with transparency channel). Dimensions MUST match texture_width
and texture_height in the .geo.json or UV mapping will be broken.

**Silhouette** -- The outline shape of your model from any angle.
A strong silhouette makes a model immediately recognizable even at game distances.
Test: squint at your model. Can you still tell what it is? Good silhouette = yes.

**Stepped Cubes** -- Stacking multiple cubes of decreasing size to fake organic
curved shapes in a cube-based system. Common in Hytale character design.
Example: 6x5x4 -> 4x3x3 -> 2x2x2 stacked forward = rounded snout.

**Texture** -- A 2D image (PNG file) that wraps around the 3D model surface
to give it color, patterns, and detail.

**texture_height / texture_width** -- Values in .geo.json that define the expected
size of the texture PNG file. MUST exactly match actual PNG pixel dimensions.
Mismatch = all UV mapping is broken. Most common beginner mistake!

**UV / UV Mapping** -- Mapping a model's 3D cube faces onto a 2D texture image.
"UV" = the 2D coordinate axes of the texture (U=horizontal, V=vertical).
Auto UV does this automatically; manual UV gives precise control.

**Value (Color Theory)** -- The lightness or darkness of a color.
3-value shading: shadow (dark) / mid-tone (medium) / highlight (bright).
3 distinct values make models look solid and three-dimensional.

**Viewport** -- The large central 3D view area in Blockbench.
Left-drag to rotate, scroll to zoom, middle-drag to pan.

**Visible Bounds** -- The bounding box definition in .geo.json that tells the game
how much space the model occupies. Too small = parts of model clip/disappear.
(JSON fields: visible_bounds_width, visible_bounds_height, visible_bounds_offset)

**Voxel** -- A 3D pixel: a small cube unit in 3D space. Hytale's visual style is
voxel-inspired even though it supports sub-cube geometry.

**Walk Cycle** -- A looping animation of a character walking. Requires:
leg alternation, arm swing (opposite to legs), body bob, clean loop closure.
Standard length: 0.5 to 1.0 seconds per full cycle.

---

## Agent Response Style

When answering questions about Hytale modeling, follow this structure:
1. **What this is** -- plain language explanation first
2. **What to click/do** -- short step-by-step instructions
3. **What can go wrong** -- specific pitfalls and their fixes
4. **How to verify success** -- how to confirm it worked

When uncertain, state clearly:
- What is confirmed by official Hytale documentation
- What is inferred from tutorial observation
- What still needs verification for this specific build

**Source priority when sources conflict**:
1. Official Hytale support pages and documentation
2. Official Hytale blog / news / patch notes
3. Plugin author documentation (PasteDev for Avatar Loader)
4. YouTube tutorial transcripts
5. Community guides (only when official docs are silent)

---

*SKILL.md v2.0.0 -- enriched from 26 YouTube video transcripts, official Hytale Avatar Loader*
*plugin docs, official Hytale documentation, KB documents 01-14, and family learning principles.*
*Suitable for all ages. No prior 3D modeling experience required.*
*Last updated: 2026-03-12*
