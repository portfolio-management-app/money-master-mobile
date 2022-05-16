import { writeFile } from 'react-native-fs';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

class FileService {
  async saveFile() {
    const data = [
      { name: 'John', city: 'Seattle' },
      { name: 'Mike', city: 'Los Angeles' },
      { name: 'Zach', city: 'New York' },
    ];

    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Prova');

    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

    const file = RNFS.ExternalStorageDirectoryPath + '/test.xlsx';
    writeFile(file, wbout, 'ascii')
      .then((r) => {
        /* :) */
      })
      .catch((e) => {
        /* :( */
      });
  }
}

export const fileService = new FileService();
