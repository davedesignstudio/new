"""
Build and render the Boonton Cafe diner in Blender with Poly Haven PBR maps.

Seats (booth pair + chairs/stools) use heavy bevels and subdivision so the
vinyl reads as wrapped cushions, not boxes.

Run:
  blender --background --python src/walkthrough/build_diner_blend.py -- --still
  blender --background --python src/walkthrough/build_diner_blend.py -- --preview
  blender --background --python src/walkthrough/build_diner_blend.py -- --anim
"""
import os
import sys
import math
import urllib.request
import bpy
from mathutils import Vector, Matrix


ROOT = os.path.dirname(os.path.abspath(__file__))
TEX = os.path.join(ROOT, "textures")
TEX4K = os.path.join(TEX, "4k")
FONT = os.path.join(ROOT, "fonts", "Pacifico-Regular.ttf")
BLEND = os.path.join(ROOT, "boonton_diner.blend")
STILL = "/tmp/diner-still.png"
FRAMES = "/tmp/diner-frames"
PREVIEW = "/tmp/diner-preview"

FPS = 15
FRAME_COUNT = 210
RES_X = 1920
RES_Y = 1080
PH = "https://dl.polyhaven.org/file/ph-assets"

TEXTURE_URLS = {
    "leather_diff.jpg": PH + "/Textures/jpg/2k/leather_red_02/leather_red_02_coll1_2k.jpg",
    "leather_nor.jpg": PH + "/Textures/jpg/2k/leather_red_02/leather_red_02_nor_gl_2k.jpg",
    "leather_rough.jpg": PH + "/Textures/jpg/2k/leather_red_02/leather_red_02_rough_2k.jpg",
    "metal_nor.jpg": PH + "/Textures/jpg/2k/metal_plate/metal_plate_nor_gl_2k.jpg",
    "metal_rough.jpg": PH + "/Textures/jpg/2k/metal_plate/metal_plate_rough_2k.jpg",
    "metal_metal.jpg": PH + "/Textures/jpg/2k/metal_plate/metal_plate_metal_2k.jpg",
    "plaster_diff.jpg": PH + "/Textures/jpg/2k/white_plaster_02/white_plaster_02_diff_2k.jpg",
    "plaster_nor.jpg": PH + "/Textures/jpg/2k/white_plaster_02/white_plaster_02_nor_gl_2k.jpg",
    "plaster_rough.jpg": PH + "/Textures/jpg/2k/white_plaster_02/white_plaster_02_rough_2k.jpg",
    "tiles_nor.jpg": PH + "/Textures/jpg/2k/floor_tiles_06/floor_tiles_06_nor_gl_2k.jpg",
    "tiles_rough.jpg": PH + "/Textures/jpg/2k/floor_tiles_06/floor_tiles_06_rough_2k.jpg",
    "cafe.hdr": PH + "/HDRIs/hdr/2k/warm_restaurant_night_2k.hdr",
}

TEX4K_URLS = {
    "leather_diff.jpg": PH + "/Textures/jpg/4k/leather_red_02/leather_red_02_coll1_4k.jpg",
    "leather_nor.jpg": PH + "/Textures/jpg/4k/leather_red_02/leather_red_02_nor_gl_4k.jpg",
    "leather_rough.jpg": PH + "/Textures/jpg/4k/leather_red_02/leather_red_02_rough_4k.jpg",
    "metal_nor.jpg": PH + "/Textures/jpg/4k/metal_plate/metal_plate_nor_gl_4k.jpg",
    "metal_rough.jpg": PH + "/Textures/jpg/4k/metal_plate/metal_plate_rough_4k.jpg",
    "metal_metal.jpg": PH + "/Textures/jpg/4k/metal_plate/metal_plate_metal_4k.jpg",
    "plaster_diff.jpg": PH + "/Textures/jpg/4k/white_plaster_02/white_plaster_02_diff_4k.jpg",
    "plaster_nor.jpg": PH + "/Textures/jpg/4k/white_plaster_02/white_plaster_02_nor_gl_4k.jpg",
    "tiles_nor.jpg": PH + "/Textures/jpg/4k/floor_tiles_06/floor_tiles_06_nor_gl_4k.jpg",
    "tiles_rough.jpg": PH + "/Textures/jpg/4k/floor_tiles_06/floor_tiles_06_rough_4k.jpg",
}


def argv_after():
    if "--" in sys.argv:
        return sys.argv[sys.argv.index("--") + 1 :]
    return []


