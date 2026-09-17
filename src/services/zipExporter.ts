import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { CSHARP_PROJECT_FILES } from '../csharp-project/sources';

export async function downloadCSharpProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root folder
  const root = zip.folder('GaimePcBridge_v1.0_Solution');
  if (!root) throw new Error('Could not create zip folder');

  // Add all files according to their relative paths
  for (const file of CSHARP_PROJECT_FILES) {
    root.file(file.path, file.content);
  }

  // Generate binary blob
  const content = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  // Trigger download in browser
  saveAs(content, 'GaimePcBridge_v1.0_VS2022_Net8_Source.zip');
}
