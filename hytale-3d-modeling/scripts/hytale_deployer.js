// ============================================================
// Hytale Deployer - Blockbench Plugin
// One-click deploy: copies Blockbench exports to Hytale mod dirs
// Version: 1.0.0 | HytaleCreatorLab
// ============================================================

let deployAction;
let changeModFolderAction;
let changeSourceFolderAction;

// ---- Keyword routing rules --------------------------------
// [keyword_in_filename, models_subfolder, textures_subfolder]
const ROUTING_RULES = [
    ['sword',    'items',     'items'],
    ['blade',    'items',     'items'],
    ['bow',      'items',     'items'],
    ['staff',    'items',     'items'],
    ['wand',     'items',     'items'],
    ['axe',      'items',     'items'],
    ['dagger',   'items',     'items'],
    ['shield',   'items',     'items'],
    ['weapon',   'items',     'items'],
    ['item',     'items',     'items'],
    ['creature', 'creatures', 'creatures'],
    ['monster',  'creatures', 'creatures'],
    ['beast',    'creatures', 'creatures'],
    ['animal',   'creatures', 'creatures'],
    ['npc',      'characters','characters'],
    ['character','characters','characters'],
    ['player',   'characters','characters'],
    ['chest',    'props',     'props'],
    ['barrel',   'props',     'props'],
    ['crate',    'props',     'props'],
    ['prop',     'props',     'props'],
    ['block',    'blocks',    'blocks'],
    ['tile',     'blocks',    'blocks'],
];

const DEFAULT_SUBDIR = 'misc';

function getRouting(filename) {
    const lower = filename.toLowerCase();
    for (const [kw, modelSub, texSub] of ROUTING_RULES) {
        if (lower.includes(kw)) return { modelSub, texSub };
    }
    return { modelSub: DEFAULT_SUBDIR, texSub: DEFAULT_SUBDIR };
}

function getNodeModules() {
    try {
        const fs   = requireNativeModule('fs');
        const path = requireNativeModule('path');
        return { fs, path };
    } catch(e) {
        try {
            return { fs: require('fs'), path: require('path') };
        } catch(e2) {
            return null;
        }
    }
}