def fetch(url, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return
    print("DOWNLOAD", os.path.basename(path))
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as src, open(path, "wb") as out:
        out.write(src.read())


def ensure_textures():
    os.makedirs(TEX, exist_ok=True)
    os.makedirs(TEX4K, exist_ok=True)
    for name, url in TEXTURE_URLS.items():
        try:
            fetch(url, os.path.join(TEX, name))
        except Exception as err:
            print("SKIP", name, err)
    for name, url in TEX4K_URLS.items():
        try:
            fetch(url, os.path.join(TEX4K, name))
        except Exception as err:
            print("SKIP4K", name, err)


def tex_path(name):
    p4 = os.path.join(TEX4K, name)
    if os.path.exists(p4) and os.path.getsize(p4) > 1000:
        return p4
    return os.path.join(TEX, name)


def clear():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def img(path):
    if not os.path.exists(path):
        raise FileNotFoundError(path)
    return bpy.data.images.load(path, check_existing=True)


def tex_node(nt, image, noncolor=False):
    n = nt.nodes.new("ShaderNodeTexImage")
    n.image = image
    if noncolor and n.image:
        n.image.colorspace_settings.name = "Non-Color"
    return n


def mapping(nt, scale):
    m = nt.nodes.new("ShaderNodeMapping")
    m.inputs["Scale"].default_value = (scale, scale, scale)
    t = nt.nodes.new("ShaderNodeTexCoord")
    nt.links.new(t.outputs["UV"], m.inputs["Vector"])
    return m


def shade_smooth(ob):
    mesh = ob.data
    if not hasattr(mesh, "polygons"):
        return
    for p in mesh.polygons:
        p.use_smooth = True
    if hasattr(mesh, "use_auto_smooth"):
        mesh.use_auto_smooth = True
        mesh.auto_smooth_angle = math.radians(50)


def apply_mods(ob):
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    try:
        bpy.ops.object.convert(target="MESH")
    except Exception:
        pass
    ob.select_set(False)


def bevel_edges(ob, width, segments=6, angle=None, sub=0):
    """Bevel then optionally subdivide. angle=None bevels every edge (cushions)."""
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    bv = ob.modifiers.new("Bevel", "BEVEL")
    bv.width = max(0.002, width)
    bv.segments = segments
    if angle is None:
        bv.limit_method = "NONE"
    else:
        bv.limit_method = "ANGLE"
        bv.angle_limit = math.radians(angle)
    bv.miter_outer = "MITER_ARC"
    if hasattr(bv, "harden_normals"):
        bv.harden_normals = True
    if sub:
        ss = ob.modifiers.new("Subsurf", "SUBSURF")
        ss.levels = max(1, sub - 1)
        ss.render_levels = sub
        ss.quality = 3
    shade_smooth(ob)
    apply_mods(ob)
    shade_smooth(ob)
    ob.select_set(False)
    return ob


def pbr_material(name, color=(0.8, 0.8, 0.8, 1), metallic=0.0, roughness=0.4,
                 emission=None, emission_strength=0.0, diff=None, nor=None,
                 rough_map=None, metal_map=None, scale=4.0, mix_color=None,
                 mix_fac=0.0, rough_mul=1.0, nor_strength=0.7, coat=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    out.location = (700, 0)
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = (350, 0)
    if "Base Color" in bsdf.inputs:
        bsdf.inputs["Base Color"].default_value = color
    if "Metallic" in bsdf.inputs:
        bsdf.inputs["Metallic"].default_value = metallic
    if "Roughness" in bsdf.inputs:
        bsdf.inputs["Roughness"].default_value = roughness
    if coat:
        if "Coat Weight" in bsdf.inputs:
            bsdf.inputs["Coat Weight"].default_value = coat
        elif "Clearcoat" in bsdf.inputs:
            bsdf.inputs["Clearcoat"].default_value = coat
        if "Coat Roughness" in bsdf.inputs:
            bsdf.inputs["Coat Roughness"].default_value = 0.05
    if emission and "Emission Color" in bsdf.inputs:
        bsdf.inputs["Emission Color"].default_value = emission
        if "Emission Strength" in bsdf.inputs:
            bsdf.inputs["Emission Strength"].default_value = emission_strength
    elif emission and "Emission" in bsdf.inputs:
        bsdf.inputs["Emission"].default_value = emission
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])

    mapn = None
    if diff or nor or rough_map or metal_map:
        mapn = mapping(nt, scale)

    def plug(path, noncolor):
        n = tex_node(nt, img(path), noncolor)
        if mapn:
            nt.links.new(mapn.outputs["Vector"], n.inputs["Vector"])
        return n

    if diff:
        d = plug(diff, False)
        color_out = d.outputs["Color"]
        if mix_color is not None:
            mix = nt.nodes.new("ShaderNodeMixRGB")
            mix.blend_type = "MIX"
            mix.inputs["Fac"].default_value = mix_fac
            mix.inputs["Color1"].default_value = mix_color
            nt.links.new(d.outputs["Color"], mix.inputs["Color2"])
            color_out = mix.outputs["Color"]
        nt.links.new(color_out, bsdf.inputs["Base Color"])
    if nor:
        n = plug(nor, True)
        nrm = nt.nodes.new("ShaderNodeNormalMap")
        nrm.inputs["Strength"].default_value = nor_strength
        nt.links.new(n.outputs["Color"], nrm.inputs["Color"])
        nt.links.new(nrm.outputs["Normal"], bsdf.inputs["Normal"])
    if rough_map:
        r = plug(rough_map, True)
        if rough_mul != 1.0:
            mul = nt.nodes.new("ShaderNodeMath")
            mul.operation = "MULTIPLY"
            mul.inputs[1].default_value = rough_mul
            nt.links.new(r.outputs["Color"], mul.inputs[0])
            nt.links.new(mul.outputs["Value"], bsdf.inputs["Roughness"])
        else:
            nt.links.new(r.outputs["Color"], bsdf.inputs["Roughness"])
    if metal_map and "Metallic" in bsdf.inputs:
        m = plug(metal_map, True)
        nt.links.new(m.outputs["Color"], bsdf.inputs["Metallic"])
    return mat


