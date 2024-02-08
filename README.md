# NSFW-Apocalyptic-World-modded-
mod of Apocalyptic World by ttyrke
---------------------------------
Instructions:
---------------------------------
1) copy the mod into the directory of Apocalyptic World (same folder as index.html)
2) launch modded_index.html
---------------------------------
Details:
---------------------------------
1) All changes are pure jquery/js, applied after Twine has rendered the passage after a delay of 200ms (configure in main.js)
2) Features are separated into different files (custom_images.js, hotkeys.js, passage_modder.js) and called in main.js. modded_sexual_actions.js is just one of the dictionaries used in passage_modder.js
3) New variables:
   _V_ is a global variable (property of window) and is a reference to window.SugarCube.State.variables
   _V.player.sexual_skill_ is used in passage_modder.js in passage_mods["Mc fuck"]
   _V.custom_images_ is a dictionary containing a key-pair of character_id and custom_image_path. It's used in custom_images.js
   _V.passage_ is the passage name (reference to window.SugarCube.State.passage)
---------------------------------
Features/modules:
---------------------------------
1) Randomize portraits:
  1.1) Desc: adds a dice cube next to character paper dolls (portraits); clicking on it will generate a random portrait, provided there are valid images 
       in images/custom_portraits
  1.2) Cons: requires specific file structure and naming convention; requires editing vanilla twine/html code to add data-id attributes to all portrait         image containers.
  1.3) Config/instructions:
    1.3.1) new images: Add images named [num].png (e.x. 6.png) into the relevant folders; the final list should include all numbers from 1 to x. Edit 
           const image_list in custom_images.js to update the image count.
    1.3.2) You can add new race_/hair_ folders. To accept new hair_ folders, modify the hair_category in custom_images.js

2) Hotkeys:
  2.1) Automatically adds numerical hotkeys to red buttons and character links; accepts numpad input too. 'I' is binded to inventory, '`' cheats by re- 
       rolling back time, and 'q/w' are binded to the history arrows.
  2.2) Cons: Numerical hotkeys go above 9, and there's no real way to trigger them yet
  2.3) Config/instructions:
    2.3.1) new hotkey binds: if you don't need to add tags, then just modiify the switch statement in hotkeys.js

3) Passage modifier:
  3.1) Modifies passages. Changes are called from **const** _passage_mods_ in passage_modder.js; all changes are pure jquery/js, applied after Twine has 
       rendered the passage after a delay of 200ms (configure in main.js)
  3.2) Cons: cannot retrieve twine variables that were not saved in V or html (use data- attribute or jquery's .data() method)
  3.3) Config/instructions:
    3.3.1) **const** _passage_mods_ contains the changes in effect(); the key is V.passage. **const** _passage_mods_map_ is a map referring to the     
           changes in _passage_mods_ and determined which event triggers the passage modification. The passage modifications are called in 
           inject_passageMod(e) (in passage_modder.js) from applyMods() (in main.js)
    3.3.2) Make more modifications to passages: find the passage in _passage_mods_ and modify effects.
    3.3.3) Modify other passages: add a new entry to _passage_mods_ (passage_name:{effect(){},fired: false}). Then, add it to _passage_mods_map_
    3.3.4) Add new #slaves icons: go to **class** _class_slaveTable_ and add it as an object this.newIcon={src, act(dom), trigger(character)}. Then, 
           find the appropriate passage in _passage_mods_ (basement/garden/guesthouse/...) and add slaveTable.newIcon to the array that's calling     
           slaveTable.add_icons()
