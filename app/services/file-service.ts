import { writeFile } from 'react-native-fs';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import { PermissionsAndroid } from 'react-native';
import { log } from './log';

class FileService {
  async saveFile() {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    } catch (err) {
      log('Error when access storage permission', err);
    }
    const readGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    const writeGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (!readGranted || !writeGranted) {
      console.log('Read and write permissions have not been granted');
      return;
    }
    const data = [
      { name: 'John', city: 'Seattle' },
      { name: 'Mike', city: 'Los Angeles' },
      { name: 'Zach', city: 'New York' },
    ];

    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Prova');

    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

    const file = RNFS.DownloadDirectoryPath + '/test.xlsx';
    writeFile(file, wbout, 'ascii')
      .then((r) => {
        log('Save file success', r);
      })
      .catch((e) => {
        log('Error when save file', e);
      });
  }
}

export const fileService = new FileService();
