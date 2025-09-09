// LoRA Converter Renderer Process

class LoRAConverter {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.stagedFiles = new Set();
    }

    initializeElements() {
        // Window controls
        this.minimizeBtn = document.getElementById('minimize-btn');
        this.maximizeBtn = document.getElementById('maximize-btn');
        this.closeBtn = document.getElementById('close-btn');

        // Main elements
        this.dropZone = document.getElementById('drop-zone');
        this.browseBtn = document.getElementById('browse-btn');
        this.convertBtn = document.getElementById('convert-btn');
        this.dropOverlay = document.getElementById('drop-overlay');

        // Staged files elements
        this.stagedFilesSection = document.getElementById('staged-files-section');
        this.stagedFilesList = document.getElementById('staged-files-list');
        this.clearStagedBtn = document.getElementById('clear-staged');

        // Progress elements
        this.progressSection = document.getElementById('progress-section');
        this.progressCount = document.getElementById('progress-count');
        this.progressFill = document.getElementById('progress-fill');

        // Results elements
        this.resultsSection = document.getElementById('results-section');
        this.resultsList = document.getElementById('results-list');
        this.clearResultsBtn = document.getElementById('clear-results');

        // Status
        this.statusText = document.getElementById('status-text');
    }

    setupEventListeners() {
        // Window controls
        this.minimizeBtn.addEventListener('click', () => {
            window.electronAPI.minimizeWindow();
        });

        this.maximizeBtn.addEventListener('click', () => {
            window.electronAPI.maximizeWindow();
        });

        this.closeBtn.addEventListener('click', () => {
            window.electronAPI.closeWindow();
        });

        // File operations
        this.browseBtn.addEventListener('click', () => {
            this.browseFiles();
        });

        this.convertBtn.addEventListener('click', () => {
            this.convertFiles();
        });

        this.dropZone.addEventListener('click', () => {
            this.browseFiles();
        });

        this.clearStagedBtn.addEventListener('click', () => {
            this.clearStagedFiles();
        });

        this.clearResultsBtn.addEventListener('click', () => {
            this.clearResults();
        });
    }

    setupDragAndDrop() {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, () => {
                this.dropZone.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.dropZone.addEventListener(eventName, () => {
                this.dropZone.classList.remove('drag-over');
            }, false);
        });

        // Handle dropped files
        this.dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = Array.from(dt.files);
            this.handleFiles(files);
        }, false);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    async browseFiles() {
        try {
            const filePaths = await window.electronAPI.selectFiles();
            if (filePaths && filePaths.length > 0) {
                // Convert File objects to file paths for consistency
                this.handleFilePaths(filePaths);
            }
        } catch (error) {
            this.showError('Failed to open file dialog: ' + error.message);
        }
    }

    handleFiles(files) {
        // Filter for .safetensors files
        const validFiles = files.filter(file => 
            file.name.toLowerCase().endsWith('.safetensors')
        );

        if (validFiles.length === 0) {
            this.showError('Please select .safetensors files only');
            return;
        }

        if (validFiles.length !== files.length) {
            this.showWarning(`${files.length - validFiles.length} non-safetensors files were ignored`);
        }

        // Convert File objects to paths (this is a limitation - in real implementation,
        // you'd need to handle File objects differently)
        const filePaths = validFiles.map(file => file.path || file.name);
        this.handleFilePaths(filePaths);
    }

    async handleFilePaths(filePaths) {
        if (!filePaths || filePaths.length === 0) return;

        // Filter for .safetensors files
        const validPaths = filePaths.filter(path => 
            path.toLowerCase().endsWith('.safetensors')
        );

        if (validPaths.length === 0) {
            this.showError('Please select .safetensors files only');
            return;
        }

        // Add files to staging area
        let addedCount = 0;
        validPaths.forEach(filePath => {
            if (!this.stagedFiles.has(filePath)) {
                this.stagedFiles.add(filePath);
                addedCount++;
            }
        });

        if (addedCount > 0) {
            this.updateStagedFilesDisplay();
            this.updateStatus(`Added ${addedCount} file(s) to conversion queue`);
        } else {
            this.updateStatus('All selected files are already in the queue');
        }
    }

    async convertFiles() {
        if (this.stagedFiles.size === 0) {
            this.showError('No files selected for conversion');
            return;
        }

        const filesToConvert = Array.from(this.stagedFiles);
        
        this.showProgress();
        this.updateProgress(0, filesToConvert.length);

        try {
            const results = await window.electronAPI.convertFiles(filesToConvert);
            this.handleConversionResults(results);
            
            // Clear staged files after successful conversion
            this.clearStagedFiles();
        } catch (error) {
            this.showError('Conversion failed: ' + error.message);
        } finally {
            this.hideProgress();
        }
    }

    handleConversionResults(results) {
        this.showResults();
        this.clearResultsList();

        let successCount = 0;
        let errorCount = 0;

        results.forEach((result, index) => {
            this.updateProgress(index + 1, results.length);
            this.addResultItem(result);
            
            if (result.success) {
                successCount++;
            } else {
                errorCount++;
            }
        });

        // Update status
        if (errorCount === 0) {
            this.updateStatus(`Successfully converted ${successCount} file(s)`);
        } else {
            this.updateStatus(`Converted ${successCount} file(s), ${errorCount} failed`);
        }

    }

    updateStagedFilesDisplay() {
        if (this.stagedFiles.size === 0) {
            this.stagedFilesSection.style.display = 'none';
            this.convertBtn.disabled = true;
            return;
        }

        this.stagedFilesSection.style.display = 'block';
        this.convertBtn.disabled = false;
        
        // Clear existing items
        this.stagedFilesList.innerHTML = '';

        // Add each staged file
        this.stagedFiles.forEach(filePath => {
            const item = document.createElement('div');
            item.className = 'staged-file-item fade-in';

            const fileName = this.getFileName(filePath);
            
            item.innerHTML = `
                <div class="staged-file-info">
                    <div class="staged-file-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                        </svg>
                    </div>
                    <div class="staged-file-name" title="${fileName}">${fileName}</div>
                </div>
                <button class="staged-file-remove" data-file-path="${filePath}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            `;

            // Add remove functionality
            const removeBtn = item.querySelector('.staged-file-remove');
            removeBtn.addEventListener('click', () => {
                this.removeStagedFile(filePath);
            });

            this.stagedFilesList.appendChild(item);
        });

        this.updateStatus(`${this.stagedFiles.size} file(s) ready for conversion`);
    }

    removeStagedFile(filePath) {
        this.stagedFiles.delete(filePath);
        this.updateStagedFilesDisplay();
    }

    clearStagedFiles() {
        this.stagedFiles.clear();
        this.updateStagedFilesDisplay();
        this.updateStatus('Ready to convert LoRA files');
    }

    addResultItem(result) {
        const item = document.createElement('div');
        item.className = `result-item ${result.success ? 'success' : 'error'} fade-in`;

        const fileName = this.getFileName(result.inputPath);
        const iconSvg = result.success 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

        item.innerHTML = `
            <div class="result-icon ${result.success ? 'success' : 'error'}">
                ${iconSvg}
            </div>
            <div class="result-content">
                <div class="result-filename" title="${fileName}">${fileName}</div>
                <div class="result-message">${result.message || result.error || 'Converted successfully'}</div>
            </div>
        `;

        this.resultsList.appendChild(item);
    }

    getFileName(filePath) {
        return filePath.split(/[\\/]/).pop();
    }

    showProgress() {
        this.progressSection.style.display = 'block';
        this.progressSection.classList.add('fade-in');
    }

    hideProgress() {
        setTimeout(() => {
            this.progressSection.style.display = 'none';
        }, 500);
    }

    updateProgress(current, total) {
        const percentage = total > 0 ? (current / total) * 100 : 0;
        this.progressFill.style.width = `${percentage}%`;
        this.progressCount.textContent = `${current} / ${total}`;
    }

    showResults() {
        this.resultsSection.style.display = 'block';
        this.resultsSection.classList.add('fade-in');
    }

    clearResults() {
        this.resultsSection.style.display = 'none';
        this.clearResultsList();
    }

    clearResultsList() {
        this.resultsList.innerHTML = '';
    }

    updateStatus(message) {
        this.statusText.textContent = message;
    }

    showError(message) {
        this.updateStatus(`Error: ${message}`);
        console.error(message);
    }

    showWarning(message) {
        this.updateStatus(`Warning: ${message}`);
        console.warn(message);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoRAConverter();
});