def checker_floor_mat():
    mat = bpy.data.materials.new("DinerChecker")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    gloss = nt.nodes.new("ShaderNodeBsdfGlossy")
    mixs = nt.nodes.new("ShaderNodeMixShader")
    mixs.inputs["Fac"].default_value = 0.38
    if "Metallic" in bsdf.inputs:
        bsdf.inputs["Metallic"].default_value = 0.08
    if "Specular IOR Level" in bsdf.inputs:
        bsdf.inputs["Specular IOR Level"].default_value = 1.0
    if "Coat Weight" in bsdf.inputs:
        bsdf.inputs["Coat Weight"].default_value = 1.0
        bsdf.inputs["Coat Roughness"].default_value = 0.025
    bsdf.inputs["Roughness"].default_value = 0.05
    if "Roughness" in gloss.inputs:
        gloss.inputs["Roughness"].default_value = 0.035
    chk = nt.nodes.new("ShaderNodeTexChecker")
    chk.inputs["Scale"].default_value = 16.0
    chk.inputs["Color1"].default_value = (0.97, 0.96, 0.93, 1)
    chk.inputs["Color2"].default_value = (0.015, 0.015, 0.018, 1)
    coord = nt.nodes.new("ShaderNodeTexCoord")
    nt.links.new(coord.outputs["Generated"], chk.inputs["Vector"])
    tiles = tex_node(nt, img(tex_path("tiles_nor.jpg")), True)
    mapn = nt.nodes.new("ShaderNodeMapping")
    mapn.inputs["Scale"].default_value = (6, 6, 6)
    nt.links.new(coord.outputs["UV"], mapn.inputs["Vector"])
    nt.links.new(mapn.outputs["Vector"], tiles.inputs["Vector"])
    nrm = nt.nodes.new("ShaderNodeNormalMap")
    nrm.inputs["Strength"].default_value = 0.18
    nt.links.new(tiles.outputs["Color"], nrm.inputs["Color"])
    nt.links.new(chk.outputs["Color"], bsdf.inputs["Base Color"])
    nt.links.new(nrm.outputs["Normal"], bsdf.inputs["Normal"])
    nt.links.new(bsdf.outputs["BSDF"], mixs.inputs[1])
    nt.links.new(gloss.outputs["BSDF"], mixs.inputs[2])
    nt.links.new(mixs.outputs["Shader"], out.inputs["Surface"])
    return mat


def rail_checker_mat():
    mat = bpy.data.materials.new("RailChecker")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    chk = nt.nodes.new("ShaderNodeTexChecker")
    chk.inputs["Scale"].default_value = 48.0
    chk.inputs["Color1"].default_value = (0.02, 0.02, 0.02, 1)
    chk.inputs["Color2"].default_value = (0.83, 0.63, 0.09, 1)
    coord = nt.nodes.new("ShaderNodeTexCoord")
    nt.links.new(coord.outputs["Generated"], chk.inputs["Vector"])
    bsdf.inputs["Roughness"].default_value = 0.32
    nt.links.new(chk.outputs["Color"], bsdf.inputs["Base Color"])
    nt.links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return mat


def add_box(w, h, d, x, y, z, mat):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, z, y))
    ob = bpy.context.object
    ob.dimensions = (w, d, h)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    ob.data.materials.append(mat)
    return ob


def add_cyl(r, h, x, y, z, mat, verts=64):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=h, vertices=verts, location=(x, z, y))
    ob = bpy.context.object
    ob.data.materials.append(mat)
    shade_smooth(ob)
    return ob


def add_cushion(w, h, d, x, y, z, mat, plump_w=0.05):
    """Vinyl seat or back pad with beveled edges on every side."""
    ob = add_box(w, h, d, x, y, z, mat)
    width = min(plump_w, h * 0.44, w * 0.18, d * 0.18)
    bevel_edges(ob, width, segments=8, angle=None, sub=2)
    return ob


def add_round_seat(r, h, x, y, z, mat, plump_w=0.032):
    """Round stool/chair seat with a beveled rim."""
    ob = add_cyl(r, h, x, y, z, mat, verts=96)
    bevel_edges(ob, min(plump_w, h * 0.42), segments=8, angle=40, sub=2)
    return ob


def add_uv():
    for ob in bpy.data.objects:
        if ob.type != "MESH":
            continue
        bpy.context.view_layer.objects.active = ob
        ob.select_set(True)
        try:
            bpy.ops.object.mode_set(mode="EDIT")
            bpy.ops.mesh.select_all(action="SELECT")
            bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.02)
            bpy.ops.object.mode_set(mode="OBJECT")
        except Exception:
            try:
                bpy.ops.object.mode_set(mode="OBJECT")
            except Exception:
                pass
        ob.select_set(False)


def neon_mat(name, color, strength):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    b = mat.node_tree.nodes["Principled BSDF"]
    col = color + (1,)
    if "Base Color" in b.inputs:
        b.inputs["Base Color"].default_value = col
    if "Emission Color" in b.inputs:
        b.inputs["Emission Color"].default_value = col
        b.inputs["Emission Strength"].default_value = strength
    if "Roughness" in b.inputs:
        b.inputs["Roughness"].default_value = 0.12
    return mat


