const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

/**
 * LoRA Key Converter - Converts LoRA keys from Wan format to ComfyUI format
 * This uses the original Python script to ensure EXACT functionality
 */

class LoRAConverter {
    /**
     * Convert LoRA keys for Wan -> ComfyUI compatibility
     * Uses the original Python script to ensure EXACT functionality
     * @param {string} inputPath - Path to input .safetensors file
     * @param {string} outputPath - Path for output .safetensors file
     * @returns {Promise<Object>} Conversion result
     */
    static async convertLoRAKeys(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            // Find the Python script path (should be in the same directory)
            const scriptPath = path.join(__dirname, 'lora_wan2comfy_dragdrop.py');
            
            // Spawn Python process with the input file
            const pythonProcess = spawn('python', [scriptPath, inputPath], {
                cwd: __dirname,
                stdio: ['pipe', 'pipe', 'pipe']
            });
            
            let stdout = '';
            let stderr = '';
            
            pythonProcess.stdout.on('data', (data) => {
                stdout += data.toString();
                console.log(data.toString().trim());
            });
            
            pythonProcess.stderr.on('data', (data) => {
                stderr += data.toString();
                console.error(data.toString().trim());
            });
            
            pythonProcess.on('close', async (code) => {
                if (code === 0) {
                    try {
                        // Check if output file was created
                        const expectedOutput = this.generateOutputPath(inputPath);
                        const outputExists = await fs.access(expectedOutput).then(() => true).catch(() => false);
                        
                        if (outputExists) {
                            // Parse the output for key count information
                            const keyCountMatch = stdout.match(/Found (\d+) keys/);
                            const keyCount = keyCountMatch ? parseInt(keyCountMatch[1]) : 0;
                            
                            resolve({
                                success: true,
                                inputPath,
                                outputPath: expectedOutput,
                                originalKeyCount: keyCount,
                                convertedKeyCount: keyCount,
                                message: `Converted ${keyCount} keys successfully`,
                                pythonOutput: stdout
                            });
                        } else {
                            reject(new Error('Output file was not created'));
                        }
                    } catch (error) {
                        reject(new Error(`Failed to verify output: ${error.message}`));
                    }
                } else {
                    reject(new Error(`Python script failed with code ${code}: ${stderr || stdout}`));
                }
            });
            
            pythonProcess.on('error', (error) => {
                if (error.code === 'ENOENT') {
                    reject(new Error('Python not found. Please ensure Python is installed and in your PATH.'));
                } else {
                    reject(new Error(`Failed to start Python process: ${error.message}`));
                }
            });
        });
    }


    /**
     * Get sample key mappings for display
     * @param {Object} originalTensors - Original tensors
     * @param {Object} convertedTensors - Converted tensors
     * @param {number} count - Number of samples to return
     * @returns {Array} Sample mappings
     */
    static getSampleMappings(originalTensors, convertedTensors, count = 5) {
        const originalKeys = Object.keys(originalTensors);
        const convertedKeys = Object.keys(convertedTensors);
        const samples = [];
        
        for (let i = 0; i < Math.min(count, originalKeys.length); i++) {
            samples.push({
                original: originalKeys[i],
                converted: convertedKeys[i]
            });
        }
        
        return samples;
    }

    /**
     * Generate output path from input path (mirrors infer_output_path from Python)
     * @param {string} inputPath - Input file path
     * @returns {string} Output file path
     */
    static generateOutputPath(inputPath) {
        const parsedPath = path.parse(inputPath);
        return path.join(parsedPath.dir, `${parsedPath.name}_converted.safetensors`);
    }

    /**
     * Validate if file is a safetensors file
     * @param {string} filePath - File path to validate
     * @returns {boolean} True if valid safetensors file
     */
    static async isValidSafetensorsFile(filePath) {
        try {
            const stats = await fs.stat(filePath);
            if (!stats.isFile()) return false;
            
            if (!filePath.toLowerCase().endsWith('.safetensors')) return false;
            
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = LoRAConverter;
