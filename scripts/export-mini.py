"""Read-only export of the existing STL-derived BitPOS assembly for the website."""
import bpy, os, json
from mathutils import Vector
source='/Users/cryptoclock/Desktop/BitPOS/BitPOS-Motion/blender/anatomy/BitPOS-Anatomy.blend'
bpy.ops.wm.open_mainfile(filepath=source)
s=bpy.context.scene
s.frame_set(0)
bpy.context.view_layer.update()
dg=bpy.context.evaluated_depsgraph_get()
export=[]
for o in list(s.objects):
    if o.type!='MESH' or 'BACKDROP' in o.name or o.hide_render: continue
    evaluated=o.evaluated_get(dg)
    mesh=bpy.data.meshes.new_from_object(evaluated, depsgraph=dg)
    new=bpy.data.objects.new('ScreenSurface' if o.name.startswith('06 Active screen') else o.name,mesh)
    s.collection.objects.link(new)
    new.matrix_world=evaluated.matrix_world.copy()
    if new.name=='ScreenSurface':
        m=bpy.data.materials.new('Website screen');m.diffuse_color=(.15,.02,.25,1);new.data.materials.clear();new.data.materials.append(m)
    export.append(new)
bpy.ops.object.select_all(action='DESELECT')
for o in export:o.select_set(True)
bpy.context.view_layer.objects.active=export[0]
path=os.path.join(os.path.dirname(os.path.dirname(__file__)),'public/assets/model/bitpos-mini.glb')
bpy.ops.export_scene.gltf(filepath=path,export_format='GLB',use_selection=True,export_animations=False,export_cameras=False,export_lights=False,export_materials='EXPORT',export_image_format='AUTO',export_yup=True)
print('EXPORTED',path,os.path.getsize(path))
for o in export:
    if o.name=='ScreenSurface':print('SCREEN', [list(o.matrix_world @ v.co) for v in o.data.vertices],list(o.dimensions))