def neon_wave(name, x0, z_h, mat, phase=0.0, amp=0.55):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = 0.03
    curve.bevel_resolution = 8
    curve.resolution_u = 12
    curve.fill_mode = "FULL"
    spline = curve.splines.new("NURBS")
    n = 48
    spline.points.add(n - 1)
    spline.use_endpoint_u = True
    spline.order_u = 4
    for i in range(n):
        t = i / float(n - 1)
        y = -7.15 + t * 14.3
        x = x0 + math.sin(t * math.pi * 3.0 + phase) * amp
        z = z_h + math.sin(t * math.pi * 2.0 + phase * 0.7) * 0.07
        spline.points[i].co = (x, y, z, 1.0)
    ob = bpy.data.objects.new(name, curve)
    bpy.context.scene.collection.objects.link(ob)
    ob.data.materials.append(mat)
    return ob


def neon_bar(name, loc, rot, length, radius, mat):
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=radius, depth=length, location=loc)
    ob = bpy.context.active_object
    ob.name = name
    ob.rotation_euler = rot
    ob.data.materials.append(mat)
    shade_smooth(ob)
    bevel_edges(ob, radius * 0.35, segments=4, angle=40, sub=0)
    return ob


def add_sign(neon_c, neon_p):
    font = None
    if os.path.exists(FONT):
        font = bpy.data.fonts.load(FONT)

    def txt(body, loc, mat, size):
        bpy.ops.object.text_add(location=loc)
        ob = bpy.context.object
        ob.data.body = body
        ob.data.size = size
        ob.data.extrude = 0.04
        ob.data.bevel_depth = 0.008
        ob.data.bevel_resolution = 4
        ob.data.align_x = "CENTER"
        if font:
            ob.data.font = font
        ob.rotation_euler = (math.pi / 2, 0, math.pi)
        ob.data.materials.append(mat)
        return ob

    txt("Boonton", (0.0, -7.48, 3.38), neon_c, 0.58)
    txt("Cafe", (0.0, -7.48, 2.78), neon_p, 0.5)


def diner_chair(x, zz, vinyl, chrome):
    """Round beveled vinyl seat + beveled back pad on a chrome stem."""
    add_round_seat(0.23, 0.09, x, 0.64, zz, vinyl, 0.034)
    add_cushion(0.36, 0.42, 0.08, x, 0.94, zz + 0.18, vinyl, 0.036)
    stem = add_cyl(0.028, 0.62, x, 0.31, zz, chrome, 48)
    bevel_edges(stem, 0.006, segments=4, angle=40, sub=0)
    base = add_cyl(0.18, 0.035, x, 0.03, zz, chrome, 64)
    bevel_edges(base, 0.01, segments=5, angle=40, sub=1)
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.15, minor_radius=0.012,
        major_segments=64, minor_segments=16,
        location=(x, zz, 0.22),
    )
    ring = bpy.context.object
    ring.data.materials.append(chrome)
    shade_smooth(ring)
    return None