function ensureDir(fs, dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function deployToHytale() {
    const mods = getNodeModules();
    if (!mods) {
        Blockbench.showMessageBox({
            title: 'Hytale Deployer — Error',
            message: 'Could not access the file system.\n\nThis plugin requires the **desktop version** of Blockbench.',
            buttons: ['OK']
        });
        return;
    }
    const { fs, path } = mods;

    // ---- Get saved mod folder (or prompt) -----------------
    const savedModFolder = localStorage.getItem('hytale_deployer_mod_folder');

    function runDeploy(modFolder) {
        // ---- File picker: select model files to deploy -----
        Blockbench.import({
            type: 'Hytale Model / Texture Files',
            extensions: ['json', 'png'],
            multiple: true,
            title: 'Select exported model + texture files to deploy'
        }, function(files) {
            if (!files || files.length === 0) return;

            const results = [];
            const skipped = [];

            files.forEach(file => {
                try {
                    const filename  = path.basename(file.name);
                    const ext       = path.extname(filename).toLowerCase();
                    const base      = filename.replace(/\.geo\.json$/, '').replace(/\.animation\.json$/, '').replace(/\.json$/, '').replace(/\.png$/, '');
                    const routing   = getRouting(base);

                    let destDir;
                    let fileContent;

                    if (filename.endsWith('.geo.json') || filename.endsWith('.animation.json')) {
                        // It's a model or animation JSON
                        const subtype = filename.endsWith('.animation.json') ? 'animations' : 'models';
                        const subdir  = subtype === 'animations' ? routing.modelSub : routing.modelSub;
                        destDir = subtype === 'animations'
                            ? path.join(modFolder, 'assets', 'animations', subdir)
                            : path.join(modFolder, 'assets', 'models', routing.modelSub);
                        fileContent = file.content;
                    } else if (ext === '.json') {
                        // Generic JSON — put in models/misc
                        destDir = path.join(modFolder, 'assets', 'models', routing.modelSub);
                        fileContent = file.content;
                    } else if (ext === '.png') {
                        destDir = path.join(modFolder, 'assets', 'textures', routing.texSub);
                        fileContent = null; // binary handled differently
                    } else {
                        skipped.push(filename + ' (unsupported type)');
                        return;
                    }

                    ensureDir(fs, destDir);
                    const destPath = path.join(destDir, filename);

                    if (ext === '.png') {
                        // Write PNG from base64 or binary
                        if (file.content instanceof ArrayBuffer) {
                            fs.writeFileSync(destPath, Buffer.from(file.content));
                        } else if (typeof file.content === 'string' && file.content.startsWith('data:')) {
                            const b64 = file.content.split(',')[1];
                            fs.writeFileSync(destPath, Buffer.from(b64, 'base64'));
                        } else {
                            fs.writeFileSync(destPath, file.content);
                        }
                    } else {
                        const content = typeof fileContent === 'string' ? fileContent : JSON.stringify(JSON.parse(fileContent), null, 2);
                        fs.writeFileSync(destPath, content, 'utf8');
                    }

                    results.push({ filename, destPath, success: true });

                } catch(err) {
                    results.push({ filename: file.name, error: err.message, success: false });
                }
            });

            // ---- Build result message ----------------------
            const ok   = results.filter(r => r.success);
            const fail = results.filter(r => !r.success);

            let msg = '';

            if (ok.length > 0) {
                msg += `**✅ Deployed ${ok.length} file${ok.length > 1 ? 's' : ''}:**\n\n`;
                ok.forEach(r => {
                    const shortPath = r.destPath.replace(modFolder, '...');
                    msg += `• \`${r.filename}\`\n  → \`${shortPath}\`\n`;
                });
            }

            if (fail.length > 0) {
                msg += `\n**❌ Failed ${fail.length} file${fail.length > 1 ? 's' : ''}:**\n\n`;
                fail.forEach(r => {
                    msg += `• \`${r.filename}\`: ${r.error}\n`;
                });
            }

            if (skipped.length > 0) {
                msg += `\n**⏭️ Skipped:** ${skipped.join(', ')}`;
            }

            if (ok.length > 0) {
                msg += `\n\n🎮 **Open Hytale and load your mod to see the changes!**`;
            }

            Blockbench.showMessageBox({
                title: ok.length > 0 ? '🚀 Hytale Deployer — Done!' : '⚠️ Hytale Deployer — Issues',
                message: msg || 'No files were processed.',
                buttons: ['OK']
            });
        });
    }

    // ---- Check if mod folder is configured ----------------
    if (savedModFolder && savedModFolder.length > 0) {
        runDeploy(savedModFolder);
    } else {
        // First time: prompt to pick mod folder
        Blockbench.showMessageBox({
            title: '🚀 Hytale Deployer — First Time Setup',
            message: '**Welcome to Hytale Deployer!**\n\n' +
                     'First, select your **Hytale mod folder** — this is the root folder of your mod where assets will be deployed.\n\n' +
                     'Example:\n' +
                     '`%appdata%\\Hytale\\mods\\MyAwesomeMod`\n\n' +
                     'This path will be saved. You can change it later via:\n' +
                     '**File → Preferences → Change Hytale Mod Folder**',
            buttons: ['Select Folder', 'Cancel']
        }, function(result) {
            if (result === 1) return; // Cancel

            if (typeof Blockbench.pickDirectory === 'function') {
                const chosen = Blockbench.pickDirectory({
                    title: 'Select your Hytale Mod Root Folder',
                    resource_id: 'hytale_mod_folder'
                });
                if (!chosen) return;
                localStorage.setItem('hytale_deployer_mod_folder', chosen);
                Blockbench.showStatusMessage('✅ Mod folder saved! Now select files to deploy...', 3000);
                runDeploy(chosen);
            } else {
                Blockbench.showMessageBox({
                    title: 'Error',
                    message: 'Directory picker not available. Please update Blockbench to v4.10+',
                    buttons: ['OK']
                });
            }
        });
    }
}

function changeModFolder() {
    if (typeof Blockbench.pickDirectory === 'function') {
        const current = localStorage.getItem('hytale_deployer_mod_folder') || '';
        const chosen = Blockbench.pickDirectory({
            title: 'Select your Hytale Mod Root Folder',
            resource_id: 'hytale_mod_folder'
        });
        if (!chosen) return;
        localStorage.setItem('hytale_deployer_mod_folder', chosen);
        Blockbench.showMessageBox({
            title: 'Hytale Deployer',
            message: `✅ **Mod folder updated!**\n\n\`${chosen}\``,
            buttons: ['OK']
        });
    }
}

Plugin.register('hytale_deployer', {
    title: 'Hytale Deployer',
    author: 'HytaleCreatorLab',
    description: 'One-click deploy: copies your exported Blockbench model and texture files into the correct Hytale mod directories automatically.',
    icon: 'rocket_launch',
    version: '1.0.0',
    min_version: '4.10.0',
    variant: 'desktop',
    tags: ['Hytale'],
    website: 'https://github.com/Agentic-Person/agent-skills',
    creation_date: '2026-03-12',

    onload() {
        if (window.hytaleDeployerInitialized) return;
        window.hytaleDeployerInitialized = true;

        deployAction = new Action('hytale_deploy', {
            name: '🚀 Deploy to Hytale',
            description: 'Copy exported model/texture files to the correct Hytale mod directories',
            icon: 'rocket_launch',
            condition: true,
            click: function() { deployToHytale(); }
        });

        changeModFolderAction = new Action('hytale_change_mod_folder', {
            name: 'Change Hytale Mod Folder',
            description: 'Update the target Hytale mod folder used by the Deployer',
            icon: 'folder_open',
            click: function() { changeModFolder(); }
        });

        // Add Deploy to File menu (after export section)
        MenuBar.menus.file.addAction(deployAction, '#export');

        // Add folder change to Preferences
        if (MenuBar.menus.file.structure) {
            const prefIdx = MenuBar.menus.file.structure.findIndex(x => x && x.id === 'preferences');
            if (prefIdx !== -1) {
                MenuBar.menus.file.addAction(changeModFolderAction, 'preferences');
            }
        }
        // Fallback: also add to file menu directly
        MenuBar.menus.file.addAction(changeModFolderAction, '#export');
    },

    onunload() {
        if (deployAction)         { deployAction.delete();         deployAction = null; }
        if (changeModFolderAction){ changeModFolderAction.delete(); changeModFolderAction = null; }
        window.hytaleDeployerInitialized = false;
    }
});
