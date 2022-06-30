import { APP_CONTENT } from 'shared/constants';
import { writeFile, DownloadDirectoryPath } from 'react-native-fs';
import XLSX from 'xlsx';
import { Alert, PermissionsAndroid } from 'react-native';
import { log } from './log';

const CONTENT = APP_CONTENT.exportInfo;

class FileService {
  async saveAssetDataFile(
    transactionData: any,
    assetData: any,
    fileName: string
  ) {
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

    const ws1 = XLSX.utils.json_to_sheet(transactionData);
    const ws2 = XLSX.utils.json_to_sheet(assetData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, CONTENT.transaction);
    XLSX.utils.book_append_sheet(wb, ws2, CONTENT.assetInformation);

    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

    const file = DownloadDirectoryPath + `/${fileName}.xlsx`;
    writeFile(file, wbout, 'ascii')
      .then((r) => {
        log('Save file success', r);
        Alert.alert(
          CONTENT.title,
          `${CONTENT.message} ${DownloadDirectoryPath}/${fileName}.xlsx`
        );
      })
      .catch((e) => {
        log('Error when save file', e);
        Alert.alert(CONTENT.errorTitle, `${CONTENT.error}`);
      });
  }
}

export const fileService = new FileService();