def build_room(mats):
    vinyl, chrome, plaster, formica, cherry, cherry_dark, black, neon_p, neon_c, gold, ceiling, rail, tube_p, tube_c = mats
    floor = add_box(18, 0.08, 16, 0, -0.04, 0, checker_floor_mat())
    bevel_edges(floor, 0.01, segments=3, angle=40, sub=0)

    for wall in (
        add_box(18, 4.1, 0.25, 0, 2.05, -7.7, plaster),
        add_box(18, 4.1, 0.25, 0, 2.05, 7.7, plaster),
        add_box(0.25, 4.1, 16, -8.9, 2.05, 0, plaster),
        add_box(0.25, 4.1, 16, 8.9, 2.05, 0, plaster),
    ):
        bevel_edges(wall, 0.02, segments=3, angle=50, sub=0)

    for wain in (
        add_box(18, 1.15, 0.28, 0, 0.57, -7.68, vinyl),
        add_box(18, 1.15, 0.28, 0, 0.57, 7.68, vinyl),
        add_box(0.28, 1.15, 16, -8.88, 0.57, 0, vinyl),
        add_box(0.28, 1.15, 16, 8.88, 0.57, 0, vinyl),
    ):
        bevel_edges(wain, 0.03, segments=4, angle=40, sub=0)

    add_box(18, 0.06, 0.12, 0, 1.18, -7.52, rail)
    add_box(18, 0.06, 0.12, 0, 1.18, 7.52, rail)
    add_box(0.12, 0.06, 16, -8.72, 1.18, 0, rail)
    add_box(0.12, 0.06, 16, 8.72, 1.18, 0, rail)
    add_box(17.6, 0.12, 16, 0, 4.18, 0, ceiling)
    add_box(17.7, 0.08, 0.08, 0, 1.28, -7.55, cherry)

    def booth(zz):
        # Solid bases under both facing seats
        left_base = add_box(1.68, 0.38, 1.48, 7.34, 0.19, zz - 0.82, cherry_dark)
        right_base = add_box(1.68, 0.38, 1.48, 7.34, 0.19, zz + 0.82, cherry_dark)
        bevel_edges(left_base, 0.06, segments=8, angle=None, sub=2)
        bevel_edges(right_base, 0.06, segments=8, angle=None, sub=2)
        # Both vinyl seats — plump beveled cushions
        add_cushion(1.70, 0.16, 1.50, 7.33, 0.48, zz - 0.82, vinyl, 0.072)
        add_cushion(1.70, 0.16, 1.50, 7.33, 0.48, zz + 0.82, vinyl, 0.072)
        # Both vinyl backs
        add_cushion(1.70, 0.90, 0.14, 7.33, 1.00, zz - 1.50, vinyl, 0.055)
        add_cushion(1.70, 0.90, 0.14, 7.33, 1.00, zz + 1.50, vinyl, 0.055)
        table = add_box(1.52, 0.07, 1.42, 7.28, 1.10, zz, formica)
        bevel_edges(table, 0.024, segments=8, angle=None, sub=2)
        stem = add_cyl(0.055, 1.02, 7.28, 0.52, zz, chrome, 48)
        bevel_edges(stem, 0.01, segments=4, angle=40, sub=0)
        bpy.ops.mesh.primitive_cone_add(vertices=48, radius1=0.17, depth=0.26, location=(7.3, zz, 2.52))
        cone = bpy.context.object
        cone.data.materials.append(cherry)
        shade_smooth(cone)
        bevel_edges(cone, 0.012, segments=4, angle=35, sub=1)
        lamp = bpy.data.lights.new("BoothLamp", "POINT")
        lamp.energy = 70
        lamp.color = (1.0, 0.66, 0.42)
        lamp.shadow_soft_size = 0.1
        lo = bpy.data.objects.new("BoothLamp", lamp)
        lo.location = (7.3, zz, 2.36)
        bpy.context.scene.collection.objects.link(lo)

    for zz in (3.4, 0.15, -3.1):
        booth(zz)

    def table(x, zz):
        top = add_cyl(0.62, 0.055, x, 1.05, zz, formica, 96)
        bevel_edges(top, 0.016, segments=6, angle=35, sub=1)
        stem = add_cyl(0.055, 1.0, x, 0.50, zz, chrome, 48)
        bevel_edges(stem, 0.008, segments=4, angle=40, sub=0)
        base = add_cyl(0.26, 0.04, x, 0.03, zz, chrome, 64)
        bevel_edges(base, 0.01, segments=5, angle=40, sub=1)
        for k in range(4):
            a = (k * math.pi) / 2 + 0.4
            cx = x + math.cos(a) * 0.85
            cz = zz + math.sin(a) * 0.85
            diner_chair(cx, cz, vinyl, chrome)
        ketchup = add_cyl(0.045, 0.15, x + 0.12, 1.16, zz + 0.1, cherry, 32)
        mustard = add_cyl(0.045, 0.15, x + 0.22, 1.16, zz + 0.05, gold, 32)
        bevel_edges(ketchup, 0.008, segments=4, angle=40, sub=0)
        bevel_edges(mustard, 0.008, segments=4, angle=40, sub=0)

    table(-0.2, 2.1)
    table(1.15, -0.6)
    table(-0.4, -3.15)

    counter = add_box(1.55, 1.02, 10.4, -6.55, 0.51, 0.2, vinyl)
    bevel_edges(counter, 0.04, segments=6, angle=40, sub=1)
    top = add_box(1.72, 0.07, 10.5, -6.5, 1.08, 0.2, formica)
    bevel_edges(top, 0.02, segments=6, angle=35, sub=1)
    for yoff in (0.72, 0.50, 0.28):
        band = add_box(0.07, 0.045, 10.2, -5.76, yoff, 0.2, chrome)
        bevel_edges(band, 0.012, segments=4, angle=40, sub=0)
    soffit = add_box(1.9, 0.14, 10.6, -6.55, 2.70, 0.2, cherry_dark)
    bevel_edges(soffit, 0.03, segments=4, angle=40, sub=1)
    neon_bar("counter_neon", (-6.4, 0.2, 2.62), (math.pi / 2, 0, 0), 10.2, 0.025, tube_c)
    for si in range(8):
        sz = -4.2 + si * 1.2
        add_round_seat(0.21, 0.085, -5.35, 0.66, sz, vinyl, 0.03)
        stem = add_cyl(0.03, 0.64, -5.35, 0.31, sz, chrome, 48)
        bevel_edges(stem, 0.006, segments=4, angle=40, sub=0)
        base = add_cyl(0.17, 0.035, -5.35, 0.03, sz, chrome, 48)
        bevel_edges(base, 0.009, segments=4, angle=40, sub=1)
        bpy.ops.mesh.primitive_torus_add(
            major_radius=0.14, minor_radius=0.011,
            major_segments=48, minor_segments=12,
            location=(-5.35, sz, 0.24),
        )
        ring = bpy.context.object
        ring.data.materials.append(chrome)
        shade_smooth(ring)
        spot = bpy.data.lights.new("SoffitSpot%d" % si, "SPOT")
        spot.energy = 110
        spot.color = (1.0, 0.88, 0.74)
        spot.spot_size = math.radians(50)
        spot.spot_blend = 0.5
        so = bpy.data.objects.new("SoffitSpot%d" % si, spot)
        so.location = (-6.45, sz, 2.55)
        bpy.context.scene.collection.objects.link(so)

    body = add_box(1.12, 1.55, 0.62, 0.15, 0.82, -6.85, black)
    cap = add_box(1.02, 0.62, 0.5, 0.15, 1.82, -6.85, gold)
    bevel_edges(body, 0.04, segments=6, angle=40, sub=1)
    bevel_edges(cap, 0.03, segments=5, angle=40, sub=1)
    cols = [(1, 0.2, 0.4, 1), (0.2, 0.86, 1, 1), (1, 0.8, 0.2, 1), (0.4, 1, 0.6, 1)]
    for i, col in enumerate(cols):
        em = bpy.data.materials.new("JukePanel%d" % i)
        em.use_nodes = True
        b = em.node_tree.nodes["Principled BSDF"]
        if "Base Color" in b.inputs:
            b.inputs["Base Color"].default_value = col
        if "Emission Color" in b.inputs:
            b.inputs["Emission Color"].default_value = col
            b.inputs["Emission Strength"].default_value = 14.0
        pane = add_box(0.18, 0.52, 0.04, -0.21 + i * 0.24, 1.85, -6.52, em)
        bevel_edges(pane, 0.008, segments=3, angle=40, sub=0)

    neon_wave("neon_pink_wave", -0.35, 3.62, tube_p, phase=0.2, amp=0.62)
    neon_wave("neon_cyan_wave", 0.45, 3.48, tube_c, phase=1.4, amp=0.58)
    neon_bar("neon_back", (0, -7.35, 3.72), (0, math.pi / 2, 0), 5.2, 0.028, tube_p)
    add_sign(neon_c, neon_p)


