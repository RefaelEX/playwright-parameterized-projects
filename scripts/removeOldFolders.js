const fs = require('fs');
const path = require('path');

// Function to find old folders based on creation time
function findOldFolders(nDays, directory) {
    const currentTime = new Date();
    const oldFolders = [];

    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
        if (entry.isDirectory()) {
            const folderPath = path.join(directory, entry.name);
            try {
                const stats = fs.statSync(folderPath);
                const creationTime = new Date(stats.birthtime);
                const timeDifference = (currentTime - creationTime) / (1000 * 60 * 60 * 24);
                
                if (timeDifference > nDays) {
                    oldFolders.push(entry.name);
                } else {
                    console.log(`SKIPPED --- Folder '${entry.name}' is not older than ${nDays} days. It will not be deleted.`);
                }
            } catch (error) {
                console.log(`SKIPPED --- Error retrieving stats for folder '${entry.name}'. It will not be deleted.`);
            }
        } else {
            console.log(`SKIPPED --- '${entry.name}' is not a folder. It will not be deleted.`);
        }
    });

    return oldFolders;
}

// Function to delete specified folders
function deleteFolders(directory, folderNames) {
    folderNames.forEach((folderName) => {
        const folderPath = path.join(directory, folderName);
        if (fs.existsSync(folderPath)) {
            fs.rm(folderPath, { recursive: true, force: true }, (err) => {
                if (err) {
                    console.error(`Error deleting folder '${folderName}': ${err}`);
                } else {
                    console.log(`DELETED --- Folder '${folderName}' and its contents have been deleted.`);
                }
            });
        } else {
            console.log(`Folder '${folderName}' not found.`);
        }
    });
}

// Main script execution
function main() {
    const args = process.argv.slice(2);
    let nDays = null;
    let folderName = null;

    for (let i = 0; i < args.length; i += 2) {
        switch (args[i]) {
            case '--n-days':
                nDays = parseInt(args[i + 1], 10);
                break;
            case '--folder-name':
                folderName = args[i + 1];
                break;
            default:
                console.error(`Unknown option: ${args[i]}`);
                process.exit(1);
        }
    }

    if (nDays === null || folderName === null) {
        console.error("Usage: node script.js --n-days <n_days> --folder-name <directory>");
        process.exit(1);
    }

    const oldFolders = findOldFolders(nDays, folderName);
    deleteFolders(folderName, oldFolders);
}

main();