def add_area(name, loc, color, energy, size=1.2, size_y=0.18, rot=None):
    lamp = bpy.data.lights.new(name, "AREA")
    lamp.energy = energy
    lamp.color = color
    lamp.shape = "RECTANGLE"
    lamp.size = size
    lamp.size_y = size_y
    ob = bpy.data.objects.new(name, lamp)
    ob.location = loc
    if rot:
        ob.rotation_euler = rot
    bpy.context.scene.collection.objects.link(ob)
    return ob


def lighting():
    world = bpy.data.worlds.new("DinerWorld")
    bpy.context.scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputWorld")
    bg = nt.nodes.new("ShaderNodeBackground")
    env = nt.nodes.new("ShaderNodeTexEnvironment")
    env.image = img(tex_path("cafe.hdr") if os.path.exists(tex_path("cafe.hdr")) else os.path.join(TEX, "cafe.hdr"))
    bg.inputs["Strength"].default_value = 0.62
    nt.links.new(env.outputs["Color"], bg.inputs["Color"])
    nt.links.new(bg.outputs["Background"], out.inputs["Surface"])

    down = (0, 0, 0)
    add_area("NeonPinkCeil", (0, 0, 3.92), (1.0, 0.28, 0.55), 200, 9.0, 0.35, down)
    add_area("NeonCyanCeil", (0.4, 1.2, 3.88), (0.2, 0.9, 1.0), 160, 8.0, 0.28, down)
    add_area("FillWarm", (2.5, -1.0, 3.6), (1.0, 0.86, 0.72), 120, 4.5, 1.4, down)
    add_area("FillBooth", (6.2, 0.2, 3.2), (1.0, 0.78, 0.62), 90, 3.5, 1.0, down)
    soffit = bpy.data.lights.new("Soffit", "AREA")
    soffit.energy = 380
    soffit.color = (1.0, 0.86, 0.74)
    soffit.size = 10
    soffit.size_y = 0.35
    so = bpy.data.objects.new("Soffit", soffit)
    so.location = (-6.2, 0.2, 2.58)
    so.rotation_euler = (0, math.radians(90), 0)
    bpy.context.scene.collection.objects.link(so)
    key = bpy.data.lights.new("Key", "SUN")
    key.energy = 0.45
    key.color = (1.0, 0.95, 0.88)
    ko = bpy.data.objects.new("Key", key)
    ko.location = (-4, 6, 8)
    ko.rotation_euler = (math.radians(50), math.radians(-20), 0)
    bpy.context.scene.collection.objects.link(ko)
    jb = bpy.data.lights.new("JukeLight", "POINT")
    jb.energy = 130
    jb.color = (1.0, 0.38, 0.62)
    jb.shadow_soft_size = 0.35
    jo = bpy.data.objects.new("JukeLight", jb)
    jo.location = (0.15, -6.2, 2.1)
    bpy.context.scene.collection.objects.link(jo)
    sign = bpy.data.lights.new("SignGlow", "AREA")
    sign.energy = 90
    sign.color = (0.4, 0.85, 1.0)
    sign.size = 2.8
    sign.size_y = 1.1
    sg = bpy.data.objects.new("SignGlow", sign)
    sg.location = (0, -7.1, 3.1)
    sg.rotation_euler = (math.radians(90), 0, 0)
    bpy.context.scene.collection.objects.link(sg)


def y_up_to_blender(x, y, z):
    return Vector((x, z, y))


def catmull_component(p0, p1, p2, p3, t, tension):
    t2 = t * t
    t3 = t2 * t
    c0 = p1
    c1 = (-tension * p0) + (tension * p2)
    c2 = (2 * tension * p0) + ((tension - 3) * p1) + ((3 - 2 * tension) * p2) + (-tension * p3)
    c3 = (-tension * p0) + ((2 - tension) * p1) + ((tension - 2) * p2) + (tension * p3)
    return c0 + c1 * t + c2 * t2 + c3 * t3


def catmull_point(pts, u, tension=0.12):
    n = len(pts)
    u = u % 1.0
    p = n * u
    i = int(math.floor(p)) % n
    t = p - math.floor(p)
    p0 = pts[(i - 1) % n]
    p1 = pts[i]
    p2 = pts[(i + 1) % n]
    p3 = pts[(i + 2) % n]
    return Vector((
        catmull_component(p0.x, p1.x, p2.x, p3.x, t, tension),
        catmull_component(p0.y, p1.y, p2.y, p3.y, t, tension),
        catmull_component(p0.z, p1.z, p2.z, p3.z, t, tension),
    ))


def look_rotation(loc, target):
    forward = (target - loc).normalized()
    world_up = Vector((0.0, 0.0, 1.0))
    z_axis = -forward
    x_axis = world_up.cross(z_axis)
    if x_axis.length < 0.001:
        x_axis = Vector((1.0, 0.0, 0.0))
    else:
        x_axis.normalize()
    y_axis = z_axis.cross(x_axis).normalized()
    return Matrix((x_axis, y_axis, z_axis)).transposed().to_euler()


def camera_path():
    pos_yup = [
        (0.15, 1.62, 6.5),
        (0.4, 1.58, 3.4),
        (-2.4, 1.52, 2.0),
        (-2.8, 1.5, -0.2),
        (-0.6, 1.54, -2.2),
        (1.8, 1.56, -1.4),
        (2.2, 1.58, -3.6),
        (0.2, 1.6, -4.8),
        (0.2, 1.6, 1.4),
        (0.15, 1.62, 6.5),
    ]
    look_yup = [
        (0.1, 1.3, -2.4),
        (-5.4, 1.15, 0.8),
        (-6.3, 1.18, 0.2),
        (-5.6, 1.12, -3.0),
        (6.4, 1.2, -1.0),
        (7.1, 1.15, -3.2),
        (0.2, 1.45, -6.7),
        (0.15, 1.55, -6.8),
        (0.2, 1.35, -2.0),
        (0.1, 1.3, -2.4),
    ]
    pos = [y_up_to_blender(*p) for p in pos_yup]
    look = [y_up_to_blender(*p) for p in look_yup]

    cam = bpy.data.cameras.new("WalkCam")
    cam.sensor_fit = "VERTICAL"
    cam.angle = math.radians(58)
    cam.clip_start = 0.05
    cam.clip_end = 80
    cob = bpy.data.objects.new("WalkCam", cam)
    bpy.context.scene.collection.objects.link(cob)
    bpy.context.scene.camera = cob

    steps = FRAME_COUNT
    for i in range(steps):
        u = i / float(steps)
        loc = catmull_point(pos, u)
        target = catmull_point(look, u)
        cob.location = loc
        cob.rotation_euler = look_rotation(loc, target)
        cob.keyframe_insert("location", frame=1 + i)
        cob.keyframe_insert("rotation_euler", frame=1 + i)
    if cob.animation_data and cob.animation_data.action:
        for fc in cob.animation_data.action.fcurves:
            for kp in fc.keyframe_points:
                kp.interpolation = "LINEAR"


def setup_compositor():
    sc = bpy.context.scene
    sc.use_nodes = True
    nt = sc.node_tree
    nt.nodes.clear()
    rl = nt.nodes.new("CompositorNodeRLayers")
    glare = nt.nodes.new("CompositorNodeGlare")
    try:
        glare.glare_type = "FOG_GLOW"
    except TypeError:
        pass
    if hasattr(glare, "mix"):
        glare.mix = 0.1
    if hasattr(glare, "threshold"):
        glare.threshold = 0.9
    if hasattr(glare, "size"):
        glare.size = 6
    composite = nt.nodes.new("CompositorNodeComposite")
    viewer = nt.nodes.new("CompositorNodeViewer")
    nt.links.new(rl.outputs["Image"], glare.inputs["Image"])
    nt.links.new(glare.outputs["Image"], composite.inputs["Image"])
    nt.links.new(glare.outputs["Image"], viewer.inputs["Image"])


def render_settings(engine, samples):
    sc = bpy.context.scene
    sc.render.engine = engine
    sc.render.resolution_x = RES_X
    sc.render.resolution_y = RES_Y
    sc.render.resolution_percentage = 100
    sc.render.fps = FPS
    sc.frame_start = 1
    sc.frame_end = FRAME_COUNT
    sc.render.image_settings.file_format = "PNG"
    sc.render.film_transparent = False
    sc.view_settings.view_transform = "Filmic"
    sc.view_settings.look = "Medium High Contrast"
    if engine in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
        ee = sc.eevee
        for attr, val in (
            ("use_gtao", True),
            ("gtao_distance", 0.5),
            ("use_bloom", True),
            ("bloom_intensity", 0.16),
            ("bloom_threshold", 0.75),
            ("use_ssr", True),
            ("use_ssr_refraction", True),
            ("ssr_quality", 0.85),
            ("use_raytracing", True),
            ("taa_render_samples", samples),
            ("use_shadows", True),
            ("shadow_cube_size", "1024"),
            ("shadow_cascade_size", "1024"),
        ):
            if hasattr(ee, attr):
                try:
                    setattr(ee, attr, val)
                except Exception:
                    pass
        if hasattr(ee, "ray_tracing_options"):
            opts = ee.ray_tracing_options
            if hasattr(opts, "use_denoise"):
                opts.use_denoise = True
            if hasattr(opts, "screen_trace_quality"):
                opts.screen_trace_quality = 0.45
            if hasattr(opts, "trace_max_roughness"):
                opts.trace_max_roughness = 0.55
    if engine == "CYCLES":
        sc.cycles.device = "CPU"
        sc.cycles.samples = max(16, samples)
        sc.cycles.use_denoising = True
    setup_compositor()


def pick_engine():
    engines = bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items.keys()
    if "BLENDER_EEVEE" in engines:
        return "BLENDER_EEVEE"
    if "BLENDER_EEVEE_NEXT" in engines:
        return "BLENDER_EEVEE_NEXT"
    return "CYCLES"


def make_materials():
    vinyl = pbr_material(
        "Vinyl",
        diff=tex_path("leather_diff.jpg"),
        nor=tex_path("leather_nor.jpg"),
        rough_map=tex_path("leather_rough.jpg"),
        scale=2.6,
        mix_color=(0.77, 0.118, 0.227, 1),
        mix_fac=0.78,
        roughness=0.22,
        rough_mul=0.42,
        nor_strength=1.15,
        coat=0.55,
    )
    chrome = pbr_material(
        "Chrome",
        color=(0.90, 0.92, 0.95, 1),
        nor=tex_path("metal_nor.jpg"),
        rough_map=tex_path("metal_rough.jpg"),
        metal_map=tex_path("metal_metal.jpg"),
        scale=5.0,
        metallic=1.0,
        roughness=0.04,
        rough_mul=0.07,
        nor_strength=0.22,
    )
    plaster = pbr_material(
        "Plaster",
        diff=tex_path("plaster_diff.jpg"),
        nor=tex_path("plaster_nor.jpg"),
        scale=3.6,
        mix_color=(0.94, 0.90, 0.82, 1),
        mix_fac=0.62,
        roughness=0.55,
        nor_strength=0.2,
    )
    ceiling = pbr_material(
        "Ceiling",
        color=(0.09, 0.09, 0.1, 1),
        nor=tex_path("plaster_nor.jpg"),
        scale=3.5,
        roughness=0.78,
        nor_strength=0.3,
    )
    formica = pbr_material(
        "Formica",
        color=(0.94, 0.90, 0.82, 1),
        nor=tex_path("tiles_nor.jpg"),
        rough_map=tex_path("tiles_rough.jpg"),
        scale=8.0,
        roughness=0.14,
        rough_mul=0.35,
        coat=0.45,
    )
    cherry = pbr_material("Cherry", color=(0.77, 0.118, 0.227, 1), roughness=0.2, metallic=0.04, coat=0.35)
    cherry_dark = pbr_material("CherryDark", color=(0.28, 0.035, 0.09, 1), roughness=0.28)
    black = pbr_material("Black", color=(0.02, 0.02, 0.02, 1), roughness=0.32)
    gold = pbr_material("Gold", color=(0.83, 0.63, 0.09, 1), metallic=1.0, roughness=0.16)
    neon_p = neon_mat("NeonPink", (1.0, 0.22, 0.52), 10.0)
    neon_c = neon_mat("NeonCyan", (0.18, 0.92, 1.0), 9.0)
    tube_p = neon_mat("TubePink", (1.0, 0.18, 0.48), 32.0)
    tube_c = neon_mat("TubeCyan", (0.12, 0.9, 1.0), 28.0)
    rail = rail_checker_mat()
    return vinyl, chrome, plaster, formica, cherry, cherry_dark, black, neon_p, neon_c, gold, ceiling, rail, tube_p, tube_c


def render_frame(path, frame):
    bpy.context.scene.frame_set(frame)
    bpy.context.scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    print("FRAME", frame, path)


def main():
    args = argv_after()
    ensure_textures()
    clear()
    mats = make_materials()
    build_room(mats)
    lighting()
    add_uv()
    camera_path()
    engine = pick_engine()
    samples = 20 if "--still" in args else 12
    if "--samples" in args:
        samples = int(args[args.index("--samples") + 1])
    render_settings(engine, samples)
    bpy.ops.wm.save_as_mainfile(filepath=BLEND)
    print("ENGINE", engine)
    print("SAMPLES", samples)
    print("RES", RES_X, RES_Y)
    print("SAVED", BLEND)

    if "--still" in args:
        render_frame(STILL, 1)
        print("STILL", STILL)
    if "--preview" in args:
        os.makedirs(PREVIEW, exist_ok=True)
        for fr in (1, 53, 105, 157, 210):
            render_frame(os.path.join(PREVIEW, "f%04d.png" % fr), fr)
        print("PREVIEW", PREVIEW)
    if "--anim" in args:
        os.makedirs(FRAMES, exist_ok=True)
        bpy.context.scene.render.filepath = os.path.join(FRAMES, "f")
        bpy.ops.render.render(animation=True)
        print("ANIM", FRAMES)


if __name__ == "__main__":
    main()
